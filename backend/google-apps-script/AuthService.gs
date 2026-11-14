function createApiError(message, statusCode) {
  var error = new Error(message);
  error.statusCode = statusCode || 400;
  return error;
}

function firebaseIdentityRequest(path, body) {
  var apiKey = PropertiesService.getScriptProperties().getProperty('FIREBASE_WEB_API_KEY');
  if (!apiKey) {
    throw createApiError('Firebase identity verification is not configured.', 503);
  }

  var response = UrlFetchApp.fetch(
    'https://identitytoolkit.googleapis.com/v1/' + path + '?key=' + encodeURIComponent(apiKey),
    {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(body),
      muteHttpExceptions: true
    }
  );
  var result = JSON.parse(response.getContentText() || '{}');
  if (response.getResponseCode() !== 200) {
    throw createApiError('Firebase authentication could not be verified.', 401);
  }
  return result;
}

function verifyFirebaseIdentityToken(idToken, allowUnverifiedEmail) {
  if (typeof idToken !== 'string' || idToken.length < 20 || idToken.length > 5000) {
    throw createApiError('A valid sign-in token is required.', 401);
  }

  var result = firebaseIdentityRequest('accounts:lookup', { idToken: idToken });
  var firebaseUser = result.users && result.users.length ? result.users[0] : null;
  if (!firebaseUser || !firebaseUser.localId || !firebaseUser.email) {
    throw createApiError('The sign-in token is invalid or expired.', 401);
  }
  if (firebaseUser.disabled) {
    throw createApiError('This account is disabled.', 403);
  }
  if (!allowUnverifiedEmail && firebaseUser.emailVerified !== true) {
    throw createApiError('Verify your email address before continuing.', 403);
  }

  return {
    uid: String(firebaseUser.localId),
    email: String(firebaseUser.email).toLowerCase(),
    name: String(firebaseUser.displayName || ''),
    emailVerified: firebaseUser.emailVerified === true
  };
}

function getAdminRecordForIdentity(identity) {
  var records = getTableRecords('AdminUsers');
  for (var i = 0; i < records.length; i++) {
    var record = records[i];
    var active = record.IsActive === true || String(record.IsActive).toLowerCase() === 'true';
    if (
      active &&
      String(record.Email || '').toLowerCase() === identity.email &&
      String(record.FirebaseUID || '') === identity.uid &&
      String(record.Role || '').toUpperCase() === 'ADMIN'
    ) {
      return record;
    }
  }
  return null;
}

function getUserProfile(identity) {
  var records = getTableRecords('UserProfiles');
  for (var i = 0; i < records.length; i++) {
    if (String(records[i].FirebaseUID || '') === identity.uid) return records[i];
  }
  return null;
}

function requireAuthenticatedIdentity(payload, allowUnverifiedEmail) {
  var identity = verifyFirebaseIdentityToken(payload && payload.idToken, allowUnverifiedEmail === true);
  identity.adminRecord = identity.emailVerified ? getAdminRecordForIdentity(identity) : null;
  identity.role = identity.adminRecord ? 'ADMIN' : 'USER';
  return identity;
}

function handleAuthMe(payload) {
  var identity = requireAuthenticatedIdentity(payload, false);
  var profile = getUserProfile(identity);
  return {
    success: true,
    data: {
      id: identity.uid,
      email: identity.email,
      name: (profile && profile.FullName) || identity.name || identity.email,
      phone: (profile && profile.Phone) || '',
      role: identity.role,
      isActive: true,
      emailVerified: true,
      lastLoginAt: new Date().toISOString(),
      createdAt: (profile && profile.CreatedAt) || new Date().toISOString(),
      mustChangePassword: identity.role === 'ADMIN' &&
        String(identity.adminRecord.MustChangePassword).toLowerCase() === 'true'
    }
  };
}

function handleRegistrationProfile(payload) {
  var identity = requireAuthenticatedIdentity(payload, true);
  if (payload.acceptedPrivacyPolicy !== true || payload.acceptedTerms !== true) {
    throw createApiError('Privacy policy and terms acceptance are required.', 400);
  }

  var fullName = String(payload.fullName || '').trim();
  var phone = String(payload.phone || '').trim();
  var language = String(payload.language || 'en');
  if (!fullName || fullName.length > 120 || phone.length > 40) {
    throw createApiError('Enter a valid name and phone number.', 400);
  }
  if (['en', 'si', 'ta'].indexOf(language) === -1) {
    throw createApiError('Select a supported language.', 400);
  }

  var existingProfile = getUserProfile(identity);
  var acceptedAt = new Date().toISOString();
  upsertTableRecord('UserProfiles', 'FirebaseUID', identity.uid, {
    FirebaseUID: identity.uid,
    Email: identity.email,
    FullName: fullName,
    Phone: phone,
    Language: language,
    CreatedAt: (existingProfile && existingProfile.CreatedAt) || acceptedAt,
    UpdatedAt: acceptedAt,
    PrivacyAcceptedAt: (existingProfile && existingProfile.PrivacyAcceptedAt) || acceptedAt,
    TermsAcceptedAt: (existingProfile && existingProfile.TermsAcceptedAt) || acceptedAt,
    PolicyVersion: String(payload.policyVersion || 'current')
  });
  logAuditEvent(identity.email, 'USER_PROFILE_CREATED', 'Registration profile saved.');
  return { success: true, message: 'Registration details saved.' };
}

