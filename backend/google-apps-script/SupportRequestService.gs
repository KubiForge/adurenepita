var SUPPORT_REQUEST_STATUSES = [
  'PENDING',
  'UNDER_REVIEW',
  'NEEDS_INFORMATION',
  'RECOMMENDATION_SENT',
  'USER_ACTION_REQUIRED',
  'FOLLOW_UP_REQUESTED',
  'IN_PROGRESS',
  'COMPLETED',
  'CLOSED'
];

var SUPPORT_STATUS_TRANSITIONS = {
  PENDING: ['UNDER_REVIEW', 'FOLLOW_UP_REQUESTED', 'CLOSED'],
  UNDER_REVIEW: ['NEEDS_INFORMATION', 'RECOMMENDATION_SENT', 'FOLLOW_UP_REQUESTED', 'IN_PROGRESS', 'CLOSED'],
  NEEDS_INFORMATION: ['UNDER_REVIEW', 'FOLLOW_UP_REQUESTED', 'CLOSED'],
  RECOMMENDATION_SENT: ['USER_ACTION_REQUIRED', 'FOLLOW_UP_REQUESTED', 'IN_PROGRESS', 'COMPLETED', 'CLOSED'],
  USER_ACTION_REQUIRED: ['FOLLOW_UP_REQUESTED', 'IN_PROGRESS', 'COMPLETED', 'CLOSED'],
  FOLLOW_UP_REQUESTED: ['UNDER_REVIEW', 'IN_PROGRESS', 'COMPLETED', 'CLOSED'],
  IN_PROGRESS: ['NEEDS_INFORMATION', 'RECOMMENDATION_SENT', 'COMPLETED', 'CLOSED'],
  COMPLETED: ['IN_PROGRESS', 'CLOSED'],
  CLOSED: ['UNDER_REVIEW']
};

function findTableRecord(tabName, header, value) {
  var records = getTableRecords(tabName);
  for (var i = 0; i < records.length; i++) {
    if (String(records[i][header] || '') === String(value || '')) return records[i];
  }
  return null;
}

function requireSupportRequest(requestId, identity) {
  var request = findTableRecord('SupportRequests', 'RequestID', requestId);
  if (!request) throw createApiError('Support request not found.', 404);
  if (identity.role !== 'ADMIN' && String(request.FirebaseUID) !== identity.uid) {
    throw createApiError('You are not authorized to access this support request.', 403);
  }
  return request;
}

function validateAssessmentAnswers(answers) {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    throw createApiError('A completed assessment is required.', 400);
  }
  var serialized = JSON.stringify(answers);
  if (serialized.length > 20000) {
    throw createApiError('The assessment is too large to submit.', 413);
  }
  if (answers.consentedToReferral !== true) {
    throw createApiError('Explicit consent is required before sharing an assessment with the support team.', 400);
  }
  return serialized;
}

function checkSupportRequestRateLimit(identity) {
  var cache = CacheService.getScriptCache();
  var key = 'support-request:' + identity.uid + ':' + Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'yyyy-MM-dd'
  );
  var current = Number(cache.get(key) || 0);
  if (current >= 5) throw createApiError('Daily support request limit reached. Please try again tomorrow.', 429);
  cache.put(key, String(current + 1), 86400);
}

