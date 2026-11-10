/**
 * Beyond the Darkness - Automated Setup & Environment Initializer
 * Run this function once from the Google Apps Script Editor to bootstrap the workbook tabs and Drive folders.
 */

function setupBeyondTheDarknessEnvironment() {
  Logger.log('Starting Beyond the Darkness Environment Setup...');
  var ss = getSpreadsheet();
  if (!ss) {
    throw new Error('No active spreadsheet found. Please bind this script to a Google Spreadsheet or set SPREADSHEET_ID in Script Properties.');
  }

  // 1. Initialize all 10 required Google Sheets Workbook Tabs
  var tabs = {
    'SiteContent': ['ContentKey', 'Language', 'Section', 'TextContent', 'LastUpdated'],
    'DrugKnowledge': ['Name', 'NameSi', 'ReviewStatus', 'Classification', 'Description', 'ShortTermEffects', 'EmergencySigns', 'Treatment', 'SourceTitle', 'SourceUrl', 'LastReviewDate'],
    'SupportDirectory': ['CenterID', 'Name', 'NameSi', 'Province', 'District', 'Phone', 'Address', 'OperatingHours', 'VerificationStatus', 'LastVerifiedDate'],
    'WizardSubmissions': ['SubmissionID', 'Timestamp', 'Purpose', 'Situation', 'Substances', 'Duration', 'Province', 'District', 'SupportPreference'],
    'DonationRecords': ['ReferenceID', 'Timestamp', 'Amount', 'Currency', 'PaymentStatus', 'DonorName', 'DonorEmail', 'PaymentProvider', 'CampaignAllocation', 'ReceiptDrivePath'],
    'Campaigns': ['EventID', 'Title', 'TitleSi', 'Phase', 'EventDate', 'Location', 'Status', 'Participants'],
    'AIUsage': ['Timestamp', 'Model', 'Tokens', 'StatusCode', 'CostEstimateUSD'],
    'AdminUsers': ['Email', 'Role', 'IsActive', 'CreatedDate'],
    'AuditLog': ['Timestamp', 'UserEmail', 'Action', 'Details'],
    'SystemConfig': ['ConfigKey', 'ConfigValue', 'Description', 'UpdatedDate']
  };

  for (var tabName in tabs) {
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      Logger.log('Created tab: ' + tabName);
    }
    // Set headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(tabs[tabName]);
      sheet.getRange(1, 1, 1, tabs[tabName].length).setFontWeight('bold').setBackground('#242426').setFontColor('#D8BE82');
      sheet.setFrozenRows(1);
    }
  }

  // Seed default admin allowlist
  var adminSheet = ss.getSheetByName('AdminUsers');
  if (adminSheet.getLastRow() <= 1) {
    adminSheet.appendRow(['admin@leousj.org', 'ADMIN', true, new Date().toISOString()]);
    adminSheet.appendRow(['tech@leousj.org', 'TECHNICAL_CREW', true, new Date().toISOString()]);
  }

  // 2. Initialize Google Drive Folder Structure
  try {
    var rootFolders = DriveApp.getFoldersByName('BeyondTheDarkness');
    var rootFolder = rootFolders.hasNext() ? rootFolders.next() : DriveApp.createFolder('BeyondTheDarkness');

    var subFolders = [
      'BrandAssets',
      'ApprovedKnowledge',
      'CampaignMedia',
      'DonationReceipts',
      'OperationalExports',
      'Archive'
    ];

    for (var i = 0; i < subFolders.length; i++) {
      var existing = rootFolder.getFoldersByName(subFolders[i]);
      if (!existing.hasNext()) {
        rootFolder.createFolder(subFolders[i]);
        Logger.log('Created Drive subfolder: ' + subFolders[i]);
      }
    }
    Logger.log('Google Drive folder tree initialized successfully at /BeyondTheDarkness/');
  } catch (driveErr) {
    Logger.log('Notice regarding Drive setup (may require Drive permission scope): ' + driveErr.message);
  }

  Logger.log('Beyond the Darkness setup completed successfully!');
}
