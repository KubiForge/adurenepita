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

function getTableHeaders(sheet) {
  if (!sheet || sheet.getLastRow() === 0) return [];
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(function (value) {
    return String(value || '').trim();
  });
}

function getTableRecords(tabName) {
  var sheet = getSheetTab(tabName);
  if (!sheet || sheet.getLastRow() < 2) return [];

  var values = sheet.getDataRange().getValues();
  var headers = values[0].map(function (value) {
    return String(value || '').trim();
  });
  var records = [];
  for (var rowIndex = 1; rowIndex < values.length; rowIndex++) {
    var row = values[rowIndex];
    if (row.every(function (value) { return value === '' || value === null; })) continue;
    var record = {};
    for (var columnIndex = 0; columnIndex < headers.length; columnIndex++) {
      if (headers[columnIndex]) record[headers[columnIndex]] = row[columnIndex];
    }
    records.push(record);
  }
  return records;
}

function toSafeSheetValue(value) {
  if (typeof value === 'string' && /^[=+\-@]/.test(value)) return "'" + value;
  return value === undefined || value === null ? '' : value;
}

function appendTableRecord(tabName, record) {
  var sheet = getSheetTab(tabName);
  if (!sheet) throw createApiError('Required data table is unavailable: ' + tabName, 503);
  var headers = getTableHeaders(sheet);
  if (!headers.length) throw createApiError('Data table is not initialized: ' + tabName, 503);
  var values = headers.map(function (header) {
    return toSafeSheetValue(record[header]);
  });
  sheet.appendRow(values);
}

function updateTableRecord(tabName, keyHeader, keyValue, updates) {
  var sheet = getSheetTab(tabName);
  if (!sheet || sheet.getLastRow() < 2) return false;
  var values = sheet.getDataRange().getValues();
  var headers = values[0].map(function (value) {
    return String(value || '').trim();
  });
  var keyColumn = headers.indexOf(keyHeader);
  if (keyColumn < 0) throw createApiError('Required data column is unavailable: ' + keyHeader, 503);

  for (var rowIndex = 1; rowIndex < values.length; rowIndex++) {
    if (String(values[rowIndex][keyColumn]) !== String(keyValue)) continue;
    for (var field in updates) {
      if (!Object.prototype.hasOwnProperty.call(updates, field)) continue;
      var columnIndex = headers.indexOf(field);
      if (columnIndex < 0) continue;
      sheet.getRange(rowIndex + 1, columnIndex + 1).setValue(toSafeSheetValue(updates[field]));
    }
    return true;
  }
  return false;
}

function upsertTableRecord(tabName, keyHeader, keyValue, record) {
  var existing = updateTableRecord(tabName, keyHeader, keyValue, record);
  if (!existing) appendTableRecord(tabName, record);
}

function deleteTableRecords(tabName, keyHeader, keyValue) {
  var sheet = getSheetTab(tabName);
  if (!sheet || sheet.getLastRow() < 2) return 0;
  var values = sheet.getDataRange().getValues();
  var headers = values[0].map(function (value) {
    return String(value || '').trim();
  });
  var keyColumn = headers.indexOf(keyHeader);
  if (keyColumn < 0) throw createApiError('Required data column is unavailable: ' + keyHeader, 503);
  var deleted = 0;

  for (var rowIndex = values.length - 1; rowIndex >= 1; rowIndex--) {
    if (String(values[rowIndex][keyColumn]) === String(keyValue)) {
      sheet.deleteRow(rowIndex + 1);
      deleted++;
    }
  }
  return deleted;
}
