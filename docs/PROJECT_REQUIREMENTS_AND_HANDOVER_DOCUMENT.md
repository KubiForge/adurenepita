# Beyond the Darkness - Project Requirements and Handover Document

**BEYOND THE DARKNESS – අඳුරෙන් එළියට**  
**AI-Powered Drug Prevention, Awareness and Recovery Support Platform**

**Organization:** Leo Club of University of Sri Jayewardenepura  
**Affiliation:** Lions International, Leo District 306 D2  
**Campaign Message:** PREVENT - SUPPORT - CONNECT  
**Document Version:** 1.0  
**Document Date:** 18 November 2026  
**Repository:** `KubiForge/adurenepita`

---

## 1. Project Purpose

Beyond the Darkness is a multilingual public support platform for:

- drug prevention and awareness;
- evidence-based substance information;
- Sri Lankan rehabilitation and treatment discovery;
- crisis and mental-health helpline access;
- confidential guided support;
- voluntary recovery support and community engagement;
- campaign, volunteer, and donation management;
- administrative and clinical content governance.

The platform is an educational and referral support tool. It must not claim to diagnose addiction, prescribe medication, replace medical professionals, perform emergency dispatch, or guarantee treatment outcomes.

### 1.1 Primary Objectives

1. Increase public understanding of drugs, addiction risks, overdose warnings, withdrawal hazards, and prevention.
2. Provide a safe route for users to find verified Sri Lankan healthcare and recovery services.
3. Make crisis help and emergency contacts visible and accessible.
4. Provide multilingual support in Sinhala, English, and Tamil.
5. Protect user privacy and minimize collection of personal health information.
6. Use reviewed, cited, and non-stigmatizing information.
7. Support community campaigns and transparent organizational operations.
8. Provide controlled administration through verified organizational roles.

---

## 2. Target Users

| User Group | Primary Needs |
|---|---|
| General public | Awareness, prevention, drug facts, myths and misconceptions |
| People affected by substance use | Confidential guidance, service discovery, recovery information |
| Family members and carers | Warning signs, first actions, family support, referral options |
| Students and educators | School and university prevention material |
| Professionals | Clinical references and reliable educational resources |
| Treatment providers | A verified directory listing and referral channel |
| Volunteers | Campaign participation and community support |
| Donors | Transparent donation process and campaign impact |
| Administrators | Content, campaign, referral, donation, and security management |
| Technical crew | System diagnostics and operational monitoring |

---

## 3. Complete Product Scope

### 3.1 Public Website

The public platform must include:

- responsive home page;
- official campaign identity and Sri Lankan organizational context;
- clear prevention, support, and emergency calls to action;
- multilingual Sinhala, English, and Tamil content;
- accessible mobile-first navigation;
- search for articles and substance information;
- privacy and consent notices;
- medical and emergency disclaimers;
- content owner, source, review, and last-updated information;
- keyboard and screen-reader accessibility;
- pages for a 404 state and unavailable-service state.

### 3.2 Drug Prevention and Awareness

The awareness section must provide:

- substance categories and drug monographs;
- common names, street names, and Sinhala/Tamil names;
- scientific and plain-language descriptions;
- short-term and long-term health effects;
- dependence and withdrawal risks;
- overdose signs;
- first actions in an emergency;
- evidence-based treatment options;
- prevention guidance;
- myths versus facts;
- age-appropriate prevention resources;
- school, university, workplace, and family guides;
- posters, infographics, videos, articles, and downloadable resources;
- source citations and professional review status;
- a clear warning against unsafe self-detoxification.

Substance content must not provide:

- acquisition assistance;
- manufacturing instructions;
- dosing or potency optimization;
- evasion advice;
- instructions for unsafe withdrawal;
- individualized medical advice that could replace professional care.

### 3.3 Rehabilitation and Treatment Directory

The directory must contain verified Sri Lankan organizations and facilities including:

- government hospitals and psychiatric units;
- state rehabilitation and detoxification centers;
- NGO and nonprofit treatment services;
- outpatient counseling services;
- residential rehabilitation services;
- family and youth support programs;
- private specialists and accredited clinics;
- community support organizations.

Each listing should include:

- official name and organization type;
- province and district;
- physical address;
- telephone and verified official website;
- available services;
- inpatient or outpatient status;
- youth or family support;
- languages available;
- opening and response hours;
- cost category and payment or insurance information;
- referral and appointment process;
- verification status;
- verification source;
- verification date;
- last-updated date;
- map location when permission and accurate coordinates are available.