function handleProfileUpdate(payload) {
  var identity = requireAuthenticatedIdentity(payload, false);
  var existingProfile = getUserProfile(identity);
  if (!existingProfile) {
    throw createApiError('Account profile is not available. Please contact support.', 409);
  }

  var fullName = String(payload.fullName || '').trim();
  var phone = String(payload.phone || '').trim();
  var language = String(payload.language || existingProfile.Language || 'en');
  if (!fullName || fullName.length > 120 || phone.length > 40) {
    throw createApiError('Enter a valid name and phone number.', 400);
  }
  if (['en', 'si', 'ta'].indexOf(language) === -1) {
    throw createApiError('Select a supported language.', 400);
  }

  var now = new Date().toISOString();
  upsertTableRecord('UserProfiles', 'FirebaseUID', identity.uid, {
    FirebaseUID: identity.uid,
    Email: identity.email,
    FullName: fullName,
    Phone: phone,
    Language: language,
    CreatedAt: existingProfile.CreatedAt,
    UpdatedAt: now,
    PrivacyAcceptedAt: existingProfile.PrivacyAcceptedAt,
    TermsAcceptedAt: existingProfile.TermsAcceptedAt,
    PolicyVersion: existingProfile.PolicyVersion
  });
  return { success: true, message: 'Account profile updated.' };
}

function handlePasswordChanged(payload) {
  var identity = requireAuthenticatedIdentity(payload, false);
  var adminRecord = getAdminRecordForIdentity(identity);
  if (!adminRecord) {
    throw createApiError('Only an administrator can use this operation.', 403);
  }
  updateTableRecord('AdminUsers', 'FirebaseUID', identity.uid, {
    FirebaseUID: identity.uid,
    MustChangePassword: false
  });
  logAuditEvent(identity.email, 'ADMIN_PASSWORD_CHANGED', 'Initial password change completed.');
  return { success: true, message: 'Password change recorded.' };
}

function seedInitialAdminUser() {
  var properties = PropertiesService.getScriptProperties();
  var email = String(properties.getProperty('INITIAL_ADMIN_EMAIL') || '').trim().toLowerCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new Error('Set a valid INITIAL_ADMIN_EMAIL in Script Properties.');
  }

  var existing = getTableRecords('AdminUsers');
  for (var i = 0; i < existing.length; i++) {
    if (String(existing[i].Email || '').toLowerCase() === email) {
      if (
        String(existing[i].Role || '').toUpperCase() === 'ADMIN' &&
        String(existing[i].FirebaseUID || '') &&
        (existing[i].IsActive === true || String(existing[i].IsActive).toLowerCase() === 'true')
      ) {
        properties.deleteProperty('INITIAL_ADMIN_PASSWORD');
        Logger.log('Initial administrator is already seeded; no password was changed.');
        return { created: false, email: email };
      }
      throw new Error('A legacy admin record exists for this email. Review and migrate it manually before seeding.');
    }
  }

  var password = properties.getProperty('INITIAL_ADMIN_PASSWORD') || '';
  if (password.length < 12) {
    throw new Error('Set an INITIAL_ADMIN_PASSWORD of at least 12 characters in Script Properties.');
  }

  var account = firebaseIdentityRequest('accounts:signUp', {
    email: email,
    password: password,
    returnSecureToken: true
  });
  if (!account.localId) {
    throw new Error('Firebase did not create the initial administrator account.');
  }
  firebaseIdentityRequest('accounts:sendOobCode', {
    requestType: 'VERIFY_EMAIL',
    idToken: account.idToken
  });

  appendTableRecord('AdminUsers', {
    Email: email,
    Role: 'ADMIN',
    IsActive: true,
    CreatedDate: new Date().toISOString(),
    FirebaseUID: String(account.localId),
    MustChangePassword: true
  });
  properties.deleteProperty('INITIAL_ADMIN_PASSWORD');
  logAuditEvent(email, 'INITIAL_ADMIN_SEEDED', 'Administrator account created; password change required.');
  return { created: true, email: email };
}