function createSupportRequest(payload, identity) {
  var method = String(payload.supportMethod || '').trim();
  var allowedMethods = ['visit_institution', 'online_assistance', 'phone_call', 'professional_guidance', 'not_sure'];
  if (allowedMethods.indexOf(method) === -1) {
    throw createApiError('Select a valid support method.', 400);
  }

  var idempotencyKey = String(payload.idempotencyKey || '').trim();
  if (!/^[a-zA-Z0-9_-]{16,100}$/.test(idempotencyKey)) {
    throw createApiError('A valid request submission key is required.', 400);
  }
  if (payload.dataShareConsent !== true) {
    throw createApiError('Explicit data-sharing consent is required to submit a support request.', 400);
  }

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw createApiError('The request service is busy. Please retry shortly.', 503);
  try {
    var existingRequests = getTableRecords('SupportRequests');
    for (var i = 0; i < existingRequests.length; i++) {
      if (
        String(existingRequests[i].FirebaseUID) === identity.uid &&
        String(existingRequests[i].IdempotencyKey) === idempotencyKey
      ) {
        return {
          success: true,
          data: {
            id: existingRequests[i].RequestID,
            reference: existingRequests[i].Reference,
            status: existingRequests[i].Status,
            duplicate: true
          }
        };
      }
    }

    var assessmentJson = validateAssessmentAnswers(payload.assessment);
    var now = new Date().toISOString();
    var assessmentId = 'ASM-' + Utilities.getUuid();
    var requestId = 'REQ-' + Utilities.getUuid();
    var reference = 'BTD-' + Utilities.getUuid().replace(/-/g, '').substring(0, 10).toUpperCase();
    var centerId = String(payload.centerId || '').trim();
    var contactMethod = String(payload.contactMethod || '').trim();
    var contactInfo = String(payload.contactInfo || '').trim();
    var additionalDetails = String(payload.additionalDetails || '').trim();
    if (['phone', 'email', 'in_person'].indexOf(contactMethod) === -1 || !contactInfo) {
      throw createApiError('Provide a contact method and contact detail for follow-up.', 400);
    }

    if (centerId && !getVerifiedCenterById(centerId)) {
      throw createApiError('The selected institution is not currently verified.', 400);
    }
    if (
      contactInfo.length > 180 ||
      additionalDetails.length > 2000 ||
      String(payload.province || '').length > 120 ||
      String(payload.district || '').length > 120 ||
      String(payload.policyVersion || 'current').length > 80
    ) {
      throw createApiError('Contact details or additional information exceed the allowed length.', 400);
    }

    checkSupportRequestRateLimit(identity);
    appendTableRecord('Assessments', {
      AssessmentID: assessmentId,
      FirebaseUID: identity.uid,
      CreatedAt: now,
      AnswersJson: assessmentJson,
      ConsentAt: now,
      PolicyVersion: String(payload.policyVersion || 'current')
    });

    appendTableRecord('SupportRequests', {
      RequestID: requestId,
      Reference: reference,
      FirebaseUID: identity.uid,
      AssessmentID: assessmentId,
      CreatedAt: now,
      SupportMethod: method,
      ContactMethod: contactMethod,
      ContactInfo: contactInfo,
      CenterID: centerId,
      Province: String(payload.province || '').substring(0, 120),
      District: String(payload.district || '').substring(0, 120),
      AdditionalDetails: additionalDetails,
      Status: 'PENDING',
      Priority: 'NORMAL',
      ConsentAt: now,
      IdempotencyKey: idempotencyKey,
      UpdatedAt: now
    });

    appendTableRecord('UserConsents', {
      ConsentID: 'CNS-' + Utilities.getUuid(),
      FirebaseUID: identity.uid,
      RequestID: requestId,
      ConsentType: 'SUPPORT_REQUEST_DATA_SHARING',
      PolicyVersion: String(payload.policyVersion || 'current'),
      Timestamp: now,
      DataShareConsent: true
    });
    appendRequestStatus(requestId, '', 'PENDING', identity, '');
    logAuditEvent(identity.email, 'SUPPORT_REQUEST_CREATED', reference);

    return {
      success: true,
      data: { id: requestId, reference: reference, status: 'PENDING', duplicate: false }
    };
  } finally {
    lock.releaseLock();
  }
}

function handleWizardSubmission(payload) {
  var identity = requireAuthenticatedIdentity(payload, false);
  var assessmentJson = validateAssessmentAnswers(payload.answers);
  var now = new Date().toISOString();
  var assessmentId = 'ASM-' + Utilities.getUuid();
  appendTableRecord('Assessments', {
    AssessmentID: assessmentId,
    FirebaseUID: identity.uid,
    CreatedAt: now,
    AnswersJson: assessmentJson,
    ConsentAt: now,
    PolicyVersion: String(payload.policyVersion || 'current')
  });
  return { success: true, data: { id: assessmentId, createdAt: now } };
}

function handleSupportRequest(payload) {
  var identity = requireAuthenticatedIdentity(payload, false);
  return createSupportRequest(payload, identity);
}

function getUserAssessments(identity) {
  return getTableRecords('Assessments')
    .filter(function (row) { return String(row.FirebaseUID) === identity.uid; })
    .map(function (row) {
      return {
        id: row.AssessmentID,
        createdAt: row.CreatedAt,
        answers: JSON.parse(String(row.AnswersJson || '{}'))
      };
    });
}

function getUserSupportRequests(identity) {
  return getTableRecords('SupportRequests')
    .filter(function (row) { return String(row.FirebaseUID) === identity.uid; })
    .map(function (row) {
      return {
        id: row.RequestID,
        reference: row.Reference,
        createdAt: row.CreatedAt,
        supportMethod: row.SupportMethod,
        status: row.Status,
        province: row.Province,
        district: row.District,
        latestResponse: getLatestPublicResponse(row.RequestID)
      };
    })
    .sort(function (left, right) {
      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    });
}

