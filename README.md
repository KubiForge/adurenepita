# BEYOND THE DARKNESS – අඳුරෙන් එළියට
## AI-Powered Drug Prevention, Awareness & Recovery Support Platform

**Organization**: Leo Club of University of Sri Jayewardenepura  
**Lions Affiliation**: Lions International • Leo District 306 D2  
**Campaign Slogan**: PREVENT • SUPPORT • CONNECT  
**Secondary Message**: PREVENTION THROUGH KNOWLEDGE. SUPPORT THROUGH TECHNOLOGY. HOPE THROUGH HUMAN CONNECTION.  
**Core Promise**: A safe place to ask. A trusted path to information, professional support and hope.

---

## 🌟 Executive Summary

**Beyond the Darkness – අඳුරෙන් එළියට** is a production-grade, multilingual digital platform engineered to provide evidence-based substance abuse education, confidential AI-guided recovery support, and verified connections to accredited Sri Lankan healthcare institutions. 

Built with modern web technologies, the platform strictly aligns with the official campaign identity, incorporating a cinematic aesthetic (Midnight Charcoal, Smoky Charcoal, Antique Gold, Soft Champagne, Warm Ivory, and Muted Bronze) and clinical governance safeguards.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js (v18) + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Visualizations**: Recharts (inspired by Public Finance Sri Lanka)
- **Geographic Locator**: Leaflet + OpenStreetMap
- **State & Localization**: Custom React Contexts for Sinhala, English, and Tamil

### Backend & Integrations
- **Integration Layer**: Google Apps Script Web App
- **Database**: Google Sheets (10 Structured Workbook Tabs)
- **File Storage**: Google Drive (Restricted Folder Architecture)
- **AI Engine**: Grok API (xAI) via server-side Apps Script provider
- **Hosting**: Vercel

---

## 🚀 Key Features

### 1. Creative AI Guided Wizard (10 Steps)
An accessible, conversational intake pathway for first-time visitors:
- **Step 1: Purpose** – Identifies primary user goals.
- **Step 2: Situation** – Assesses current usage status.
- **Step 3: Substance Selection** – Searchable multi-select for common substances and street names.
- **Step 4: Duration** – Timeline context.
- **Step 5: Current State** – Screens for acute symptoms and triggers emergency escalation if severe withdrawal is disclosed.
- **Step 6: Main Concerns** – Explores health, family, employment, and academic strains.
- **Step 7: Preferred Support** – Educational info, AI chat, counseling, or inpatient facilities.
- **Step 8: Location** – Province selection dynamically filters Sri Lanka's 25 districts.
- **Step 9: Additional Context** – Optional free-text with explicit privacy protection.
- **Step 10: Review & Consent** – Summary with edit links and explicit consent before generating a personalized pathway.
- **Completion Dashboard** – Tailored care centers, substance monographs, and seamless AI handover.

### 2. Beyond the Darkness AI Assistant
- **Multilingual**: Sinhala, English, and Tamil conversations.
- **4-Level Clinical Safety Engine**:
  - *Level 1*: General Information & definitions.
  - *Level 2*: Recovery Support & withdrawal precautions.
  - *Level 3*: Urgent Medical Attention (Overdose / Seizures / Toxicity).
  - *Level 4*: Immediate Crisis / Self-Harm (CCC 1333, Sumithrayo, 1990).
- **RAG Grounding**: Responses are grounded in approved clinical records.
- **Safety Safeguards**: No clinical diagnosis, no prescribing, no unmonitored cold-turkey advice for alcohol/benzodiazepines, zero assistance with substance acquisition.

### 3. Sri Lankan Support Directory & Locator
- Interactive Leaflet map mapped with verified state rehabilitation centers (NDDCB Thalangama, Nittambuwa, Mel Medura Colombo 7, NIMH Angoda, and Teaching Hospital psychiatric units in Kandy, Galle, Jaffna, Batticaloa, Kurunegala, Anuradhapura).
- Filter by province, district, and care type.
- Confidential referral requests with explicit user consent.

### 3.1 Public Awareness & Prevention
- Substance-specific evidence-based monographs with short-term and long-term effects, emergency signs, withdrawal risks, myths versus facts, and institutional sources.
- Audience-specific guidance for children, university and school students, families, friends, employers, and workplace leaders.
- Overdose recognition and emergency-response guidance.
- Plain-language rehabilitation and supervised withdrawal explanations.
- Downloadable family, overdose, and youth-prevention guides.
- Evidence literacy quiz with source citations.
- Statistics pages with publication dates, methodology disclosures, and links to NDDCB, WHO, Ministry of Health, and NIMH Sri Lanka.

