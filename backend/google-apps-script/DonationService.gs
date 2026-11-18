/**
 * Donation endpoints stay closed until a verified gateway checkout and signed
 * provider callback are configured. Browser-supplied payment statuses are not trusted.
 */
function handleDonationInitiate() {
  throw createApiError(
    'Donation intake is paused until an approved payment gateway is configured.',
    503
  );
}

function handleDonationVerify() {
  throw createApiError(
    'Payment status can only be recorded from a verified payment-provider callback.',
    503
  );
}
