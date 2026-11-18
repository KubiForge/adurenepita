import { DonationRecord, PaymentProvider, Currency } from '../types/donation';
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

interface DonationCheckoutResponse {
  referenceId: string;
  checkoutUrl: string;
  record: DonationRecord;
}

class PaymentService {
  async initiateDonation(params: InitiateDonationParams): Promise<DonationCheckoutResponse> {
    const response = await apiService.request<DonationCheckoutResponse>('/api/donations/initiate', {
      method: 'POST',
      body: params,
    });

    if (!response.data?.referenceId || !response.data.checkoutUrl || !response.data.record) {
      throw new Error('The payment service did not return a verified checkout session.');
    }

    return response.data;
  }

  async verifyPayment(): Promise<never> {
    throw new Error('Payment status must be confirmed by the payment provider, not the browser.');
  }
}

export const paymentService = new PaymentService();