### 4. Admin & Technical Crew Portals (STRICTLY TWO ROLES)
- **Admin**: Content management, drug monograph review, support directory verification, and donation reconciliation with CSV export.
- **Technical Crew**: Frontend deployment health, Apps Script latency, Google Sheets connection status, Grok token/cost monitoring, and system diagnostics.

### 5. Donation Management System
- One-time and recurring options in LKR, USD, EUR, and GBP.
- Transparent campaign allocations.
- Payment provider adapter (PayHere, WebXPay, Stripe).
- Automated receipt recording in Google Drive. Zero card data stored on platform.

### 6. Legal, Rights & Policy Centre
- Sri Lankan drug-law, rehabilitation, privacy, consent, safeguarding, insurance, employment, and legal-aid guidance.
- Links to verified government, statutory, and human-rights organizations.
- Medical disclaimer and terms of use with clear notices that general information is not legal or clinical advice.
- Emergency assistance and project contact routes are available from the policy page.

### 7. Confidential Support & Assessment
- Anonymous substance-use self-assessment without required identity details.
- Mild, moderate, severe, and immediate-support risk states.
- Overdose, dangerous withdrawal, and self-harm emergency escalation.
- Clear notice that assessment is not a diagnosis.
- Direct paths to confidential AI chat and verified professional support.

---

## 📁 Repository Structure

```
beyond-the-darkness/
├── backend/
│   ├── google-apps-script/     # Full Google Apps Script Web App source code
│   │   ├── Code.gs             # API Router & JSON responses
│   │   ├── ChatbotService.gs   # AI Chat & Wizard handlers
│   │   ├── SafetyEngine.gs     # 4-Level Safety Classifier
│   │   ├── GrokProvider.gs     # Server-side Grok API client
│   │   ├── RAGService.gs       # Retrieval from DrugKnowledge tab
│   │   ├── DirectoryService.gs # Support directory queries
│   │   ├── DonationService.gs  # Payment verification & ledger
│   │   ├── AdminService.gs     # Two-role allowlist authentication
│   │   ├── Database.gs         # Sheets connector
│   │   └── Setup.gs            # Automated Sheets & Drive initializer
│   ├── sheets/
│   │   └── README.md           # Schema for all 10 Google Sheets tabs
│   └── drive/
│       └── folder_structure.md # Google Drive folder permissions
├── src/
│   ├── config/                 # Brand tokens, assets, API config
│   ├── context/                # Language (si/en/ta), Auth, Safety
│   ├── data/                   # Verified substances, centers, stats
│   ├── services/               # API, Grok, and Payment services
│   ├── components/             # Reusable UI, layout, wizard, chat
│   └── pages/                  # All 10 public & admin pages
├── public/
│   ├── assets/                 # Campaign poster extracted from proposal
│   └── logo-icon.svg           # Brand emblem
├── docs/
│   └── DEPLOYMENT_HANDOVER_GUIDE.md
├── test/
│   └── QA_VERIFICATION_REPORT.md
└── vercel.json                 # Vercel deployment configuration
```

---

## 🏃 Getting Started

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🔒 Security & Privacy Notice

1. **Grok API Key Protection**: The `GROK_API_KEY` is stored **strictly** in Google Apps Script Script Properties. It is never placed in the React client, environment variables, or GitHub.
2. **Anonymous Browsing**: Users are never required to provide identifying personal data for general education or AI guidance.
3. **Clinical Boundaries**: The platform explicitly disclaims emergency dispatch capabilities and instructs immediate contact with **1990 (Suwaseriya)** or **1927 (NDDCB)** in life-threatening scenarios.

---

## 📚 Project Requirements and Handover

The complete feature scope, launch requirements, role model, safety requirements, test plan, maintenance plan, and future roadmap are documented in [docs/PROJECT_REQUIREMENTS_AND_HANDOVER_DOCUMENT.md](docs/PROJECT_REQUIREMENTS_AND_HANDOVER_DOCUMENT.md).

---

© 2026 Beyond the Darkness. Organized by Leo Club of University of Sri Jayewardenepura (Leo District 306 D2, Lions International).
