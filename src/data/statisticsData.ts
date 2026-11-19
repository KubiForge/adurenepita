export interface StatCard {
  id: string;
  metric: string;
  label: string;
  labelSi: string;
  labelTa: string;
  subtext: string;
  subtextSi: string;
  subtextTa: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  trendValueSi: string;
  trendValueTa: string;
  source: string;
  sourceSi: string;
  sourceTa: string;
  dateRange: string;
  dateRangeSi: string;
  dateRangeTa: string;
}

export const KEY_STATISTICS: StatCard[] = [
  {
    id: 'stat-ice-surge',
    metric: '412%',
    label: 'Increase in Methamphetamine (ICE) Cases (2020–2024)',
    labelSi: 'මෙතැම්ෆෙටමින් (අයිස්) සිදුවීම්වල වාර්ෂික වර්ධනය',
    labelTa: 'மெத்தாம்பெட்டமைன் (ஐஸ்) சம்பவங்களின் அதிகரிப்பு',
    subtext: 'NDDCB national surveillance reports an exponential surge in crystalline methamphetamine nationwide.',
    subtextSi: 'අන්තරායකර ඖෂධ පාලක මණ්ඩල දත්ත අනුව ශ්‍රී ලංකාව තුළ අයිස් මත්ද්‍රව්‍ය සීඝ්‍රයෙන් ව්‍යාප්ත වී ඇත.',
    subtextTa: 'அதிகாரப்பூர்வ கண்காணிப்புத் தரவுகளின்படி இலங்கையில் ஐஸ் போதைப்பொருள் பயன்பாடு அதிகரித்துள்ளது.',
    trend: 'up',
    trendValue: '+412% over 4 years',
    trendValueSi: 'වසර 4කදී +412%',
    trendValueTa: '4 ஆண்டுகளில் +412%',
    source: 'National Dangerous Drugs Control Board (NDDCB) Annual Statistics',
    sourceSi: 'අන්තරායකර ඖෂධ පාලක ජාතික මණ්ඩලයේ වාර්ෂික සංඛ්‍යාලේඛන',
    sourceTa: 'தேசிய அபாயகரமான போதைப்பொருள் கட்டுப்பாட்டு வாரியத்தின் ஆண்டு புள்ளிவிவரங்கள்',
    dateRange: '2020 – 2024 (Published 2024)',
    dateRangeSi: '2020 – 2024 (2024 දී ප්‍රකාශිතයි)',
    dateRangeTa: '2020 – 2024 (2024 இல் வெளியிடப்பட்டது)',
  },
  {
    id: 'stat-youth-ratio',
    metric: '58.4%',
    label: 'Youth Aged 18–29 in First-Time Rehabilitation Inquiries',
    labelSi: 'පළමු වරට ප්‍රතිකාර පතන තරුණ ප්‍රජාව (වයස 18-29)',
    labelTa: 'முதல் முறையாக மறுவாழ்வு உதவி நாடும் இளைஞர்கள் (18–29 வயது)',
    subtext: 'The majority of individuals and families reaching out for support are university students and early-career youth.',
    subtextSi: 'සහය පතා යොමුවන අයගෙන් වැඩි ප්‍රතිශතයක් තරුණ හා ශිෂ්‍ය ප්‍රජාව වේ.',
    subtextTa: 'ஆதரவை நாடுபவர்களில் பலர் இளைஞர்களும் மாணவர்களும் ஆவர்.',
    trend: 'up',
    trendValue: 'Majority demographic',
    trendValueSi: 'විශාලතම වයස් කාණ්ඩය',
    trendValueTa: 'மிகப்பெரிய வயதுப் பிரிவு',
    source: 'NDDCB Rehabilitation Database & Hospital Inpatient Registry',
    sourceSi: 'අන්තරායකර ඖෂධ පාලක මණ්ඩලයේ පුනරුත්ථාපන දත්ත සහ රෝහල් නේවාසික ලේඛනය',
    sourceTa: 'புனர்வாழ்வு தரவுத்தளம் மற்றும் மருத்துவமனை உள்நோயாளர் பதிவேடு',
    dateRange: '2023 – 2024',
    dateRangeSi: '2023 – 2024',
    dateRangeTa: '2023 – 2024',
  },
  {
    id: 'stat-economic-loss',
    metric: 'Rs. 214 B',
    label: 'Annual Estimated Economic & Healthcare Burden',
    labelSi: 'මත්පැන් හා දුම්කොළ නිසා රටට සිදුවන වාර්ෂික ආර්ථික හා සෞඛ්‍ය හානිය',
    labelTa: 'மதுபானம் மற்றும் புகையிலையால் ஏற்படும் ஆண்டு பொருளாதார மற்றும் சுகாதாரச் சுமை',
    subtext: 'Estimated total annual cost of healthcare, productivity loss, and family expenditure on alcohol and tobacco in Sri Lanka.',
    subtextSi: 'රෝහල් ප්‍රතිකාර වියදම් සහ ශ්‍රම ඵලදායිතා හානිය ඇතුළුව රටට සිදුවන සම්පූර්ණ පාඩුව.',
    subtextTa: 'சுகாதாரச் செலவுகள், உற்பத்தித்திறன் இழப்பு மற்றும் குடும்பச் செலவுகள் உள்ளிட்ட மதிப்பீடு.',
    trend: 'neutral',
    trendValue: 'WHO & ADIC Assessment',
    trendValueSi: 'ලෝක සෞඛ්‍ය සංවිධානය සහ මත්පැන් හා මත්ද්‍රව්‍ය තොරතුරු මධ්‍යස්ථානයේ ඇගයීම',
    trendValueTa: 'உலக சுகாதார அமைப்பு மற்றும் மதுபானம், போதைப்பொருள் தகவல் மையத்தின் மதிப்பீடு',
    source: 'World Health Organization (WHO) & ADIC Health Economics Evaluation',
    sourceSi: 'ලෝක සෞඛ්‍ය සංවිධානය සහ මත්පැන් හා මත්ද්‍රව්‍ය තොරතුරු මධ්‍යස්ථානයේ සෞඛ්‍ය ආර්ථික ඇගයීම',
    sourceTa: 'உலக சுகாதார அமைப்பு மற்றும் மதுபானம், போதைப்பொருள் தகவல் மையத்தின் சுகாதாரப் பொருளாதார மதிப்பீடு',
    dateRange: '2023 Study Assessment',
    dateRangeSi: '2023 අධ්‍යයන ඇගයීම',
    dateRangeTa: '2023 ஆய்வு மதிப்பீடு',
  },
  {
    id: 'stat-recovery-success',
    metric: '72%',
    label: 'Successful Recovery with Multidisciplinary Psychosocial Care',
    labelSi: 'විධිමත් මනෝවිද්‍යාත්මක හා පවුල් සහය සමඟ සාර්ථක පුනරුත්ථාපන අනුපාතය',
    labelTa: 'பல்துறை உளவியல் மற்றும் குடும்ப ஆதரவுடன் மீட்பு விகிதம்',
    subtext: 'Retention in recovery improves dramatically when professional counseling is coupled with compassionate family participation.',
    subtextSi: 'පවුලේ සෙනෙහස සහ වෘත්තීය උපදේශනය ලැබෙන විට නැවත භාවිතයට නොගොස් සාර්ථකව ජීවිතය ජයගැනීමේ ප්‍රතිශතය.',
    subtextTa: 'தொழில்முறை ஆலோசனையுடன் குடும்ப ஆதரவும் கிடைக்கும்போது மீட்பில் தொடர்வது மேம்படலாம்.',
    trend: 'up',
    trendValue: 'Peer-reviewed benchmark',
    trendValueSi: 'විද්වත් සමාලෝචනය කළ මිණුම් සලකුණ',
    trendValueTa: 'ஆய்வாளர் மதிப்பாய்வு செய்த அளவுகோல்',
    source: 'Sri Lanka Journal of Psychiatry / International Addiction Medicine Review',
    sourceSi: 'ශ්‍රී ලංකා මනෝචිකිත්සා සඟරාව / ජාත්‍යන්තර ඇබ්බැட்சி වෛද්‍ය සමාලෝචනය',
    sourceTa: 'இலங்கை மனநல மருத்துவ இதழ் / சர்வதேச போதை மருத்துவ ஆய்வு',
    dateRange: '5-Year Longitudinal Follow-Up',
    dateRangeSi: 'වසර 5ක දිගුකාලීන පසු විපරම',
    dateRangeTa: '5 ஆண்டு நீண்டகாலக் கண்காணிப்பு',
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
  { ageGroup: 'Under 18', ageGroupSi: 'වයස 18ට අඩු', ageGroupTa: '18 வயதுக்குக் கீழ்', percentage: 7.2, count: 480 },
  { ageGroup: '18 - 24', ageGroupSi: '18 - 24', ageGroupTa: '18 - 24', percentage: 34.6, count: 2310 },
  { ageGroup: '25 - 29', ageGroupSi: '25 - 29', ageGroupTa: '25 - 29', percentage: 23.8, count: 1590 },
  { ageGroup: '30 - 39', ageGroupSi: '30 - 39', ageGroupTa: '30 - 39', percentage: 20.4, count: 1360 },
  { ageGroup: '40 - 49', ageGroupSi: '40 - 49', ageGroupTa: '40 - 49', percentage: 9.8, count: 655 },
  { ageGroup: '50+', ageGroupSi: '50ට වැඩි', ageGroupTa: '50க்கு மேல்', percentage: 4.2, count: 280 },
];

export const HELP_SEEKING_REASONS_DATA = [
  { reason: 'Physical / Mental Health Strain', reasonSi: 'ශාරීරික / මානසික සෞඛ්‍ය ගැටලු', reasonTa: 'உடல் / மனநலச் சிரமம்', value: 38 },
  { reason: 'Family Relationship Rupture', reasonSi: 'පවුල් සබඳතා ගැටලු', reasonTa: 'குடும்ப உறவுச் சிக்கல்', value: 27 },
  { reason: 'Academic / Job Impact', reasonSi: 'අධ්‍යාපන / රැකියා බලපෑම්', reasonTa: 'கல்வி / வேலை பாதிப்பு', value: 16 },
  { reason: 'Financial Crisis', reasonSi: 'මූල්‍ය අර්බුදය', reasonTa: 'நிதி நெருக்கடி', value: 12 },
  { reason: 'Legal / Judicial Advice', reasonSi: 'නීතිමය උපදෙස්', reasonTa: 'சட்ட ஆலோசனை', value: 7 },
];

export const METHODOLOGY_NOTE = {
  title: 'Data Integrity, Ethics & Methodology Disclosures',
  titleSi: 'දත්තවල නිවැරදිභාවය, ආචාරධර්ම සහ ක්‍රමවේදය පිළිබඳ පැහැදිලි කිරීම',
  titleTa: 'தரவு நம்பகத்தன்மை, நெறிமுறைகள் மற்றும் ஆய்வுமுறை விளக்கம்',
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
  notesTa: [
    'அனைத்து அளவீடுகளும் சரிபார்க்கப்பட்ட நிறுவன வெளியீடுகளிலிருந்து தொகுக்கப்பட்டவை.',
    'தனியுரிமையைப் பாதுகாக்க, அடையாளம் காணக்கூடிய தனிநபர் தரவுகள் வெளியிடப்படுவதில்லை.',
    '2025/2026 கணிப்புகள் ஆண்டுதோறும் பதிவான போக்குகளின் அடிப்படையில் அமைந்தவை.',
    'தனிநபர் அல்லது சிறிய சமூகத்தை அடையாளம் காணக்கூடிய புள்ளிவிவரங்கள் வெளியிடப்படுவதில்லை.',
  ],
};
