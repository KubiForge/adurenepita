export type PaymentProvider = 'payhere' | 'webxpay' | 'stripe';

export type PaymentStatus =
  | 'pending'
  | 'verified'
  | 'failed'
  | 'refunded'
  | 'disputed';

export type Currency = 'LKR' | 'USD' | 'EUR' | 'GBP';

export interface DonationRecord {
  id: string;
  referenceId: string;
  amount: number;
  currency: Currency;
  isRecurring: boolean;
  frequency?: 'monthly' | 'one_time';
  donorName?: string; // Optional (anonymous allowed)
  donorEmail?: string;
  donorPhone?: string;
  dedicationMessage?: string;
  isAnonymous: boolean;
  paymentProvider: PaymentProvider;
  paymentStatus: PaymentStatus;
  providerTransactionId?: string;
  receiptDriveReference?: string;
  createdAt: string;
  verifiedAt?: string;
  reconciledBy?: string;
  campaignAllocation: string;
}

export interface DonationSummary {
  totalVerifiedAmountLKR: number;
  totalDonorsCount: number;
  pendingTransactionsCount: number;
  failedTransactionsCount: number;
  recentDonations: DonationRecord[];
}
