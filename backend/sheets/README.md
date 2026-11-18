# Beyond the Darkness – Google Sheets Database Architecture

This document describes the physical workbook layout for the **Beyond the Darkness – අඳුරෙන් එළියට** platform. The Google Sheets workbook functions as the persistent structured data store, managed through the Google Apps Script integration layer; `setupBeyondTheDarknessEnvironment()` is the authoritative list of initialized tabs.

---

### Physical Workbook Tabs Specification

#### 1. `SiteContent`
Stores approved public educational text, FAQs, and multilingual strings.
- **Columns**: `ContentKey` (String), `Language` ('si' | 'en' | 'ta'), `Section` (String), `TextContent` (String), `LastUpdated` (ISO Date).
- **Access**: Read: Public Web App; Write: Admin role only.

#### 2. `DrugKnowledge`
Approved clinical substance monographs for RAG search and Knowledge Centre.
- **Columns**: `Name`, `NameSi`, `ReviewStatus` ('draft' | 'pending_review' | 'approved' | 'rejected' | 'expired'), `Classification`, `Description`, `ShortTermEffects`, `EmergencySigns`, `Treatment`, `SourceTitle`, `SourceUrl`, `LastReviewDate`.
- **Governance**: Only rows with `ReviewStatus === 'approved'` are retrieved by Grok AI or displayed on the public website.

#### 3. `SupportDirectory`
Verified Sri Lankan care facilities, hospital psychiatry units, and rehabilitation centers.
- **Columns**: `CenterID`, `Name`, `NameSi`, `Province`, `District`, `Phone`, `Address`, `OperatingHours`, `VerificationStatus` ('verified' | 'pending' | 'needs_recheck'), `LastVerifiedDate`.
- **Maintenance**: Admin re-verifies phone lines and operating hours periodically.

#### 4. `WizardSubmissions`
Anonymous guided wizard intake records and consent-driven referral requests.
- **Columns**: `SubmissionID`, `Timestamp`, `Purpose`, `Situation`, `Substances`, `Duration`, `Province`, `District`, `SupportPreference`.
- **Privacy Rule**: Anonymous by default; personal identifying information is omitted.

#### 5. `DonationRecords`
Financial ledger for public contributions.
- **Columns**: `ReferenceID`, `Timestamp`, `Amount`, `Currency`, `PaymentStatus` ('pending' | 'verified' | 'failed'), `DonorName`, `DonorEmail`, `PaymentProvider`, `CampaignAllocation`, `ReceiptDrivePath`.
- **Security Rule**: Card numbers, CVVs, and banking secrets are NEVER stored here.
- **Current status**: Donation intake is paused. The Apps Script initiation and verification handlers return an error until an approved gateway checkout and signed provider callback are implemented.
- **Verification**: Never mark a donation as verified from browser-supplied status or transaction IDs. Do not claim tax deductibility, approval, audit, or receipt issuance without published evidence.

#### 6. `Campaigns`
Upcoming and past awareness campaigns, dates, and attendance.
- **Columns**: `EventID`, `Title`, `TitleSi`, `Phase`, `EventDate`, `Location`, `Status`, `Participants`.

#### 7. `CampaignRegistrations`
Adult event registrations and authorized school/guardian registrations.
- **Columns**: `ReferenceID`, `IdempotencyKey`, `EventID`, `FullName`, `Email`, `ParticipantType`, `AdultOrGuardianConfirmed`, `ConsentToContact`, `SubmittedAt`, `Status`.
- **API**: `POST /api/campaign-registrations`; return `{ success: true, data: { reference } }` only after the record is durably stored.
- **Retries**: Treat `IdempotencyKey` as unique so retrying the same request cannot create duplicate registrations.
- **Safeguarding**: Do not accept or store personal details for minors. Require the adult/guardian confirmation and contact consent flags.
- **Access**: Private to the project coordination team; never expose registration records through public reads.

#### 8. `CampaignFeedback`
Optional, non-identifying feedback used to improve outreach.
- **Columns**: `ReferenceID`, `IdempotencyKey`, `EventID`, `Rating`, `Feedback`, `ConfirmsNoPersonalDetails`, `SubmittedAt`.
- **API**: `POST /api/campaign-feedback`; return `{ success: true, data: { reference } }` only after the record is durably stored.
- **Retries**: Treat `IdempotencyKey` as unique so retrying the same request cannot create duplicate feedback.
- **Privacy**: The form requests no identity details and the API rejects obvious email addresses and phone numbers, but free text cannot be guaranteed anonymous. Tell users not to include names or health details, restrict access to authorized coordinators, and define an approved retention schedule before launch.

#### 9. `VolunteerApplications`
Consent-based applications for outreach roles.
- **Columns**: `ReferenceID`, `IdempotencyKey`, `FullName`, `Email`, `Phone`, `RoleID`, `ConsentToContact`, `SubmittedAt`, `Status`.
- **API**: `POST /api/volunteer-applications`; return `{ success: true, data: { reference } }` only after the record is durably stored.
- **Retries**: Treat `IdempotencyKey` as unique so retrying the same request cannot create duplicate applications.
- **Privacy**: Keep contact details private to authorized coordinators and follow an approved retention schedule.

#### 10. `AIUsage`
Operational analytics, inference performance, and safety metrics.
- **Columns**: `Timestamp`, `Model`, `Tokens`, `StatusCode`, `CostEstimateUSD`.
- **Privacy Rule**: Raw sensitive user prompts are NOT logged to prevent privacy leaks.

#### 11. `AdminUsers`
Allowlist of authorized internal system identities.
- **Columns**: `Email`, `Role` ('ADMIN' | 'TECHNICAL_CREW'), `IsActive` (Boolean), `CreatedDate`.
- **Security**: Strictly limited to the two authorized roles.

#### 12. `AuditLog`
Audit trail of administrative modifications.
- **Columns**: `Timestamp`, `UserEmail`, `Action`, `Details`.

#### 13. `SystemConfig`
Non-sensitive runtime operational flags.
- **Columns**: `ConfigKey`, `ConfigValue`, `Description`, `UpdatedDate`.
- **Rule**: API keys (e.g. `GROK_API_KEY`) must NEVER be stored here; they belong exclusively in Apps Script Script Properties.

### Public submission behavior

The website does not simulate successful delivery for campaign registrations, campaign feedback, or volunteer applications. These submissions require the configured Apps Script backend and the write endpoints listed above. In demo mode or when a write request fails, the page must show an error and must not claim that a record was received.

Before enabling these forms in production, run `setupBeyondTheDarknessEnvironment()` to create or update the submission tabs, deploy the updated Apps Script web app, and configure the frontend to use that deployment URL.