Directory records must be reviewed before publication. Temporary, closed, unverified, or duplicate listings must not remain publicly visible.

### 3.4 Helplines and Emergency Support

The platform must provide a prominent emergency section with:

- `Call Emergency Help` action;
- suicide and self-harm crisis support;
- overdose and medical emergency support;
- alcohol or drug-related mental-health support;
- child, women, and domestic violence support;
- ambulance and hospital routing guidance;
- location-aware nearest facility discovery;
- phone, WhatsApp, SMS, or web form options where officially available;
- operating hours and availability;
- last-verified date;
- Sri Lankan national, provincial, and district contacts.

The platform must clearly state that it cannot replace 1990 ambulance services or other official emergency dispatch.

### 3.5 Confidential Guided Support

The guided support journey should:

- identify the visitor's purpose;
- understand the immediate situation;
- identify substance concerns;
- collect duration and priority concerns;
- recognize high-risk symptoms;
- offer preferred support options;
- collect province and district;
- collect optional context;
- present a review and obtain explicit consent;
- recommend education, AI support, counseling, or rehabilitation providers;
- support editing of previous answers;
- provide a private and understandable results summary.

The guided journey must not present a final clinical diagnosis or guarantee of recovery.

### 3.6 AI Support Assistant

The AI assistant must support:

- Sinhala, English, and Tamil;
- general drug prevention education;
- recovery support and coping resources;
- source-grounded responses;
- substance-specific information;
- urgent medical escalation;
- crisis escalation;
- chat history controls;
- visible disclaimer and limitations;
- no access to private system credentials;
- no collection of API keys or payment credentials;
- citations to approved sources;
- unknown-answer or uncertainty handling.

The AI must not diagnose, prescribe, calculate unsafe doses, advise dangerous withdrawal, encourage drug use, or claim to be a doctor or counselor.

### 3.7 Recovery Journeys

The platform should provide:

- recovery milestones;
- saved resources;
- referral history;
- private session reflections;
- recovery planning prompts;
- family and carer resources;
- relapse prevention education;
- reintegration and employment support;
- aftercare and follow-up resources;
- treatment and support links.

Private reflections must be clearly explained. Encryption or server persistence must not be claimed unless it is implemented and independently verifiable.

### 3.8 Community and Campaigns

The community area should include:

- campaign calendar;
- school and university programs;
- community awareness events;
- volunteer registration;
- pledge or campaign participation;
- moderated peer-support information;
- anonymous story submission;
- consent-based recovery stories;
- campaign progress and impact reporting;
- prevention resources for partners.

User-generated content must have moderation, consent, reporting, and removal controls. Stories must never identify minors or expose identifiable recovery information without informed consent.

### 3.9 Donations

The donation system must include:

- one-time and recurring options;
- Sri Lankan rupee and supported foreign currencies;
- campaign allocation options;
- transparent impact descriptions;
- bank or payment gateway information;
- official receipt handling;
- donation status and reconciliation;
- sandbox or preview labeling;
- refund and cancellation information;
- privacy and consent notices.

Before public launch:

- live payment merchant credentials must be configured;
- no card data may be stored by the application;
- transaction verification must be server-side;
- sandbox behavior must be removed or clearly separated;
- reconciliation and refund procedures must be documented.

### 3.10 Legal and Policy Information

The platform should publish:

- accessibility statement;
- privacy policy;
- terms of use;
- medical disclaimer;
- consent policy;
- cookie or tracking disclosure;
- content policy;
- moderation policy;
- data retention and deletion policy;
- complaint and correction process;
- legal aid and rights information;
- Sri Lankan drug-law and rehabilitation information with authoritative sources.

Legal copy must be reviewed by qualified Sri Lankan professionals before publication.

### 3.11 Administration

Administration must support:

- dashboard analytics;
- article and page management;
- FAQ and banner management;
- drug monograph review;
- support-directory verification;
- user and referral review;
- campaign management;
- donation reconciliation;
- system settings;
- role and team management;
- audit logs;
- content approval workflow;
- helpline verification workflow;
- export and reporting;
- spam and abuse handling;
- diagnostic tools.

Administrative access must be limited to authenticated, verified, active, organization-approved accounts.

---

## 4. Roles and Permissions

| Role | Expected Permissions |
|---|---|
| Public Visitor | Read public content, use emergency tools, access the assistant and guided support |
| Registered User | Use profile and personal support features subject to implemented authentication |
| Admin | Manage approved content, facilities, campaigns, referrals, donations, and users |
| Technical Crew | Monitor integrations and infrastructure; receive only operational permissions |
| Super Administrator | Approve high-risk administrative changes and initial roles |
| External Reviewer | Approve or reject clinical content and facility verification |

