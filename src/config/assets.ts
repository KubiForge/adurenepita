/**
 * Central Asset Configuration - Beyond the Darkness
 * Mapped to the official assets from the project proposal & visual references.
 */

export const ASSETS = {
  // Official Campaign Poster
  campaignPoster: '/assets/campaign_poster.png',
  
  // Official Logo & Emblems
  logo: '/assets/logo.png',
  logoIcon: '/assets/logo.png',
  leoLogoPlaceholder: '/assets/logo.png',
  kubiForgeShowcase: '/assets/Kubi%20Forge%20Startup%20Hub%20Showcase.png',

  // Real Photographic Backgrounds
  heroBg: '/assets/hero-bg.png',
  knowledgeBg: '/assets/knowledge-bg.png',
  servicesBg: '/assets/services-bg.png',
  campaignsBg: '/assets/campaigns-bg.jpg',
  donateBg: '/assets/donate-bg.png',

  // UI Reference Collages
  uiReferenceUser: '/assets/ui-reference-user.jpg',
  uiReferenceAdmin: '/assets/ui-reference-admin.jpg',

  // Hero Atmospheric Styles
  heroAtmosphere: {
    darknessGradient: 'linear-gradient(180deg, rgba(16, 17, 19, 0.92) 0%, rgba(36, 36, 38, 0.85) 100%)',
    goldGlow: 'radial-gradient(circle at 75% 30%, rgba(216, 190, 130, 0.18) 0%, rgba(16, 17, 19, 0) 65%)',
  },

  // Campaign Gallery items
  campaignGallery: [
    {
      id: 'gallery-1',
      title: 'Beyond the Stigma Campus Drive',
      category: 'Awareness Drive',
      date: '15 – 30 Nov 2026',
      venue: 'USJ Campus Grounds',
      image: '/assets/campaigns-bg.jpg',
    },
    {
      id: 'gallery-2',
      title: 'Youth Prevent Program',
      category: 'Schools & Communities',
      date: '05 Dec 2026',
      venue: 'Western Province Schools',
      image: '/assets/campaign_poster.png',
    },
    {
      id: 'gallery-3',
      title: 'Choose a Healthier You',
      category: 'Community Campaign',
      date: '10 Jan 2027',
      venue: 'Colombo Town Hall',
      image: '/assets/hero-bg.png',
    },
  ],
};