function getLatestPublicResponse(requestId) {
  var messages = getTableRecords('RequestMessages');
  for (var i = messages.length - 1; i >= 0; i--) {
    if (String(messages[i].RequestID) === requestId && String(messages[i].IsInternal).toLowerCase() !== 'true') {
      return { message: messages[i].Message, createdAt: messages[i].CreatedAt };
    }
  }
  return null;
}

function getPublicRequestDetails(request) {
  var history = getTableRecords('RequestStatusHistory')
    .filter(function (row) { return String(row.RequestID) === String(request.RequestID); })
    .map(function (row) {
      return { status: row.NewStatus, timestamp: row.Timestamp };
    });
  var messages = getTableRecords('RequestMessages')
    .filter(function (row) {
      return String(row.RequestID) === String(request.RequestID) &&
        String(row.IsInternal).toLowerCase() !== 'true';
    })
    .map(function (row) {
      return {
        id: row.MessageID,
        authorRole: row.AuthorRole,
        message: row.Message,
        createdAt: row.CreatedAt
      };
    });
  var recommendations = getTableRecords('RequestRecommendations')
    .filter(function (row) { return String(row.RequestID) === String(request.RequestID); })
    .map(function (row) {
      var center = getVerifiedCenterById(String(row.CenterID));
      if (!center) return null;
      return {
        center: center,
        personalizedNote: row.PersonalizedNote,
        nextSteps: row.NextSteps
      };
    })
    .filter(function (row) { return row !== null; });

  return {
    id: request.RequestID,
    reference: request.Reference,
    createdAt: request.CreatedAt,
    supportMethod: request.SupportMethod,
    status: request.Status,
    province: request.Province,
    district: request.District,
    additionalDetails: request.AdditionalDetails,
    assessment: getAssessmentForRequest(request),
    history: history,
    messages: messages,
    recommendations: recommendations
  };
}

function getAssessmentForRequest(request) {
  var assessment = findTableRecord('Assessments', 'AssessmentID', request.AssessmentID);
  if (!assessment || String(assessment.FirebaseUID) !== String(request.FirebaseUID)) return null;
  return JSON.parse(String(assessment.AnswersJson || '{}'));
}

function handleUserSupportAction(endpoint, payload) {
  var identity = requireAuthenticatedIdentity(payload, false);
  if (endpoint === '/api/users/assessments') {
    return { success: true, data: getUserAssessments(identity) };
  }
  if (endpoint === '/api/users/support-requests') {
    return { success: true, data: getUserSupportRequests(identity) };
  }

  var match = endpoint.match(/^\/api\/users\/support-requests\/([^/]+)(?:\/(messages|actions))?$/);
  if (!match) throw createApiError('Unknown user support endpoint.', 404);
  var request = requireSupportRequest(decodeURIComponent(match[1]), identity);

  if (match[2] === 'messages' || match[2] === 'actions') {
    var message = String(payload.message || '').trim();
    var action = String(payload.action || '').trim();
    if (message.length > 2000) throw createApiError('Message is too long.', 400);
    if (action && ['accept_recommendation', 'visit_independently', 'request_callback', 'request_online_support', 'request_recommendation'].indexOf(action) === -1) {
      throw createApiError('Unsupported support action.', 400);
    }
    if (!message && !action) throw createApiError('Enter a follow-up message or choose an action.', 400);

    if ((action === 'accept_recommendation' || action === 'visit_independently') &&
        !getPublicRequestDetails(request).recommendations.length) {
      throw createApiError('There are no current recommendations for this request.', 409);
    }

    var nextStatus = '';
    if (action === 'accept_recommendation' || action === 'visit_independently') {
      nextStatus = 'IN_PROGRESS';
    } else if (action === 'request_callback' || action === 'request_online_support' ||
               action === 'request_recommendation' || match[2] === 'messages') {
      nextStatus = 'FOLLOW_UP_REQUESTED';
    }
    if (nextStatus) updateSupportRequestStatus(request, nextStatus, identity, '');

    if (action) {
      var actionText = action === 'visit_independently'
        ? 'I plan to contact the recommended institution independently.'
        : 'User action: ' + action.replace(/_/g, ' ');
      message = message ? actionText + '\n' + message : actionText;
    }
    if (message) {
      appendTableRecord('RequestMessages', {
        MessageID: 'MSG-' + Utilities.getUuid(),
        RequestID: request.RequestID,
        AuthorUID: identity.uid,
        AuthorRole: 'USER',
        CreatedAt: new Date().toISOString(),
        Message: message,
        IsInternal: false
      });
    }
    logAuditEvent(identity.email, 'SUPPORT_REQUEST_FOLLOW_UP', request.Reference);
    return { success: true, data: getPublicRequestDetails(requireSupportRequest(request.RequestID, identity)) };
  }

  return { success: true, data: getPublicRequestDetails(request) };
}