Role must be determined from secure server-side authorization data. The browser must not be able to assign or elevate a role.

### 4.1 High-Risk Administrative Actions

The following actions require two-person approval or an auditable authorization policy:

- role creation and elevation;
- directory verification approval;
- clinical content publication;
- emergency helpline changes;
- production system configuration;
- donation ledger edits;
- bulk record deletion;
- data export;
- account deletion.

---

## 5. User Journeys

### 5.1 Visitor Needs Information

1. Visitor selects a drug or awareness topic.
2. Platform displays a source-reviewed monograph.
3. Visitor sees emergency signs and relevant helplines.
4. Visitor may save the resource or continue to support.

### 5.2 Visitor Needs Immediate Help

1. Emergency button is visible on first interaction.
2. Platform identifies ambulance, crisis, and drug-help options.
3. User receives direct-call or location-based options.
4. AI or guided support is not used as a substitute for emergency dispatch.

### 5.3 Visitor Needs a Service

1. Visitor selects province and district.
2. Directory returns verified facilities.
3. Visitor filters by service type and opening status.
4. Visitor views the provider and uses the official contact channel.
5. Optional referral submission occurs only after consent.

### 5.4 Visitor Starts Recovery Support

1. Visitor completes the guided journey.
2. High-risk answers trigger crisis safeguards.
3. The visitor reviews and consents.
4. The platform shows education, facility, and conversation options.
5. Any referral records only the minimum information required.

### 5.5 Administrator Publishes Content

1. Author creates or updates content.
2. Clinical reviewer checks sources and claims.
3. Organization approver publishes content.
4. Review date and approver are retained.
5. Public visitor sees source, review, and update metadata.

---

## 6. Functional Requirements

### 6.1 Core Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | The platform supports Sinhala, English, and Tamil | Critical |
| FR-02 | Emergency help is visible across public pages | Critical |
| FR-03 | Helpline numbers are verified before launch | Critical |
| FR-04 | Drug monographs contain sources and review dates | Critical |
| FR-05 | Facility directory supports province and district filters | Critical |
| FR-06 | Facility verification status is visible | Critical |
| FR-07 | AI chat includes crisis and medical safety escalation | Critical |
| FR-08 | Anonymous access is available where account access is not required | High |
| FR-09 | Referral submission requires consent | Critical |
| FR-10 | Personal data is minimized and protected | Critical |
| FR-11 | Admin access uses verified server-side authorization | Critical |
| FR-12 | Live payment processing is verified before real use | Critical |
| FR-13 | Every public page is responsive | Critical |
| FR-14 | Public content can be searched and filtered | High |
| FR-15 | Campaigns and volunteers can be managed | High |
| FR-16 | Donation records support reconciliation and export | High |
| FR-17 | Administrative actions are recorded in audit logs | Critical |
| FR-18 | The system clearly labels incomplete or sandbox features | Critical |

---

## 7. Non-Functional Requirements

### 7.1 Security

- HTTPS must be enforced.
- Production secrets must remain server-side.
- API keys must not be stored in frontend source or public environment values.
- Authentication must use Firebase or another approved identity provider.
- Authorization must be checked server-side.
- Sensitive records must use least-privilege access.
- Input must be validated and output must be escaped or safely rendered.
- Rate limiting and abuse protection must be enabled.
- Administrative and data access logs must be retained according to policy.
- Regular dependency and vulnerability checks must be performed.
- Backups and restore tests must be documented.

### 7.2 Privacy

- Collect only necessary data.
- Provide anonymous access where possible.
- Give explicit consent for referral and optional recording.
- Do not expose AI conversations as referral records unless explicitly consented.
- Support user requests for data correction and deletion.
- Retain records only for documented purposes.
- Hide personal identifiers in public reports and analytics.
- Document third-party payment and AI processing.

### 7.3 Availability

- Production health and uptime should be monitored.
- External integration failures must produce safe fallback states.
- The platform must provide a static emergency section even if the AI backend is unavailable.
- Critical pages must fail safely, with no false success message.
- Restore and incident procedures must be documented.

### 7.4 Performance

- Mobile-first rendering should remain usable on low bandwidth.
- Heavy media should be optimized to WebP/MP4 or suitable responsive formats.
- Major map and chart libraries should be loaded efficiently.
- Public pages should include clear loading, empty, and error states.
- Repeated API calls should be cached where appropriate.

### 7.5 Accessibility

