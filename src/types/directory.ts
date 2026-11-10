export type ServiceType =
  | 'counseling'
  | 'rehabilitation'
  | 'medical'
  | 'family_support'
  | 'hotline'
  | 'peer_support';

export type VerificationStatus = 'verified' | 'pending' | 'needs_recheck' | 'suspended';

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
  verificationStatus: VerificationStatus;
  lastVerifiedDate: string;
  verifiedBy: string;
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
