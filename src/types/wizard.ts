export type WizardPurpose =
  | 'stop_using'
  | 'drug_info'
  | 'worried_about_someone'
  | 'health_concern'
  | 'professional_support'
  | 'prevention_info'
  | 'other';

export type UserSituation =
  | 'currently_using'
  | 'recently_stopped'
  | 'trying_to_reduce'
  | 'difficult_to_stay_away'
  | 'considering_help'
  | 'unsure'
  | 'other';

export type ConcernDuration =
  | 'less_than_1_month'
  | '1_to_6_months'
  | '6_to_12_months'
  | '1_to_3_years'
  | 'more_than_3_years'
  | 'not_sure'
  | 'prefer_not_to_say';

export type CurrentState =
  | 'using_regularly'
  | 'using_occasionally'
  | 'recently_stopped'
  | 'experiencing_cravings'
  | 'possible_withdrawal'
  | 'not_currently_using'
  | 'prefer_not_to_say';

export type SupportPreference =
  | 'educational_info'
  | 'ai_guided_support'
  | 'professional_counseling'
  | 'rehabilitation_info'
  | 'healthcare_professional'
  | 'family_support'
  | 'not_sure';

export type PersonNeedingSupport = 'myself' | 'family_member' | 'friend' | 'someone_else' | 'prefer_not_to_say';

export type UseFrequency = 'daily' | 'several_times_week' | 'weekly_or_less' | 'unsure' | 'prefer_not_to_say';

export type PreviousSupport = 'currently_receiving' | 'received_before' | 'not_yet' | 'prefer_not_to_say';

export interface WizardAnswers {
  // Step 1
  purpose?: WizardPurpose;
  purposeOther?: string;

  // Step 2
  personNeedingSupport?: PersonNeedingSupport;
  situation?: UserSituation;
  situationOther?: string;

  // Step 3
  substances: string[];
  substanceOther?: string;

  // Step 4
  duration?: ConcernDuration;

  // Step 5
  currentState?: CurrentState;
  useFrequency?: UseFrequency;

  // Step 6
  concerns: string[];
  concernOther?: string;

  // Step 7
  supportPreference?: SupportPreference;

  // Step 8
  province?: string;
  district?: string;
  locality?: string;

  // Step 9
  additionalContext?: string;
  previousSupport?: PreviousSupport;
  healthInfo?: string;

  // Step 10
  privacyNoticeAcknowledged?: boolean;
}

export interface WizardCompletionResult {
  purpose: WizardPurpose;
  recommendedSubstances: string[];
  recommendedCenters: string[];
  suggestedArticles: string[];
  emergencyWarning: boolean;
  emergencyReason?: string;
  nextSteps: {
    title: string;
    description: string;
    actionLabel: string;
    actionType: 'chat' | 'directory' | 'emergency' | 'learn';
    actionTarget?: string;
  }[];
}
