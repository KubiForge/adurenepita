# Beyond the Darkness – Google Drive Organization Guide

To maintain institutional governance and prevent dependency on personal volunteer Google accounts, the project assets are structured under an organizational Google Drive directory.

---

### Folder Tree Layout

```
/BeyondTheDarkness/
  ├── BrandAssets/           # High-resolution official logos, campaign artwork, banners
  ├── ApprovedKnowledge/     # Peer-reviewed PDF guidelines, medical review sign-offs
  ├── CampaignMedia/         # University drive photographs, awareness video clips
  ├── DonationReceipts/      # Restricted digitized tax-exempt donation PDF receipts
  ├── OperationalExports/    # Authorized Admin financial and survey CSV exports
  └── Archive/               # Superseded drafts and historical materials
```

---

### Access Control & Privacy Permissions

| Folder | Permitted Roles | Public Link Sharing | Contents & Governance |
|---|---|---|---|
| `/BrandAssets/` | Admin, Tech Crew | View with link | Official logos, banners, social media artwork |
| `/ApprovedKnowledge/` | Admin, Tech Crew, Reviewers | Restricted (Internal) | Clinical monographs, WHO source documents |
| `/CampaignMedia/` | Admin, Tech Crew | View with link | Event photographs, press releases |
| `/DonationReceipts/` | Admin Only | STRICTLY PRIVATE | Generated receipts referenced by DonationRecords |
| `/OperationalExports/` | Admin, Tech Crew | STRICTLY PRIVATE | Reconciled financial summaries, audit backups |
| `/Archive/` | Tech Crew | STRICTLY PRIVATE | Previous revisions, deprecation records |

**Rule:** Never set `/DonationReceipts/` or `/OperationalExports/` to "Anyone with the link". Access must require authenticated Google Workspace identity.
