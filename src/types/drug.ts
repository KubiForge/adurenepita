export type SubstanceClassification =
  | 'Depressant'
  | 'Stimulant'
  | 'Opioid'
  | 'Cannabinoid'
  | 'Hallucinogen'
  | 'Dissociative'
  | 'Prescription Medicine'
  | 'Inhalant'
  | 'Mixed'
  | 'Nicotine/Tobacco';

export type ReviewStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'expired';

export interface SourceReference {
  id: string;
  title: string;
  organization: string; // e.g. WHO, NDDCB, SAMHSA
  url: string;
  publicationDate: string;
  accessDate: string;
}

export interface MythVsFact {
  myth: string;
  mythSi: string;
  fact: string;
  factSi: string;
  evidence: string;
}

export interface DrugKnowledge {
  id: string;
  slug: string;
  name: string;
  nameSi: string;
  nameTa: string;
  commonNames: string[];
  aliases: string[];
  classification: SubstanceClassification;
  description: string;
  descriptionSi: string;
  descriptionTa: string;
  shortTermEffects: string[];
  shortTermEffectsSi: string[];
  longTermPhysicalEffects: string[];
  longTermPhysicalEffectsSi: string[];
  psychologicalEffects: string[];
  psychologicalEffectsSi: string[];
  warningSigns: string[];
  warningSignsSi: string[];
  dependence: string;
  dependenceSi: string;
  withdrawalRisks: string[];
  withdrawalRisksSi: string[];
  emergencySigns: string[];
  emergencySignsSi: string[];
  evidenceBasedTreatment: string;
  evidenceBasedTreatmentSi: string;
  preventionInfo: string;
  preventionInfoSi: string;
  mythsVsFacts: MythVsFact[];
  sources: SourceReference[];
  publicationDate: string;
  lastReviewDate: string;
  reviewStatus: ReviewStatus;
  reviewerName: string;
  reviewerCredentials?: string;
  verifiedMedicalReview: boolean;
}
