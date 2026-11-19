export type ServiceType =
  | 'counseling'
  | 'rehabilitation'
  | 'medical'
  | 'referral'
  | 'family_support'
  | 'hotline'
  | 'peer_support';

export type VerificationStatus = 'verified' | 'pending' | 'needs_recheck' | 'suspended';

export const SUPPORT_PROGRAM_FILTERS = [
  { id: 'detoxification', label: 'Detoxification' },
  { id: 'inpatient', label: 'Inpatient' },
  { id: 'outpatient', label: 'Outpatient' },
  { id: 'counseling_psychiatry', label: 'Counseling & psychiatry' },
  { id: 'twelve_step', label: '12-step support' },
  { id: 'evidence_based', label: 'Evidence-based treatment' },
  { id: 'youth_family', label: 'Youth & family rehabilitation' },
  { id: 'lgbtq', label: 'LGBTQ+ inclusive' },
  { id: 'women', label: 'Women-specific programs' },
  { id: 'men', label: 'Men-specific programs' },
  { id: 'social_reintegration', label: 'Social reintegration' },
] as const;

export type SupportProgram = (typeof SUPPORT_PROGRAM_FILTERS)[number]['id'];

export interface SupportCenter {
  id: string;
  name: string;
  nameSi: string;
  nameTa?: string;
  organizationType: 'government' | 'ngo' | 'community' | 'hospital';
  province: string;
  district: string;
  city: string;
  address: string;
  addressSi: string;
  phone: string;
  alternativePhone?: string;
  email?: string;
  website?: string;
  serviceTypes: ServiceType[];
  languagesSupported: ('si' | 'en' | 'ta')[];
  operatingHours: string;
  operatingHoursSi: string;
  admissionRequirements?: string;
  admissionRequirementsSi?: string;
  isFreeOrGovernmentFunded: boolean;
  latitude: number;
  longitude: number;
  coordinatesAreApproximate?: boolean;
  verificationStatus: VerificationStatus;
  lastVerifiedDate: string;
  verifiedBy: string;
  verificationSourceUrl?: string;
  programs?: SupportProgram[];
  lastUpdatedDate?: string;
  accreditation?: {
    label: string;
    authority: string;
    lastVerifiedDate: string;
  };
  waitingTime?: string;
  costInformation?: string;
  insuranceInformation?: string;
  referralProcess?: string;
  appointmentUrl?: string;
  description: string;
  descriptionSi: string;
}

export interface SupportReferralRequest {
  id?: string;
  centerId: string;
  preferredLanguage: 'si' | 'en' | 'ta';
  contactMethod: 'phone' | 'email' | 'in_person';
  contactInfo: string;
  preferredTime?: string;
  briefConcern?: string;
  explicitConsentGiven: boolean;
  submittedAt: string;
  status: 'pending' | 'assigned' | 'contacted' | 'declined' | 'closed';
}

export interface ProvinceWithDistricts {
  id: string;
  name: string;
  nameSi: string;
  nameTa: string;
  districts: {
    id: string;
    name: string;
    nameSi: string;
    nameTa: string;
  }[];
}