function appendRequestStatus(requestId, previousStatus, newStatus, identity, adminNote) {
  appendTableRecord('RequestStatusHistory', {
    HistoryID: 'HIS-' + Utilities.getUuid(),
    RequestID: requestId,
    PreviousStatus: previousStatus,
    NewStatus: newStatus,
    ChangedByUID: identity.uid,
    ChangedByRole: identity.role,
    Timestamp: new Date().toISOString(),
    AdminNote: String(adminNote || '').substring(0, 500)
  });
}

function updateSupportRequestStatus(request, newStatus, identity, adminNote) {
  if (SUPPORT_REQUEST_STATUSES.indexOf(newStatus) === -1) {
    throw createApiError('Select a valid request status.', 400);
  }
  if (String(request.Status) !== newStatus) {
    var allowed = SUPPORT_STATUS_TRANSITIONS[String(request.Status)] || [];
    if (allowed.indexOf(newStatus) === -1) {
      throw createApiError('That request status transition is not allowed.', 409);
    }
    updateTableRecord('SupportRequests', 'RequestID', request.RequestID, {
      Status: newStatus,
      UpdatedAt: new Date().toISOString()
    });
    appendRequestStatus(request.RequestID, String(request.Status), newStatus, identity, adminNote);
  }
}

function getAdminSupportRequestList(payload) {
  var records = getTableRecords('SupportRequests');
  var status = String(payload.status || '').toUpperCase();
  var search = String(payload.search || '').toLowerCase().trim();
  var filtered = records.filter(function (row) {
    if (status && status !== 'ALL' && String(row.Status).toUpperCase() !== status) return false;
    if (!search) return true;
    return [row.Reference, row.SupportMethod, row.Province, row.District, row.Status]
      .join(' ')
      .toLowerCase()
      .indexOf(search) !== -1;
  }).sort(function (left, right) {
    return new Date(right.CreatedAt).getTime() - new Date(left.CreatedAt).getTime();
  });
  var offset = Math.max(0, Number(payload.offset) || 0);
  var limit = Math.min(100, Math.max(1, Number(payload.limit) || 25));

  return {
    items: filtered.slice(offset, offset + limit).map(function (row) {
      var answers = getAssessmentForRequest(row) || {};
      var suffix = String(row.FirebaseUID).slice(-6);
      return {
        id: row.RequestID,
        reference: row.Reference,
        createdAt: row.CreatedAt,
        userLabel: 'Member-' + suffix,
        purpose: answers.purpose || 'Not specified',
        concerns: answers.concerns || [],
        supportMethod: row.SupportMethod,
        province: row.Province,
        district: row.District,
        status: row.Status,
        priority: row.Priority
      };
    }),
    total: filtered.length,
    statuses: SUPPORT_REQUEST_STATUSES
  };
}

function getAdminSupportRequestDetails(requestId) {
  var request = findTableRecord('SupportRequests', 'RequestID', requestId);
  if (!request) throw createApiError('Support request not found.', 404);
  var details = getPublicRequestDetails(request);
  details.contactMethod = request.ContactMethod;
  details.contactInfo = request.ContactInfo;
  details.consentAt = request.ConsentAt;
  details.statusHistory = getTableRecords('RequestStatusHistory')
    .filter(function (row) { return String(row.RequestID) === String(requestId); })
    .map(function (row) {
      return {
        previousStatus: row.PreviousStatus,
        status: row.NewStatus,
        timestamp: row.Timestamp,
        changedByRole: row.ChangedByRole,
        adminNote: row.AdminNote
      };
    });
  details.messages = getTableRecords('RequestMessages')
    .filter(function (row) { return String(row.RequestID) === String(requestId); })
    .map(function (row) {
      return {
        id: row.MessageID,
        authorRole: row.AuthorRole,
        message: row.Message,
        createdAt: row.CreatedAt,
        isInternal: String(row.IsInternal).toLowerCase() === 'true'
      };
    });
  return details;
}

