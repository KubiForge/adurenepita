export interface CampaignEvent {
  id: string;
  title: string;
  titleSi: string;
  titleTa: string;
  phase: string;
  phaseSi: string;
  phaseTa: string;
  date: string;
  dateSi: string;
  dateTa: string;
  location: string;
  locationSi: string;
  locationTa: string;
  status: 'upcoming' | 'active' | 'completed';
  description: string;
  descriptionSi: string;
  descriptionTa: string;
  targetAudience: string;
  expectedParticipants: number;
}

export interface VolunteerRole {
  id: string;
  title: string;
  titleSi: string;
  commitment: string;
  description: string;
  descriptionSi: string;
}

export const CAMPAIGN_EVENTS: CampaignEvent[] = [
  {
    id: 'ev-phase-1-launch',
    title: 'Beyond the Darkness: Official Campaign Inauguration & Digital Portal Launch',
    titleSi: 'අඳුරෙන් එළියට: නිල ව්‍යාපෘති සමාරම්භය සහ ඩිජිටල් වේදිකාව එළිදැක්වීම',
    titleTa: 'இருளைத் தாண்டி: திட்டத் தொடக்கமும் மின்னணுத் தள அறிமுகமும்',
    phase: 'Phase 1',
    phaseSi: 'පළමු අදියර',
    phaseTa: 'முதல் கட்டம்',
    date: 'December 2026',
    dateSi: '2026 දෙසැම්බර්',
    dateTa: 'டிசம்பர் 2026',
    location: 'Bandaranayake Hall, University of Sri Jayewardenepura',
    locationSi: 'බණ්ඩාරනායක ශාලාව, ශ්‍රී ජයවර්ධනපුර විශ්වවිද්‍යාලය',
    locationTa: 'பண்டாரநாயக்க மண்டபம், ஸ்ரீ ஜயவர்தனபுர பல்கலைக்கழகம்',
    status: 'upcoming',
    description: 'Public unveiling of the AI-powered awareness portal, guest keynote from addiction psychiatrists, and youth pledge against substance abuse.',
    descriptionSi: 'AI තාක්ෂණය මුසු ඩිජිටල් වේදිකාව එළිදැක්වීම, මනෝ වෛද්‍ය විශේෂඥ දේශන සහ තරුණ ප්‍රතිඥාව ලබාදීම.',
    descriptionTa: 'மின்னணு விழிப்புணர்வு தள அறிமுகம், மனநல மருத்துவ நிபுணர்களின் உரைகள் மற்றும் இளைஞர் உறுதிமொழி நிகழ்ச்சி.',
    targetAudience: 'University Students, Academic Staff, Youth Advocates',
    expectedParticipants: 800,
  },
  {
    id: 'ev-peer-workshop',
    title: 'Youth Peer Mentorship & Safe Intervention Training',
    titleSi: 'මිතුරු මඟපෙන්වීම සහ සුරක්ෂිත මැදිහත්වීම් වැඩමුළුව',
    titleTa: 'இளைஞர் வழிகாட்டலும் பாதுகாப்பான தலையீடும் குறித்த பயிற்சி',
    phase: 'Phase 2',
    phaseSi: 'දෙවන අදියර',
    phaseTa: 'இரண்டாம் கட்டம்',
    date: 'January 2027',
    dateSi: '2027 ජනවාරි',
    dateTa: 'ஜனவரி 2027',
    location: 'Faculty of Humanities & Social Sciences Auditorium',
    locationSi: 'මානවශාස්ත්‍ර හා සමාජීයවිද්‍යා පීඨ ශ්‍රවණාගාරය',
    locationTa: 'மனிதநேயம் மற்றும் சமூக அறிவியல் பீடக் கேட்போர் கூடம்',
    status: 'upcoming',
    description: 'Training 150 student leaders on how to recognize distress, provide non-judgmental listening, and refer peers to professional healthcare services.',
    descriptionSi: 'මිතුරන්ගේ මානසික පීඩනය සහ ඇබ්බැහිවීම් හඳුනාගෙන ඔවුන්ව වෘත්තීය ප්‍රතිකාර වෙත යොමුකිරීමට ශිෂ්‍ය නායකයින් 150ක් පුහුණු කිරීම.',
    descriptionTa: 'மனஅழுத்தம் மற்றும் போதைப்பொருள் பயன்பாட்டுச் சிக்கல்களை அடையாளம் கண்டு, தொழில்முறை உதவிக்கு வழிநடத்த 150 மாணவர் தலைவர்களுக்குப் பயிற்சி.',
    targetAudience: 'Student Representatives & Leo Club Volunteers',
    expectedParticipants: 150,
  },
  {
    id: 'ev-community-drive',
    title: 'Island-wide School & Community Awareness Caravan',
    titleSi: 'දිවයින පුරා පාසල් සහ ප්‍රජා දැනුවත් කිරීමේ ජංගම වැඩසටහන',
    titleTa: 'தீவு முழுவதும் பள்ளி மற்றும் சமூக விழிப்புணர்வு பயணம்',
    phase: 'Phase 3',
    phaseSi: 'තෙවන අදියර',
    phaseTa: 'மூன்றாம் கட்டம்',
    date: 'February – March 2027',
    dateSi: '2027 පෙබරවාරි – මාර්තු',
    dateTa: 'பிப்ரவரி – மார்ச் 2027',
    location: 'Western & Southern Province High Schools',
    locationSi: 'බස්නාහිර සහ දකුණු පළාත්වල තෝරාගත් පාසල්',
    locationTa: 'மேல் மற்றும் தென் மாகாணங்களில் தேர்ந்தெடுக்கப்பட்ட பள்ளிகள்',
    status: 'upcoming',
    description: 'Interactive drama, expert talks, and distribution of educational materials to schoolchildren and parents.',
    descriptionSi: 'පාසල් දරුවන් සහ දෙමාපියන් ඉලක්ක කරගත් නාට්‍යමය ඉදිරිපත් කිරීම් සහ උපදේශන වැඩසටහන්.',
    descriptionTa: 'பள்ளி மாணவர்களுக்கும் பெற்றோருக்கும் நாடக நிகழ்ச்சிகள், நிபுணர் உரைகள் மற்றும் விழிப்புணர்வு வளங்கள்.',
    targetAudience: 'School Students, Teachers, Parents',
    expectedParticipants: 2500,
  },
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: 'role-outreach',
    title: 'Community Outreach Ambassador',
    titleSi: 'ප්‍රජා දැනුවත් කිරීමේ තානාපති',
    commitment: '3–5 hours / week',
    description: 'Organize university faculty dialogues, distribute brochures, and facilitate awareness events on campus.',
    descriptionSi: 'විශ්වවිද්‍යාලය හා ප්‍රජාව තුළ දැනුවත් කිරීමේ වැඩසටහන් සංවිධානය කිරීම.',
  },
  {
    id: 'role-content',
    title: 'English Educational Content & Media Creator',
    titleSi: 'ත්‍රිභාෂා අන්තර්ගත නිර්මාණකරු',
    commitment: '2–4 hours / week',
    description: 'Design educational social media infographics, short video clips, and accessible English-language articles.',
    descriptionSi: 'සමාජ මාධ්‍ය සඳහා දැනුවත් කිරීමේ පෝස්ට්, වීඩියෝ සහ පරිවර්තන සකස් කිරීම.',
  },
  {
    id: 'role-tech',
    title: 'Technical Support & Platform Assistant',
    titleSi: 'තාක්ෂණික සහය සහ පද්ධති සහයක',
    commitment: '2–4 hours / week',
    description: 'Assist the Technical Crew with database synchronization, user feedback logging, and maintaining system uptime.',
    descriptionSi: 'පද්ධතියේ යාවත්කාලීන කිරීම් සහ දත්ත කළමනාකරණය සඳහා සහය වීම.',
  },
];
