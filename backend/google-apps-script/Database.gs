/**
 * Database & Google Sheets Connector
 * Maps logical entities to the 10 physical workbook tabs.
 */

function getSpreadsheet() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var sheetId = scriptProperties.getProperty('SPREADSHEET_ID');

  if (sheetId) {
    try {
      return SpreadsheetApp.openById(sheetId);
    } catch (e) {
      Logger.log('Could not open spreadsheet by ID: ' + e.message);
    }
  }

  // Active spreadsheet fallback if script is container-bound
  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (err) {
    return null;
  }
}

function getSheetTab(tabName) {
  var ss = getSpreadsheet();
  if (!ss) return null;
  return ss.getSheetByName(tabName);
}

function recordAiUsage(model, tokens, status) {
  var sheet = getSheetTab('AIUsage');
  if (sheet) {
    sheet.appendRow([
      new Date().toISOString(),
      model,
      tokens,
      status,
      tokens > 0 ? (tokens * 0.000002).toFixed(6) : 0 // Cost estimate
    ]);
  }
}

function recordSafetyEvent(level, reason) {
  var sheet = getSheetTab('AIUsage');
  if (sheet) {
    sheet.appendRow([
      new Date().toISOString(),
      'SAFETY_ALERT',
      0,
      'LEVEL_' + level,
      reason || ''
    ]);
  }
}

function logAuditEvent(userEmail, action, details) {
  var sheet = getSheetTab('AuditLog');
  if (sheet) {
    sheet.appendRow([
      new Date().toISOString(),
      userEmail,
      action,
      details
    ]);
  }
}
