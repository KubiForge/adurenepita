var CAMPAIGN_PARTICIPANT_TYPES = [
  'University or community member',
  'Parent or guardian',
  'Teacher or school representative',
  'NGO or health professional'
];

var VOLUNTEER_ROLE_IDS = [
  'role-outreach',
  'role-content',
  'role-tech'
];

function requirePublicSubmissionPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw createApiError('A valid submission payload is required.', 400);
  }
}

function getPublicSubmissionText(payload, field, maxLength, label, allowEmpty, allowNewlines) {
  var value = payload[field];
  if (typeof value !== 'string') {
    throw createApiError(label + ' is required.', 400);
  }
  value = value.trim();
  var controlCharacterPattern = allowNewlines
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/
    : /[\u0000-\u001F\u007F]/;
  if ((!allowEmpty && !value) || value.length > maxLength || controlCharacterPattern.test(value)) {
    throw createApiError('Check the ' + label.toLowerCase() + ' and try again.', 400);
  }
  return value;
}

function validatePublicSubmissionEmail(email) {
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    throw createApiError('Enter a valid email address.', 400);
  }
  return email.toLowerCase();
}

function getPublicSubmissionIdempotencyKey(payload) {
  var key = getPublicSubmissionText(payload, 'idempotencyKey', 100, 'Submission key', false, false);
  if (!/^[a-zA-Z0-9_-]{16,100}$/.test(key)) {
    throw createApiError('A valid submission key is required.', 400);
  }
  return key;
}

function getPublicSubmissionEventId(payload) {
  var eventId = getPublicSubmissionText(payload, 'eventId', 80, 'Campaign', false, false);
  if (!/^[a-zA-Z0-9_-]+$/.test(eventId)) {
    throw createApiError('Select a valid campaign.', 400);
  }
  return eventId;
}

function persistPublicCampaignSubmission(tabName, idempotencyKey, referencePrefix, createRecord) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    throw createApiError('The submission service is busy. Please retry shortly.', 503);
  }
  try {
    var existingRecords = getTableRecords(tabName);
    for (var i = 0; i < existingRecords.length; i++) {
      if (String(existingRecords[i].IdempotencyKey || '') === idempotencyKey) {
        return {
          success: true,
          data: { reference: String(existingRecords[i].ReferenceID), duplicate: true }
        };
      }
    }

    var reference = referencePrefix + '-' + Utilities.getUuid().replace(/-/g, '').substring(0, 12).toUpperCase();
    var submittedAt = new Date().toISOString();
    var record = createRecord(reference, submittedAt);
    record.ReferenceID = reference;
    record.IdempotencyKey = idempotencyKey;
    appendTableRecord(tabName, record);
    return { success: true, data: { reference: reference, duplicate: false } };
  } finally {
    lock.releaseLock();
  }
}

function handleCampaignRegistration(payload) {
  requirePublicSubmissionPayload(payload);
  var idempotencyKey = getPublicSubmissionIdempotencyKey(payload);
  var eventId = getPublicSubmissionEventId(payload);
  var fullName = getPublicSubmissionText(payload, 'fullName', 100, 'Full name', false, false);
  var email = validatePublicSubmissionEmail(
    getPublicSubmissionText(payload, 'email', 254, 'Email address', false, false)
  );
  var participantType = getPublicSubmissionText(payload, 'participantType', 80, 'Participant type', false, false);

  if (CAMPAIGN_PARTICIPANT_TYPES.indexOf(participantType) === -1) {
    throw createApiError('Select a valid participant type.', 400);
  }
  if (payload.adultOrGuardian !== true || payload.consentToContact !== true) {
    throw createApiError('Adult or guardian confirmation and contact consent are required.', 400);
  }

  return persistPublicCampaignSubmission(
    'CampaignRegistrations',
    idempotencyKey,
    'REG',
    function (reference, submittedAt) {
      return {
        EventID: eventId,
        FullName: fullName,
        Email: email,
        ParticipantType: participantType,
        AdultOrGuardianConfirmed: true,
        ConsentToContact: true,
        SubmittedAt: submittedAt,
        Status: 'PENDING'
      };
    }
  );
}

function handleCampaignFeedback(payload) {
  requirePublicSubmissionPayload(payload);
  var idempotencyKey = getPublicSubmissionIdempotencyKey(payload);
  var eventId = getPublicSubmissionEventId(payload);
  var rating = Number(payload.rating);
  var feedback = getPublicSubmissionText(payload, 'feedback', 800, 'Feedback', true, true);

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw createApiError('Select a rating from 1 to 5.', 400);
  }
  if (payload.confirmsNoPersonalDetails !== true) {
    throw createApiError('Confirm that the feedback does not contain personal information.', 400);
  }
  if (/[^\s@]+@[^\s@]+\.[^\s@]{2,}/.test(feedback) || /(?:\+?\d[\d\s().-]{7,}\d)/.test(feedback)) {
    throw createApiError('Remove email addresses or phone numbers from feedback before submitting.', 400);
  }

  return persistPublicCampaignSubmission(
    'CampaignFeedback',
    idempotencyKey,
    'FDB',
    function (reference, submittedAt) {
      return {
        EventID: eventId,
        Rating: rating,
        Feedback: feedback,
        ConfirmsNoPersonalDetails: true,
        SubmittedAt: submittedAt
      };
    }
  );
}

function handleVolunteerApplication(payload) {
  requirePublicSubmissionPayload(payload);
  var idempotencyKey = getPublicSubmissionIdempotencyKey(payload);
  var fullName = getPublicSubmissionText(payload, 'fullName', 100, 'Full name', false, false);
  var email = validatePublicSubmissionEmail(
    getPublicSubmissionText(payload, 'email', 254, 'Email address', false, false)
  );
  var phone = getPublicSubmissionText(payload, 'phone', 32, 'Phone number', false, false);
  var roleId = getPublicSubmissionText(payload, 'roleId', 40, 'Volunteer role', false, false);

  if (!/^[0-9+().\-\s]+$/.test(phone) || phone.replace(/\D/g, '').length < 7) {
    throw createApiError('Enter a valid phone number.', 400);
  }
  if (VOLUNTEER_ROLE_IDS.indexOf(roleId) === -1) {
    throw createApiError('Select a valid volunteer role.', 400);
  }
  if (payload.consentToContact !== true) {
    throw createApiError('Contact consent is required to submit an application.', 400);
  }

  return persistPublicCampaignSubmission(
    'VolunteerApplications',
    idempotencyKey,
    'VOL',
    function (reference, submittedAt) {
      return {
        FullName: fullName,
        Email: email,
        Phone: phone,
        RoleID: roleId,
        ConsentToContact: true,
        SubmittedAt: submittedAt,
        Status: 'PENDING'
      };
    }
  );
}