- WCAG 2.2 AA or equivalent standards are the launch target.
- Every control must be keyboard operable.
- Images require meaningful alternative text.
- Color cannot be the only status indicator.
- Text contrast must meet accessibility requirements.
- Form errors and status updates must be accessible to screen readers.
- Content should support magnification and text resizing.
- Language switching must not change emergency meaning.

### 7.6 Localization

- All critical safety and emergency content must exist in Sinhala and Tamil.
- Time, date, number, and currency formats must be locale-aware.
- Machine translation must not be treated as reviewed clinical copy.
- Human review is required for all life-safety instructions.

---

## 8. Current Implementation Summary

### 8.1 Implemented Frontend Areas

- Welcome and entry experience
- Drug knowledge center
- Substance article/detail pages
- Support directory and Sri Lankan location filtering
- Awareness campaigns
- Community and volunteering
- Donation preview
- AI assistant
- Guided support wizard
- User journey
- Profile and settings
- Admin and Technical Crew portal

### 8.2 Implemented Technical Areas

- React 18 and Vite frontend
- TypeScript
- Tailwind CSS
- multilingual React context
- route structure
- Google Apps Script API services
- Google Sheets database design
- Google Drive folder structure
- Firebase authentication integration
- Grok AI proxy
- four-level safety and crisis classification
- administrative role separation
- CSV exports and audit logging

### 8.3 Implementation Status by Service

| Area | Status | Launch Condition |
|---|---:|---|
| Frontend build | Implemented | Final content and accessibility verification |
| Trilingual interface | Partial/Implemented | Clinical and safety copy require human review |
| Support directory | Implemented with sample records | Replace or verify every public record |
| AI safety engine | Implemented | Live behavioral testing and clinical approval |
| Google Apps Script | Implemented in source | Live deployment and integration testing |
| Google Sheets | Schema implemented | Create and provision live workbook |
| Firebase authentication | Implemented/integration in progress | Configure production project and seed approved admin |
| Donation workflow | Sandbox/preview | Replace with verified live gateway |
| Campaign and community features | Implemented/in-memory or local where applicable | Connect final persistence and moderation |
| Helpline and emergency directory | Implemented | Reverify all numbers and availability |

---

## 9. Launch-Blocking Requirements

The following items must be completed before any public launch:

1. Deploy and test the Google Apps Script backend.
2. Configure and test Firebase Authentication.
3. Provision the live Google Spreadsheet.
4. Configure all server-side secrets.
5. Verify every emergency and support phone number.
6. Verify every rehabilitation and treatment facility.
7. Obtain clinical review and sign-off for drug and withdrawal content.
8. Obtain legal review for privacy, consent, and Sri Lankan medical claims.
9. Publish reviewed Sinhala and Tamil safety content.
10. Remove or clearly isolate all demo, mock, or sandbox payment behavior.
11. Complete vulnerability, privacy, and abuse testing.
12. Add real backup and restore procedures.
13. Configure logging and incident alerts.
14. Complete accessibility testing.
15. Document support, moderation, and complaint ownership.
16. Test every public route on mobile and desktop.
17. Test emergency escalation in each language.
18. Confirm that all reports and exports avoid unnecessary personal data.

---

## 10. Test Plan

### 10.1 Functional Tests

- Navigation and route rendering
- Sinhala, English, and Tamil switching
- substance search and filters
- province, district, and service filters
- map markers and empty states
- wizard progression, editing, and consent
- AI source and fallback behavior
- Level 3 and Level 4 crisis interruption
- referral submission and consent
- profile update and session clearing
- admin login and role restrictions
- content CRUD and approval
- directory verification
- campaign and volunteer forms
- donation records and exports
- audit log exports

### 10.2 Safety Tests

- overdose recognition
- seizure and respiratory emergency terms
- suicide and self-harm terms in all languages
- alcohol and benzodiazepine withdrawal warnings
- harmful acquisition or manufacturing attempts
- unsupported medical diagnosis requests
- unsafe detox and medication requests
- unavailable AI backend behavior
- emergency number display without backend availability

### 10.3 Security Tests

- unauthorized admin route access
- role elevation attempts
- API secret exposure
- spreadsheet and Drive permissions
- API request validation
- rate and abuse limits
- malformed and oversized input
- unsafe HTML and script injection
- CSRF and CORS behavior
- export and audit permissions
- account deletion and data reset

### 10.4 Accessibility Tests

- keyboard-only navigation
- screen-reader page structure
- form labels and error messages
- contrast and zoom
- mobile viewport behavior
- language switching
- visible focus
- reduced-motion preference

