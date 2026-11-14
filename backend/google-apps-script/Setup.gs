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

  // 1. Initialize required Google Sheets workbook tabs
  var tabs = {
    'SiteContent': ['ContentKey', 'Language', 'Section', 'TextContent', 'LastUpdated'],
    'DrugKnowledge': ['Name', 'NameSi', 'ReviewStatus', 'Classification', 'Description', 'ShortTermEffects', 'EmergencySigns', 'Treatment', 'SourceTitle', 'SourceUrl', 'LastReviewDate'],
    'SupportDirectory': ['CenterID', 'Name', 'NameSi', 'Province', 'District', 'Phone', 'Address', 'OperatingHours', 'VerificationStatus', 'LastVerifiedDate'],
    'WizardSubmissions': ['SubmissionID', 'Timestamp', 'Purpose', 'Situation', 'Substances', 'Duration', 'Province', 'District', 'SupportPreference'],
    'DonationRecords': ['ReferenceID', 'Timestamp', 'Amount', 'Currency', 'PaymentStatus', 'DonorName', 'DonorEmail', 'PaymentProvider', 'CampaignAllocation', 'ReceiptDrivePath'],
    'Campaigns': ['EventID', 'Title', 'TitleSi', 'Phase', 'EventDate', 'Location', 'Status', 'Participants'],
    'AIUsage': ['Timestamp', 'Model', 'Tokens', 'StatusCode', 'CostEstimateUSD'],
    'AdminUsers': ['Email', 'Role', 'IsActive', 'CreatedDate', 'FirebaseUID', 'MustChangePassword'],
    'AuditLog': ['Timestamp', 'UserEmail', 'Action', 'Details'],
    'SystemConfig': ['ConfigKey', 'ConfigValue', 'Description', 'UpdatedDate'],
    'UserProfiles': ['FirebaseUID', 'Email', 'FullName', 'Phone', 'Language', 'CreatedAt', 'UpdatedAt', 'PrivacyAcceptedAt', 'TermsAcceptedAt', 'PolicyVersion', 'DeletionRequestedAt'],
    'Assessments': ['AssessmentID', 'FirebaseUID', 'CreatedAt', 'AnswersJson', 'ConsentAt', 'PolicyVersion'],
    'SupportRequests': ['RequestID', 'Reference', 'FirebaseUID', 'AssessmentID', 'CreatedAt', 'SupportMethod', 'ContactMethod', 'ContactInfo', 'CenterID', 'Province', 'District', 'AdditionalDetails', 'Status', 'Priority', 'ConsentAt', 'IdempotencyKey', 'UpdatedAt'],
    'RequestMessages': ['MessageID', 'RequestID', 'AuthorUID', 'AuthorRole', 'CreatedAt', 'Message', 'IsInternal'],
    'RequestStatusHistory': ['HistoryID', 'RequestID', 'PreviousStatus', 'NewStatus', 'ChangedByUID', 'ChangedByRole', 'Timestamp', 'AdminNote'],
    'RequestRecommendations': ['RecommendationID', 'RequestID', 'CenterID', 'PersonalizedNote', 'NextSteps', 'CreatedByUID', 'CreatedAt'],
    'UserConsents': ['ConsentID', 'FirebaseUID', 'RequestID', 'ConsentType', 'PolicyVersion', 'Timestamp', 'DataShareConsent']
  };

  for (var tabName in tabs) {
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      Logger.log('Created tab: ' + tabName);
    }
    // Add missing headers without changing existing records.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(tabs[tabName]);
      sheet.getRange(1, 1, 1, tabs[tabName].length).setFontWeight('bold').setBackground('#242426').setFontColor('#D8BE82');
      sheet.setFrozenRows(1);
    } else {
      var currentHeaders = getTableHeaders(sheet);
      var missingHeaders = tabs[tabName].filter(function (header) {
        return currentHeaders.indexOf(header) === -1;
      });
      if (missingHeaders.length) {
        var firstNewColumn = sheet.getLastColumn() + 1;
        sheet.getRange(1, firstNewColumn, 1, missingHeaders.length).setValues([missingHeaders]);
        sheet.getRange(1, firstNewColumn, 1, missingHeaders.length).setFontWeight('bold').setBackground('#242426').setFontColor('#D8BE82');
      }
    }
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
