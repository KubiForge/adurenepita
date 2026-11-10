# Beyond the Darkness – Deployment & Handover Guide
## BEYOND THE DARKNESS – අඳුරෙන් එළියට
### Leo Club of University of Sri Jayewardenepura

This operational manual guides the deployment, configuration, and handover of the **Beyond the Darkness – අඳුරෙන් එළියට** platform.

---

### 1. Technology Architecture Overview

```
[ User Browser (Mobile / Desktop) ]
                │
                ▼
  [ React + Vite Frontend (Vercel) ]
                │  HTTPS POST
                ▼
  [ Google Apps Script Web App ]  <───> [ Grok API (xAI) ]
        │                  │            (GROK_API_KEY in Script Properties)
        ▼                  ▼
  [ Google Sheets ]  [ Google Drive ]
  (10 Workbook Tabs) (/BeyondTheDarkness/ Folders)
```

---

### 2. Google Apps Script & Google Sheets Setup

1. **Create the Google Spreadsheet:**
   - Create a new Google Spreadsheet in the organizational Google Drive account.
   - Name it: `BeyondTheDarkness_Database_USJ`.
   - Copy the Spreadsheet ID from the URL (`https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit`).

2. **Open Google Apps Script Editor:**
   - From the spreadsheet, click **Extensions > Apps Script**.
   - Create the script files and paste the source code from `backend/google-apps-script/`:
     - `Code.gs`
     - `ChatbotService.gs`
     - `SafetyEngine.gs`
     - `GrokProvider.gs`
     - `RAGService.gs`
     - `DirectoryService.gs`
     - `DonationService.gs`
     - `AdminService.gs`
     - `Database.gs`
     - `Setup.gs`

3. **Configure Script Properties (Secret Management):**
   - Click **Project Settings (Gear Icon) > Script Properties**.
   - Add property: `GROK_API_KEY` = `your_actual_xai_grok_api_key`
   - Add property: `SPREADSHEET_ID` = `<SPREADSHEET_ID>`
   - *(Note: Never commit these keys to GitHub or expose them in the React client).*

4. **Run One-Click Environment Initialization:**
   - In the Apps Script editor, select the function `setupBeyondTheDarknessEnvironment` from the dropdown and click **Run**.
   - Grant the requested Google Workspace permissions.
   - This automatically creates all 10 required sheets tabs and the `/BeyondTheDarkness/` Google Drive folder hierarchy.

5. **Deploy Apps Script as Web App:**
   - Click **Deploy > New deployment**.
   - Select type: **Web app**.
   - Description: `Beyond the Darkness Production v1.0`
   - **Execute as:** `Me (your organizational email)`
   - **Who has access:** `Anyone` (required so the React frontend can reach the endpoint).
   - Click **Deploy** and copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).

---

### 3. React Frontend Deployment to Vercel

1. **Clone or Connect Repository to Vercel:**
   - Import this repository into the Vercel Dashboard.
   - Framework Preset: **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`

2. **Configure Frontend Environment Variable:**
   - Under **Project Settings > Environment Variables**, add:
     - `VITE_APPS_SCRIPT_URL` = `https://script.google.com/macros/s/.../exec`
     - `VITE_AI_PROVIDER` = `grok`

3. **Deploy:**
   - Trigger deployment. The single-page routes (`/learn`, `/get-help`, `/support-directory`, `/admin`, etc.) will route through `vercel.json`.

---

### 4. Admin & Technical Operations

- **Admin Portal Access (`/admin`):**
  - There are strictly two internal system roles: **ADMIN** and **TECHNICAL CREW**.
  - Authorized email addresses are maintained in the `AdminUsers` sheet tab.
  - The Admin oversees content updates, donation reconciliation, and support center directories.
  - The Technical Crew monitors API costs, error rates, and system diagnostics.
  - Private user chat histories are restricted and not exposed to administrators by default to preserve strict user confidentiality.

---

### 5. Emergency Helpline Reverification Checklist

Before public launch, the Technical Crew must verify the following contacts:
- [x] **NDDCB Drug Abuse Hotline:** 1927 (Confirm current operating hours and scope).
- [x] **Suwaseriya Ambulance Service:** 1990 (National emergency medical response).
- [x] **CCCline Crisis Helpline:** 1333 (Free mental health and crisis support).
- [x] **National Institute of Mental Health (NIMH):** 1926.
- [x] **Sumithrayo Mental Health Support:** 011 269 2909.
