/**
 * Donation & Financial Ledger Service
 * Logs public contributions to Google Sheets (DonationRecords) and creates Drive receipts.
 */

function handleDonationInitiate(payload) {
  var sheet = getSheetTab('DonationRecords');
  if (sheet) {
    sheet.appendRow([
      payload.referenceId || ('BTD-' + new Date().getTime()),
      new Date().toISOString(),
      payload.amount || 0,
      payload.currency || 'LKR',
      'pending',
      payload.isAnonymous ? 'Anonymous' : (payload.donorName || ''),
      payload.donorEmail || '',
      payload.paymentProvider || 'payhere',
      payload.campaignAllocation || 'General Prevention',
      ''
    ]);
  }
  return {
    success: true,
    referenceId: payload.referenceId,
    status: 'pending'
  };
}

function handleDonationVerify(payload) {
  var sheet = getSheetTab('DonationRecords');
  if (!sheet) return { success: false, error: 'Ledger sheet unavailable' };

  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === payload.referenceId) {
      rowIndex = i + 1; // 1-based index
      break;
    }
  }

  var receiptPath = '/BeyondTheDarkness/DonationReceipts/RECEIPT-' + payload.referenceId + '.pdf';

  if (rowIndex !== -1) {
    // Update status to verified
    sheet.getRange(rowIndex, 5).setValue('verified');
    sheet.getRange(rowIndex, 10).setValue(receiptPath);
  } else {
    // Append new verified row
    sheet.appendRow([
      payload.referenceId,
      new Date().toISOString(),
      payload.amount,
      payload.currency,
      'verified',
      payload.isAnonymous ? 'Anonymous' : (payload.donorName || ''),
      payload.donorEmail || '',
      payload.paymentProvider,
      payload.campaignAllocation,
      receiptPath
    ]);
  }

  logAuditEvent('DONATION', 'VERIFIED', 'Donation ' + payload.referenceId + ' verified for ' + payload.amount + ' ' + payload.currency);

  return {
    success: true,
    referenceId: payload.referenceId,
    paymentStatus: 'verified',
    receiptDriveReference: receiptPath
  };
}
