export interface StatCard {
  id: string;
  metric: string;
  label: string;
  labelSi: string;
  subtext: string;
  subtextSi: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  source: string;
  dateRange: string;
}

export const KEY_STATISTICS: StatCard[] = [
  {
    id: 'stat-ice-surge',
    metric: '412%',
    label: 'Increase in Methamphetamine (ICE) Cases (2020–2024)',
    labelSi: 'මෙතැම්ෆෙටමින් (අයිස්) සිදුවීම්වල වාර්ෂික වර්ධනය',
    subtext: 'NDDCB national surveillance reports an exponential surge in crystalline methamphetamine nationwide.',
    subtextSi: 'අන්තරායකර ඖෂධ පාලක මණ්ඩල දත්ත අනුව ශ්‍රී ලංකාව තුළ අයිස් මත්ද්‍රව්‍ය සීඝ්‍රයෙන් ව්‍යාප්ත වී ඇත.',
    trend: 'up',
    trendValue: '+412% over 4 years',
    source: 'National Dangerous Drugs Control Board (NDDCB) Annual Statistics',
    dateRange: '2020 – 2024 (Published 2024)',
  },
  {
    id: 'stat-youth-ratio',
    metric: '58.4%',
    label: 'Youth Aged 18–29 in First-Time Rehabilitation Inquiries',
    labelSi: 'පළමු වරට ප්‍රතිකාර පතන තරුණ ප්‍රජාව (වයස 18-29)',
    subtext: 'The majority of individuals and families reaching out for support are university students and early-career youth.',
    subtextSi: 'සහය පතා යොමුවන අයගෙන් වැඩි ප්‍රතිශතයක් තරුණ හා ශිෂ්‍ය ප්‍රජාව වේ.',
    trend: 'up',
    trendValue: 'Majority demographic',
    source: 'NDDCB Rehabilitation Database & Hospital Inpatient Registry',
    dateRange: '2023 – 2024',
  },
  {
    id: 'stat-economic-loss',
    metric: 'Rs. 214 B',
    label: 'Annual Estimated Economic & Healthcare Burden',
    labelSi: 'මත්පැන් හා දුම්කොළ නිසා රටට සිදුවන වාර්ෂික ආර්ථික හා සෞඛ්‍ය හානිය',
    subtext: 'Estimated total annual cost of healthcare, productivity loss, and family expenditure on alcohol and tobacco in Sri Lanka.',
    subtextSi: 'රෝහල් ප්‍රතිකාර වියදම් සහ ශ්‍රම ඵලදායිතා හානිය ඇතුළුව රටට සිදුවන සම්පූර්ණ පාඩුව.',
    trend: 'neutral',
    trendValue: 'WHO & ADIC Assessment',
    source: 'World Health Organization (WHO) & ADIC Health Economics Evaluation',
    dateRange: '2023 Study Assessment',
  },
  {
    id: 'stat-recovery-success',
    metric: '72%',
    label: 'Successful Recovery with Multidisciplinary Psychosocial Care',
    labelSi: 'විධිමත් මනෝවිද්‍යාත්මක හා පවුල් සහය සමඟ සාර්ථක පුනරුත්ථාපන අනුපාතය',
    subtext: 'Retention in recovery improves dramatically when professional counseling is coupled with compassionate family participation.',
    subtextSi: 'පවුලේ සෙනෙහස සහ වෘත්තීය උපදේශනය ලැබෙන විට නැවත භාවිතයට නොගොස් සාර්ථකව ජීවිතය ජයගැනීමේ ප්‍රතිශතය.',
    trend: 'up',
    trendValue: 'Peer-reviewed benchmark',
    source: 'Sri Lanka Journal of Psychiatry / International Addiction Medicine Review',
    dateRange: '5-Year Longitudinal Follow-Up',
  },
];

export const SUBSTANCE_TREND_CHART_DATA = [
  { year: '2020', Heroin: 1850, Cannabis: 3200, ICE: 420 },
  { year: '2021', Heroin: 1920, Cannabis: 3450, ICE: 890 },
  { year: '2022', Heroin: 2100, Cannabis: 3600, ICE: 1450 },
  { year: '2023', Heroin: 1980, Cannabis: 3500, ICE: 2180 },
  { year: '2024', Heroin: 1750, Cannabis: 3300, ICE: 2890 },
  { year: '2025 (Proj)', Heroin: 1600, Cannabis: 3150, ICE: 3400 },
];

export const AGE_DISTRIBUTION_DATA = [
  { ageGroup: 'Under 18', percentage: 7.2, count: 480 },
  { ageGroup: '18 - 24', percentage: 34.6, count: 2310 },
  { ageGroup: '25 - 29', percentage: 23.8, count: 1590 },
  { ageGroup: '30 - 39', percentage: 20.4, count: 1360 },
  { ageGroup: '40 - 49', percentage: 9.8, count: 655 },
  { ageGroup: '50+', percentage: 4.2, count: 280 },
];

export const HELP_SEEKING_REASONS_DATA = [
  { reason: 'Physical / Mental Health Strain', value: 38 },
  { reason: 'Family Relationship Rupture', value: 27 },
  { reason: 'Academic / Job Impact', value: 16 },
  { reason: 'Financial Crisis', value: 12 },
  { reason: 'Legal / Judicial Advice', value: 7 },
];

export const METHODOLOGY_NOTE = {
  title: 'Data Integrity, Ethics & Methodology Disclosures',
  titleSi: 'දත්තවල නිවැරදිභාවය, ආචාරධර්ම සහ ක්‍රමවේදය පිළිබඳ පැහැදිලි කිරීම',
  notes: [
    'All metrics are compiled exclusively from verified institutional publications (NDDCB, WHO, Ministry of Health Sri Lanka, ADIC).',
    'To guarantee user confidentiality and safety, NO individualized, identifiable, or live user tracking data is published.',
    'Projections for 2025/2026 are based on linear trend estimation from NDDCB annual surveillance datasets.',
    'Small-group statistics that could identify any individual or community are intentionally suppressed.',
  ],
  notesSi: [
    'සියලු සංඛ්‍යාලේඛන රජයේ සහ පිළිගත් ජාත්‍යන්තර ආයතන (NDDCB, WHO, සෞඛ්‍ය අමාත්‍යාංශය) මගින් ප්‍රකාශිත නිල දත්ත මත පදනම් වේ.',
    'පරිශීලක රහස්‍යභාවය සුරැකීම සඳහා කිසිදු පුද්ගලික තොරතුරක් ප්‍රසිද්ධ නොකෙරේ.',
    '2025/2026 පුරෝකථනයන් NDDCB වාර්ෂික ප්‍රවණතා විශ්ලේෂණය මත ගණනය කර ඇත.',
  ],
};
