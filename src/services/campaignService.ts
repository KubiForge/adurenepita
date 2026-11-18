import { apiService } from './apiService';

export interface CampaignRegistrationInput {
  eventId: string;
  fullName: string;
  email: string;
  participantType: string;
  adultOrGuardian: boolean;
  consentToContact: boolean;
  idempotencyKey: string;
}

export interface CampaignFeedbackInput {
  eventId: string;
  rating: number;
  feedback: string;
  confirmsNoPersonalDetails: boolean;
  idempotencyKey: string;
}

export interface VolunteerApplicationInput {
  fullName: string;
  email: string;
  phone: string;
  roleId: string;
  consentToContact: boolean;
  idempotencyKey: string;
}

interface SubmissionReceipt {
  reference: string;
}

const submit = async (
  endpoint: string,
  payload: CampaignRegistrationInput | CampaignFeedbackInput | VolunteerApplicationInput,
): Promise<SubmissionReceipt> => {
  const response = await apiService.request<SubmissionReceipt>(endpoint, {
    method: 'POST',
    body: payload,
  });

  if (!response.data?.reference) {
    throw new Error('The submission service did not return a confirmation reference. Please try again later.');
  }

  return response.data;
};

export const campaignService = {
  registerForEvent: (payload: CampaignRegistrationInput) =>
    submit('/api/campaign-registrations', payload),
  submitFeedback: (payload: CampaignFeedbackInput) =>
    submit('/api/campaign-feedback', payload),
  applyToVolunteer: (payload: VolunteerApplicationInput) =>
    submit('/api/volunteer-applications', payload),
};
