# Beyond the Darkness – Google Sheets Database Architecture

This document specifies the official 10-tab physical workbook layout for the **Beyond the Darkness – අඳුරෙන් එළියට** platform. The Google Sheets workbook functions as the persistent structured data store, managed through the Google Apps Script integration layer.

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

#### 6. `Campaigns`
Upcoming and past awareness campaigns, dates, and attendance.
- **Columns**: `EventID`, `Title`, `TitleSi`, `Phase`, `EventDate`, `Location`, `Status`, `Participants`.

#### 7. `AIUsage`
Operational analytics, inference performance, and safety metrics.
- **Columns**: `Timestamp`, `Model`, `Tokens`, `StatusCode`, `CostEstimateUSD`.
- **Privacy Rule**: Raw sensitive user prompts are NOT logged to prevent privacy leaks.

#### 8. `AdminUsers`
Allowlist of authorized internal system identities.
- **Columns**: `Email`, `Role` ('ADMIN' | 'TECHNICAL_CREW'), `IsActive` (Boolean), `CreatedDate`.
- **Security**: Strictly limited to the two authorized roles.

#### 9. `AuditLog`
Audit trail of administrative modifications.
- **Columns**: `Timestamp`, `UserEmail`, `Action`, `Details`.

#### 10. `SystemConfig`
Non-sensitive runtime operational flags.
- **Columns**: `ConfigKey`, `ConfigValue`, `Description`, `UpdatedDate`.
- **Rule**: API keys (e.g. `GROK_API_KEY`) must NEVER be stored here; they belong exclusively in Apps Script Script Properties.
