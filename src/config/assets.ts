/**
 * Central Asset Configuration
 * All visual assets, poster paths, logos, and placeholders are managed here.
 * When real assets or official photographic assets are updated by the team,
 * update the paths in this file without changing UI layouts.
 */

export const ASSETS = {
  // Official Campaign Poster extracted from the project proposal
  campaignPoster: '/assets/campaign_poster.png',
  
  // Official Logo Icon SVG
  logoIcon: '/logo-icon.svg',
  
  // Organization emblems
  leoLogoPlaceholder: '/logo-icon.svg',
  
  // Hero Visuals
  heroAtmosphere: {
    darknessGradient: 'linear-gradient(180deg, rgba(16, 17, 19, 0.95) 0%, rgba(36, 36, 38, 0.85) 100%)',
    goldGlow: 'radial-gradient(circle at 75% 30%, rgba(216, 190, 130, 0.18) 0%, rgba(16, 17, 19, 0) 65%)',
  },
  
  // Campaign Gallery placeholders with exact aspect ratios
  campaignGallery: [
    {
      id: 'gallery-1',
      title: 'University Campus Awareness Drive',
      titleSinhala: 'විශ්වවිද්‍යාල පරිශ්‍රයේ දැනුවත් කිරීමේ වැඩසටහන',
      category: 'Awareness Drive',
      date: 'November 2026',
      aspectRatio: '16/9',
      placeholderGradient: 'from-charcoal via-charcoal-light to-midnight',
    },
    {
      id: 'gallery-2',
      title: 'Youth Leadership & Peer Mentoring',
      titleSinhala: 'තරුණ නායකත්ව හා මිතුරු මඟපෙන්වීම',
      category: 'Workshop',
      date: 'December 2026',
      aspectRatio: '16/9',
      placeholderGradient: 'from-midnight via-charcoal to-bronze-dark',
    },
    {
      id: 'gallery-3',
      title: 'Community Dialogue & Family Support',
      titleSinhala: 'ප්‍රජා සංවාදය සහ පවුල් සවිබලගැන්වීම',
      category: 'Community',
      date: 'January 2027',
      aspectRatio: '16/9',
      placeholderGradient: 'from-charcoal-light via-midnight to-charcoal',
    },
  ],
};
