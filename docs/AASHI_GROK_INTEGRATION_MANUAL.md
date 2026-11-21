# AASHI AI Recovery Assistant — xAI Grok Production Integration Manual
**Project:** Beyond the Darkness (අදුරෙන් එපිට)  
**Organization:** Leo Club of University of Sri Jayewardenepura  
**Platform Identity:** AASHI – Your Recovery Companion  
**Core Principle:** *Human safety first. Compassion always. Recovery is possible.*

---

## 1. Architectural Architecture & Cost Efficiency

Beyond the Darkness runs on a **zero-cost separate backend architecture**:
- **Frontend:** Existing React + TypeScript (Vite + Tailwind CSS).
- **Hosting:** Vercel (Production SPA deployment).
- **Serverless API:** Vercel Serverless Functions (`/api/chat`).
- **AI Engine:** Official xAI Grok API (`https://api.x.ai/v1/chat/completions`).
- **Data Grounding (RAG):** Verified Sri Lankan substance database (`DRUGS_DATA`) and official treatment directory (`SUPPORT_CENTERS_DATA`).
- **Geolocation:** Proximity calculation with Haversine formula based on explicit user consent (browser Geolocation API or manual district selection).
- **Cost Impact:** $0 for backend server hosting. Serverless execution runs within Vercel's generous free tier.

---

## 2. Security & Zero-Secret Leakage Guarantee

1. **Client Isolation:**
   - The Grok API key (`XAI_API_KEY`) is **NEVER** exposed to Vite, client bundles, browser JavaScript, React components, or HTTP responses.
   - It is accessed exclusively on the server in `api/_lib/grokClient.ts` through `process.env.XAI_API_KEY`.
2. **Git Protection:**
   - `.gitignore` strictly excludes `.env`, `.env.local`, `.env.*.local`, `*.env`.
   - `.env.example` contains placeholders only.
3. **Prompt Injection & Topic Safeguards:**
   - Server-side system prompt strictly constrains AASHI to substance awareness, addiction recovery, family guidance, and medical emergency navigation.
   - Out-of-topic queries (coding, math, entertainment, etc.) are politely refused.
   - System prompts are constructed server-side; client role definitions are never trusted.

---

## 3. Environment Variables Configuration

### Local Development (`.env` or `.env.local`)
Create a `.env` file in the project root (ignored by git):

```env
# Server-side xAI Grok API Key
XAI_API_KEY=xai-your-actual-api-key-here

# Grok Model identifier
XAI_MODEL=grok-2-latest
```

### Production Deployment (Vercel Console)
1. Go to your project on the [Vercel Dashboard](https://vercel.com).
2. Navigate to **Settings > Environment Variables**.
3. Add the following variables:
   - **Key:** `XAI_API_KEY`
     - **Value:** `xai-...`
     - **Environments:** Production, Preview, Development
   - **Key:** `XAI_MODEL`
     - **Value:** `grok-2-latest`
     - **Environments:** Production, Preview, Development
4. Trigger a new deployment or push to `main`.

---

## 4. Emergency Detection & Life-Saving Protocol

AASHI includes deterministic, multi-lingual server-side emergency detection covering Sinhala, Tamil, English, and Singlish:

| Emergency Category | Trigger Examples | Immediate Action |
| :--- | :--- | :--- |
| **Acute Medical / Overdose** (Level 3) | "unconscious", "සිහිය නෑ", "සිහිය නැතුව", "හුස්ම ගන්න බෑ", "can't breathe", "seizure", "வலிக்கிறது" | • Triggers **EmergencyResponseCard**<br>• Priority 1990 Suwaseriya Ambulance call button<br>• Recovery position guidance<br>• Explicit instruction: **DO NOT induce vomiting**, **DO NOT give water/food** |
| **Crisis / Suicidal Thoughts** (Level 4) | "kill myself", "මැරෙන්න හිතෙනවා", "දිවි නසා", "தற்கொலை" | • Directs to CCC Crisis Support **1333** (24/7, Toll-free)<br>• NIMH Mental Health Helpline **1926**<br>• Compassionate human-first reassurance |

---

## 5. Verified Support Finder & Location Flow

- **Consent First:** AASHI never tracks or probes location silently.
- Users can click **Find Near Me** or ask for nearby centres, opening the `LocationConsentModal`.
- **Options:**
  1. GPS Location (via browser Geolocation API with user permission).
  2. Manual district selector (covering all 25 districts of Sri Lanka).
- Results calculate Haversine distance from coordinates and display **NearbyCentersCard** with clickable telephone numbers, verified source tags, and Google Maps directions.

---

## 6. Progressive Voice Support

- **Speech-to-Text (STT):** Implemented via Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`) with language awareness (`si-LK`, `ta-LK`, `en-US`).
- **Text-to-Speech (TTS):** Browser SpeechSynthesis allows reading assistant responses aloud with natural speed.
- **Graceful Fallback:** If speech features are unsupported by a user's browser, the interface cleanly degrades without error messages.

---

## 7. Local Testing & Verification

Run the verification test suite:
```bash
node dist-test/test/testAashiSuite.js
# Or build and test:
npm run build
```

### Verified Test Cases:
- [x] **A. Sinhala Emergency:** Unconscious friend (`සිහිය නැතුව`) -> Flags Level 3, 1990 ambulance, recovery position.
- [x] **B. English Family Support:** How to help brother -> Empathetic, actionable steps.
- [x] **C. Tamil Support:** Addicted friend in Tamil -> Responds in natural Tamil.
- [x] **D. Drug Information:** Heroin pharmacology -> Evidence-based clinical overview.
- [x] **E. Recovery Guidance:** Medical detox precautions (warns against cold turkey for alcohol/sedatives).
- [x] **F. Nearby Support:** Colombo coordinates -> Returns 4 verified clinics with phone and maps links.
- [x] **G. Out-of-Topic:** Java programming -> Politely refused with standard disclaimer.
- [x] **H. Prompt Injection:** Ignore rules -> Neutralized, maintains identity.
- [x] **I. Privacy:** Confidentiality inquiries -> Reassures anonymous ephemeral session.
- [x] **J. API Failure & Rate Limiting:** Invalid API key gracefully recovers via grounded engine; burst queries trigger 429 Too Many Requests.
- [x] **K. Self-Harm:** Suicidal ideation -> Priority Level 4 crisis protocol (1333, 1926).