### 10.5 Deployment Tests

- Vercel production build
- environment variables
- SPA route fallback
- Apps Script URL
- Firebase authorized domains
- payment merchant test flow
- monitoring and alert delivery
- backup and restore

---

## 11. Deployment Architecture

```text
User Browser
  |
  | HTTPS
  v
React + Vite Frontend
  |
  | VITE_APPS_SCRIPT_URL
  v
Google Apps Script Web App
  |                       |
  |                       +--> Grok API (server-side key)
  |
  +--> Google Sheets
  |
  +--> Google Drive
```

Authentication is verified through Firebase. Verified identity must be matched to an active administrative record before any admin role is granted.

---

## 12. Environment Configuration

Frontend environment variables:

- `VITE_APPS_SCRIPT_URL`
- `VITE_AI_PROVIDER`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

Backend Script Properties:

- `GROK_API_KEY`
- `SPREADSHEET_ID`
- `FIREBASE_WEB_API_KEY`
- initial administrator bootstrap values for one-time setup
- live payment gateway properties when activated

No API key or payment secret should be placed in `VITE_*` variables or committed to the repository.

---

## 13. Maintenance and Ownership

### 13.1 Regular Operations

| Activity | Recommended Frequency |
|---|---|
| Helpline verification | Monthly and before campaigns |
| Facility verification | Quarterly |
| Clinical content review | Every 6 months or immediately after official guidance changes |
| Dependency update review | Monthly |
| Access review | Quarterly |
| Backup and restore test | Quarterly |
| Privacy policy review | Annually |
| Crisis workflow test | Quarterly |
| Analytics and abuse review | Monthly |
| Donation reconciliation | For every settlement or monthly |

### 13.2 Incident Ownership

The operating organization must appoint:

- project owner;
- clinical and medical reviewer;
- privacy officer;
- technical lead;
- helpline verification officer;
- content editor;
- moderation lead;
- donation administrator;
- incident response owner.

No single launch contact should own both unrestricted financial access and production security configuration.

---

## 14. Immediate Future Enhancements

Recommended additions beyond the current scope:

1. Geo-location-based nearest verified facility search.
2. Secure appointment booking and referral tracking.
3. Confidential counselor-to-visitor messaging.
4. Clinical self-assessment with a clearly non-diagnostic result.
5. Risk-based referral categories.
6. Verified provider organization accounts.
7. Two-factor authentication for administrators.
8. Clinical content approval signatures.
9. Human moderation dashboard for community stories.
10. Email/SMS status updates with explicit consent.
11. Referral waiting-list and outcome tracking.
12. Multi-language voice information.
13. Offline emergency contact and overdose-response cards.
14. QR codes for schools, events, and public venues.
15. Integration with verified government and healthcare databases.
16. Public annual impact and transparency report.
17. Mobile application if a documented need and security budget exist.
18. Structured donation receipts and public audit reports.

---

## 15. Project Deliverables

- production React frontend;
- Google Apps Script backend;
- Google Sheets data schema;
- Google Drive folder structure;
- multilingual content and interface;
- AI safety engine;
- support and rehabilitation directory;
- guided support wizard;
- admin and technical operations portal;
- deployment and handover guide;
- requirements and handover document;
- production readiness audit report;
- test evidence and release checklist.

---

## 16. Acceptance Criteria

The project is ready for public release only when:

- all launch-blocking requirements are complete;
- all official helplines are verified;
- all public clinical content has a named reviewer and source;
- no critical medical or security defect remains open;
- unauthorized admin access is blocked;
- secrets are absent from client code;
- no payment is falsely represented as completed;
- emergency support remains available even if AI is unavailable;
- Sinhala and Tamil safety instructions are accurate;
- public data and donation handling follow approved privacy and legal policies;
- the project has a named maintenance owner and documented incident process.

---

## 17. Related Project Documents

- [README](../README.md)
- [Deployment and Handover Guide](DEPLOYMENT_HANDOVER_GUIDE.md)
- [Final Production Audit Report](../FINAL_PRODUCTION_AUDIT_REPORT.md)
- [QA Verification Report](../test/QA_VERIFICATION_REPORT.md)
- [Backend Sheets Documentation](../backend/sheets/README.md)
- [Google Drive Folder Structure](../backend/drive/folder_structure.md)

---

**Prepared for:** Leo Club of University of Sri Jayewardenepura  
**Project:** Beyond the Darkness – අඳුරෙන් එළියට  
**Purpose:** Requirements, implementation scope, operational handover, launch governance, and future planning
