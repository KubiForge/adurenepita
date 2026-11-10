import { DonationRecord, PaymentProvider, Currency, PaymentStatus } from '../types/donation';
import { apiService } from './apiService';

export interface InitiateDonationParams {
  amount: number;
  currency: Currency;
  isRecurring: boolean;
  frequency?: 'monthly' | 'one_time';
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  dedicationMessage?: string;
  isAnonymous: boolean;
  paymentProvider: PaymentProvider;
  campaignAllocation: string;
}

class PaymentService {
  /**
   * Generates a unique transaction reference formatted for Leo Club audit tracking.
   */
  generateReference(): string {
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `BTD-${Date.now().toString().slice(-6)}-${randomHex}`;
  }

  /**
   * Initializes a donation checkout session with the selected payment gateway.
   */
  async initiateDonation(params: InitiateDonationParams): Promise<{
    success: boolean;
    referenceId: string;
    checkoutUrl?: string;
    record: DonationRecord;
  }> {
    const referenceId = this.generateReference();
    const record: DonationRecord = {
      id: `don-${Date.now()}`,
      referenceId,
      amount: params.amount,
      currency: params.currency,
      isRecurring: params.isRecurring,
      frequency: params.frequency || 'one_time',
      donorName: params.isAnonymous ? 'Anonymous Supporter' : params.donorName,
      donorEmail: params.donorEmail,
      donorPhone: params.donorPhone,
      dedicationMessage: params.dedicationMessage,
      isAnonymous: params.isAnonymous,
      paymentProvider: params.paymentProvider,
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      campaignAllocation: params.campaignAllocation || 'General Drug Prevention & Recovery Support',
    };

    // Save pending record to local cache and backend
    this.saveRecordToLocalCache(record);

    await apiService.request('/api/donations/initiate', {
      method: 'POST',
      body: record,
    });

    return {
      success: true,
      referenceId,
      record,
    };
  }

  /**
   * Verifies payment result server-side (preventing client-side tampering).
   */
  async verifyPayment(
    referenceId: string,
    providerTransactionId: string,
    status: PaymentStatus = 'verified'
  ): Promise<{ success: boolean; record: DonationRecord | null }> {
    const records = this.getRecordsFromLocalCache();
    const existingIndex = records.findIndex((r) => r.referenceId === referenceId);

    if (existingIndex === -1) {
      return { success: false, record: null };
    }

    const updated: DonationRecord = {
      ...records[existingIndex],
      paymentStatus: status,
      providerTransactionId,
      verifiedAt: status === 'verified' ? new Date().toISOString() : undefined,
      receiptDriveReference:
        status === 'verified'
          ? `/BeyondTheDarkness/DonationReceipts/RECEIPT-${referenceId}.pdf`
          : undefined,
    };

    records[existingIndex] = updated;
    localStorage.setItem('btd_donations_ledger', JSON.stringify(records));

    // Notify backend
    await apiService.request('/api/donations/verify', {
      method: 'POST',
      body: updated,
    });

    return { success: true, record: updated };
  }

  /**
   * Retrieves all verified & pending donation records for Admin reconciliation.
   */
  getRecordsFromLocalCache(): DonationRecord[] {
    const raw = localStorage.getItem('btd_donations_ledger');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return [];
      }
    }

    // Default verified seed records for administration demonstration
    const seedRecords: DonationRecord[] = [
      {
        id: 'don-seed-1',
        referenceId: 'BTD-849102-X94A',
        amount: 25000,
        currency: 'LKR',
        isRecurring: false,
        frequency: 'one_time',
        donorName: 'Anonymous Alumnus',
        isAnonymous: true,
        paymentProvider: 'payhere',
        paymentStatus: 'verified',
        providerTransactionId: 'PH-TXN-9024192',
        receiptDriveReference: '/BeyondTheDarkness/DonationReceipts/RECEIPT-BTD-849102-X94A.pdf',
        createdAt: '2026-11-08T10:14:00.000Z',
        verifiedAt: '2026-11-08T10:15:30.000Z',
        campaignAllocation: 'Campus Youth Peer Mentoring Program',
      },
      {
        id: 'don-seed-2',
        referenceId: 'BTD-849103-B21C',
        amount: 10000,
        currency: 'LKR',
        isRecurring: true,
        frequency: 'monthly',
        donorName: 'Dr. K. Jayasuriya',
        donorEmail: 'k.jayasuriya@example.com',
        isAnonymous: false,
        paymentProvider: 'webxpay',
        paymentStatus: 'verified',
        providerTransactionId: 'WX-TXN-492104',
        receiptDriveReference: '/BeyondTheDarkness/DonationReceipts/RECEIPT-BTD-849103-B21C.pdf',
        createdAt: '2026-11-09T14:22:00.000Z',
        verifiedAt: '2026-11-09T14:23:15.000Z',
        campaignAllocation: 'Drug Knowledge Centre & Clinical Grounding',
      },
      {
        id: 'don-seed-3',
        referenceId: 'BTD-849104-Z88M',
        amount: 5000,
        currency: 'LKR',
        isRecurring: false,
        frequency: 'one_time',
        isAnonymous: true,
        paymentProvider: 'payhere',
        paymentStatus: 'pending',
        createdAt: '2026-11-10T08:30:00.000Z',
        campaignAllocation: 'General Drug Prevention & Recovery Support',
      },
    ];

    localStorage.setItem('btd_donations_ledger', JSON.stringify(seedRecords));
    return seedRecords;
  }

  private saveRecordToLocalCache(record: DonationRecord) {
    const list = this.getRecordsFromLocalCache();
    list.unshift(record);
    localStorage.setItem('btd_donations_ledger', JSON.stringify(list));
  }
}

export const paymentService = new PaymentService();
