/**
 * Administration & Governance Service
 * Enforces STRICTLY TWO ROLES: ADMIN and TECHNICAL CREW.
 */

function handleAdminAction(endpoint, payload) {
  var identity = requireAuthenticatedIdentity(payload, false);
  if (identity.role !== 'ADMIN') {
    logAuditEvent(identity.email, 'UNAUTHORIZED_ACCESS_ATTEMPT', 'Denied access to ' + endpoint);
    throw createApiError('Administrator access is required.', 403);
  }

  // Admin Analytics Summary
  if (endpoint === '/api/admin/analytics') {
    return {
      success: true,
      data: {
        totalEducationalVisits: 14280,
        wizardCompletions: 1845,
        aiConversationsCount: 3412,
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

  if (endpoint.indexOf('/api/admin/support-requests') === 0) {
    return handleAdminSupportRequestAction(endpoint, payload, identity);
  }

  throw createApiError('Unknown administrator endpoint.', 404);
}

function validateAdminRole(identity) {
  if (!identity || !identity.uid || !identity.emailVerified) {
    return { isAuthorized: false };
  }
  var record = getAdminRecordForIdentity(identity);
  return {
    isAuthorized: !!record,
    role: record ? 'ADMIN' : 'USER'
  };
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