function handleAdminSupportRequestAction(endpoint, payload, identity) {
  if (endpoint === '/api/admin/support-requests') {
    return { success: true, data: getAdminSupportRequestList(payload) };
  }
  var match = endpoint.match(/^\/api\/admin\/support-requests\/([^/]+)(?:\/(status|respond))?$/);
  if (!match) throw createApiError('Unknown administrator support endpoint.', 404);
  var request = findTableRecord('SupportRequests', 'RequestID', decodeURIComponent(match[1]));
  if (!request) throw createApiError('Support request not found.', 404);

  if (match[2] === 'status') {
    var status = String(payload.status || '').toUpperCase();
    var note = String(payload.adminNote || '').trim();
    if (note.length > 500) throw createApiError('Administrative note is too long.', 400);
    if (SUPPORT_REQUEST_STATUSES.indexOf(status) === -1) {
      throw createApiError('Select a valid request status.', 400);
    }
    var currentStatus = String(request.Status);
    var transitionSource = currentStatus === 'PENDING' &&
      status !== 'PENDING' && status !== 'UNDER_REVIEW' && status !== 'CLOSED'
      ? 'UNDER_REVIEW'
      : currentStatus;
    if (transitionSource !== status &&
        (SUPPORT_STATUS_TRANSITIONS[transitionSource] || []).indexOf(status) === -1) {
      throw createApiError('That request status transition is not allowed.', 409);
    }
    if (currentStatus === 'PENDING' && transitionSource === 'UNDER_REVIEW') {
      updateSupportRequestStatus(request, 'UNDER_REVIEW', identity, '');
      request = findTableRecord('SupportRequests', 'RequestID', request.RequestID);
    }
    updateSupportRequestStatus(request, status, identity, note);
  } else if (match[2] === 'respond') {
    var message = String(payload.message || '').trim();
    var nextSteps = String(payload.nextSteps || '').trim();
    var centerIds = Array.isArray(payload.centerIds) ? payload.centerIds : [];
    if (!message || message.length > 4000 || nextSteps.length > 2000 || centerIds.length > 5) {
      throw createApiError('Enter a valid response and select no more than five institutions.', 400);
    }
    var verifiedCenters = getVerifiedSupportCenters(null, null);
    var selectedCenters = [];
    for (var i = 0; i < centerIds.length; i++) {
      var center = verifiedCenters.filter(function (item) { return String(item.id) === String(centerIds[i]); })[0];
      if (!center) throw createApiError('Recommendations may only use currently verified directory institutions.', 400);
      selectedCenters.push(center);
    }
    var nextStatus = String(payload.status || (centerIds.length ? 'RECOMMENDATION_SENT' : 'NEEDS_INFORMATION')).toUpperCase();
    if (SUPPORT_REQUEST_STATUSES.indexOf(nextStatus) === -1) {
      throw createApiError('Select a valid request status.', 400);
    }
    var currentStatus = String(request.Status);
    if (currentStatus === 'PENDING') {
      currentStatus = 'UNDER_REVIEW';
    }
    if (currentStatus !== nextStatus &&
        (SUPPORT_STATUS_TRANSITIONS[currentStatus] || []).indexOf(nextStatus) === -1) {
      throw createApiError('That request status transition is not allowed.', 409);
    }

    if (String(request.Status) === 'PENDING') {
      updateSupportRequestStatus(request, 'UNDER_REVIEW', identity, '');
      request = findTableRecord('SupportRequests', 'RequestID', request.RequestID);
    }
    for (var j = 0; j < selectedCenters.length; j++) {
      appendTableRecord('RequestRecommendations', {
        RecommendationID: 'REC-' + Utilities.getUuid(),
        RequestID: request.RequestID,
        CenterID: selectedCenters[j].id,
        PersonalizedNote: String(payload.personalizedNote || '').substring(0, 2000),
        NextSteps: nextSteps,
        CreatedByUID: identity.uid,
        CreatedAt: new Date().toISOString()
      });
    }
    appendTableRecord('RequestMessages', {
      MessageID: 'MSG-' + Utilities.getUuid(),
      RequestID: request.RequestID,
      AuthorUID: identity.uid,
      AuthorRole: 'ADMIN',
      CreatedAt: new Date().toISOString(),
      Message: message,
      IsInternal: false
    });
    updateSupportRequestStatus(request, nextStatus, identity, String(payload.adminNote || '').substring(0, 500));
    logAuditEvent(identity.email, 'SUPPORT_REQUEST_RESPONSE_SENT', request.Reference);
  }

  return { success: true, data: getAdminSupportRequestDetails(request.RequestID) };
}
