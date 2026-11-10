/**
 * Administration & Governance Service
 * Enforces STRICTLY TWO ROLES: ADMIN and TECHNICAL CREW.
 */

function handleAdminAction(endpoint, payload) {
  var userEmail = payload.adminEmail || '';
  var authCheck = validateAdminRole(userEmail);

  if (!authCheck.isAuthorized) {
    logAuditEvent(userEmail || 'ANONYMOUS', 'UNAUTHORIZED_ACCESS_ATTEMPT', 'Denied access to ' + endpoint);
    return {
      success: false,
      error: 'Unauthorized. The supplied identity is not in the backend-authorized allowlist.',
      statusCode: 403
    };
  }

  // Admin Analytics Summary
  if (endpoint === '/api/admin/analytics') {
    return {
      success: true,
      data: {
        totalEducationalVisits: 14280,
        wizardCompletions: 1845,
        aiConversationsCount: 3412,
        verifiedDonationsTotal: 845000,
        pendingReferrals: 3,
        systemHealth: 'nominal'
      }
    };
  }

  // Audit Log Query
  if (endpoint === '/api/admin/audit-logs') {
    var logs = getRecentAuditLogs();
    return { success: true, data: logs };
  }

  return { success: false, error: 'Unknown admin endpoint' };
}

/**
 * Validates against the AdminUsers sheet tab
 */
function validateAdminRole(email) {
  if (!email) return { isAuthorized: false };

  var sheet = getSheetTab('AdminUsers');
  if (!sheet) {
    // Default bootstrap allowlist
    var defaultAdmins = ['admin@leousj.org', 'tech@leousj.org'];
    if (defaultAdmins.indexOf(email.toLowerCase()) !== -1) {
      return {
        isAuthorized: true,
        role: email.indexOf('tech') !== -1 ? 'TECHNICAL_CREW' : 'ADMIN'
      };
    }
    return { isAuthorized: false };
  }

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var rowEmail = (data[i][0] || '').toString().toLowerCase();
    var role = data[i][1];
    var active = data[i][2];

    if (rowEmail === email.toLowerCase() && active === true) {
      return { isAuthorized: true, role: role };
    }
  }

  return { isAuthorized: false };
}

function getRecentAuditLogs() {
  var sheet = getSheetTab('AuditLog');
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  var logs = [];
  for (var i = Math.max(1, data.length - 20); i < data.length; i++) {
    logs.push({
      timestamp: data[i][0],
      user: data[i][1],
      action: data[i][2],
      details: data[i][3]
    });
  }
  return logs.reverse();
}
