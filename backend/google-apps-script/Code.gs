/**
 * BEYOND THE DARKNESS – අඳුරෙන් එළියට
 * Google Apps Script Web App Backend Integration Layer
 * 
 * Organization: Leo Club of University of Sri Jayewardenepura
 * Technology Stack: Google Apps Script + Google Sheets + Google Drive + Grok API
 */

/**
 * Handles incoming HTTP GET requests
 */
function doGet(e) {
  try {
    var endpoint = (e && e.parameter && e.parameter.endpoint) || '/api/health';
    
    if (endpoint === '/api/health') {
      return jsonResponse({
        status: 'online',
        name: 'Beyond the Darkness Apps Script API',
        organization: 'Leo Club of University of Sri Jayewardenepura',
        timestamp: new Date().toISOString()
      });
    }

    if (endpoint === '/api/drugs') {
      return jsonResponse({
        success: true,
        data: getApprovedDrugKnowledge(),
        timestamp: new Date().toISOString()
      });
    }

    if (endpoint === '/api/support-centers') {
      var province = e.parameter.province || null;
      var district = e.parameter.district || null;
      return jsonResponse({
        success: true,
        data: getVerifiedSupportCenters(province, district),
        timestamp: new Date().toISOString()
      });
    }

    return errorResponse('Invalid GET endpoint: ' + endpoint, 404);
  } catch (err) {
    return errorResponse(err.message, 500);
  }
}

/**
 * Handles incoming HTTP POST requests (Unified Web App Router)
 */
function doPost(e) {
  try {
    var raw = e.postData ? e.postData.contents : null;
    if (!raw) {
      return errorResponse('Missing request payload', 400);
    }

    var request = JSON.parse(raw);
    var endpoint = request.endpoint;
    var payload = request.payload || {};

    // Firebase identity and account lifecycle
    if (endpoint === '/api/auth/me') {
      return jsonResponse(handleAuthMe(payload));
    }
    if (endpoint === '/api/auth/register-profile') {
      return jsonResponse(handleRegistrationProfile(payload));
    }
    if (endpoint === '/api/auth/password-changed') {
      return jsonResponse(handlePasswordChanged(payload));
    }
    if (endpoint === '/api/support-centers') {
      return jsonResponse({
        success: true,
        data: getVerifiedSupportCenters(payload.province || null, payload.district || null),
        timestamp: new Date().toISOString()
      });
    }

    // 1. AI Chat & RAG
    if (endpoint === '/api/ai/chat') {
      return jsonResponse(handleAiChat(payload));
    }

    // 2. Creative Wizard Intake
    if (endpoint === '/api/ai/guided' || endpoint === '/api/wizard/submit') {
      return jsonResponse(handleWizardSubmission(payload));
    }

    // 3. User Feedback
    if (endpoint === '/api/ai/feedback') {
      return jsonResponse(handleAiFeedback(payload));
    }

    // 4. Confidential Referral Request
    if (endpoint === '/api/support-requests') {
      return jsonResponse(handleSupportRequest(payload));
    }
    if (endpoint === '/api/campaign-registrations') {
      return jsonResponse(handleCampaignRegistration(payload));
    }
    if (endpoint === '/api/campaign-feedback') {
      return jsonResponse(handleCampaignFeedback(payload));
    }
    if (endpoint === '/api/volunteer-applications') {
      return jsonResponse(handleVolunteerApplication(payload));
    }
    if (endpoint === '/api/users/profile') {
      return jsonResponse(handleProfileUpdate(payload));
    }
    if (endpoint.indexOf('/api/users/') === 0) {
      return jsonResponse(handleUserSupportAction(endpoint, payload));
    }

    // 5. Donation Initiation & Verification
    if (endpoint === '/api/donations/initiate') {
      return jsonResponse(handleDonationInitiate(payload));
    }
    if (endpoint === '/api/donations/verify') {
      return jsonResponse(handleDonationVerify(payload));
    }

    // 6. Admin & Technical Operations
    if (endpoint.indexOf('/api/admin/') === 0) {
      return jsonResponse(handleAdminAction(endpoint, payload));
    }

    return errorResponse('Endpoint not recognized: ' + endpoint, 404);
  } catch (err) {
    logAuditEvent('SYSTEM', 'API_ERROR', 'Request failed: ' + (err && err.statusCode ? err.statusCode : 500));
    return errorResponse(err.message || 'Request failed', err.statusCode || 500);
  }
}

/**
 * Wraps data into a standard JSON ContentService output with CORS headers
 */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(msg, code) {
  return jsonResponse({
    success: false,
    error: msg,
    statusCode: code || 400,
    timestamp: new Date().toISOString()
  });
}
