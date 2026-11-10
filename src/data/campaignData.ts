export interface CampaignEvent {
  id: string;
  title: string;
  titleSi: string;
  phase: string;
  phaseSi: string;
  date: string;
  location: string;
  locationSi: string;
  status: 'upcoming' | 'active' | 'completed';
  description: string;
  descriptionSi: string;
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
    phase: 'පළමු අදියර (Phase 1)',
    phaseSi: 'පළමු අදියර',
    date: 'December 2026',
    location: 'Bandaranayake Hall, University of Sri Jayewardenepura',
    locationSi: 'බණ්ඩාරනායක ශාලාව, ශ්‍රී ජයවර්ධනපුර විශ්වවිද්‍යාලය',
    status: 'upcoming',
    description: 'Public unveiling of the AI-powered awareness portal, guest keynote from addiction psychiatrists, and youth pledge against substance abuse.',
    descriptionSi: 'AI තාක්ෂණය මුසු ඩිජිටල් වේදිකාව එළිදැක්වීම, මනෝ වෛද්‍ය විශේෂඥ දේශන සහ තරුණ ප්‍රතිඥාව ලබාදීම.',
    targetAudience: 'University Students, Academic Staff, Youth Advocates',
    expectedParticipants: 800,
  },
  {
    id: 'ev-peer-workshop',
    title: 'Youth Peer Mentorship & Safe Intervention Training',
    titleSi: 'මිතුරු මඟපෙන්වීම සහ සුරක්ෂිත මැදිහත්වීම් වැඩමුළුව',
    phase: 'දෙවන අදියර (Phase 2)',
    phaseSi: 'දෙවන අදියර',
    date: 'January 2027',
    location: 'Faculty of Humanities & Social Sciences Auditorium',
    locationSi: 'මානවශාස්ත්‍ර හා සමාජීයවිද්‍යා පීඨ ශ්‍රවණාගාරය',
    status: 'upcoming',
    description: 'Training 150 student leaders on how to recognize distress, provide non-judgmental listening, and refer peers to professional healthcare services.',
    descriptionSi: 'මිතුරන්ගේ මානසික පීඩනය සහ ඇබ්බැහිවීම් හඳුනාගෙන ඔවුන්ව වෘත්තීය ප්‍රතිකාර වෙත යොමුකිරීමට ශිෂ්‍ය නායකයින් 150ක් පුහුණු කිරීම.',
    targetAudience: 'Student Representatives & Leo Club Volunteers',
    expectedParticipants: 150,
  },
  {
    id: 'ev-community-drive',
    title: 'Island-wide School & Community Awareness Caravan',
    titleSi: 'දිවයින පුරා පාසල් සහ ප්‍රජා දැනුවත් කිරීමේ ජංගම වැඩසටහන',
    phase: 'තෙවන අදියර (Phase 3)',
    phaseSi: 'තෙවන අදියර',
    date: 'February – March 2027',
    location: 'Western & Southern Province High Schools',
    locationSi: 'බස්නාහිර සහ දකුණු පළාත්වල තෝරාගත් පාසල්',
    status: 'upcoming',
    description: 'Interactive drama, expert talks, and distribution of educational materials to schoolchildren and parents.',
    descriptionSi: 'පාසල් දරුවන් සහ දෙමාපියන් ඉලක්ක කරගත් නාට්‍යමය ඉදිරිපත් කිරීම් සහ උපදේශන වැඩසටහන්.',
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
    title: 'Multilingual Content & Media Creator',
    titleSi: 'ත්‍රිභාෂා අන්තර්ගත නිර්මාණකරු',
    commitment: '2–4 hours / week',
    description: 'Design educational social media infographics, short video clips, and translate peer articles into Sinhala, Tamil, and English.',
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
