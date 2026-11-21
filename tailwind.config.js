/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#FFF9F5',
          50: '#FFFCFA',
          100: '#FFF9F5',
          200: '#F6EDE6',
          300: '#EFE2D8',
          400: '#E7D7CE',
          500: '#D8C8BC',
        },
        charcoal: {
          DEFAULT: '#F6EDE6',
          light: '#EFE2D8',
          lighter: '#DCCDC4',
          dark: '#E7D7CE',
        },
        smoky: {
          DEFAULT: '#F6EDE6',
        },
        gold: {
          DEFAULT: '#8B1E2D',
          light: '#A83B4C',
          dark: '#701625',
          muted: '#9F4851',
        },
        champagne: {
          DEFAULT: '#D35D6E',
          light: '#F8E2E5',
          dark: '#AF4352',
        },
        ivory: {
          DEFAULT: '#1F2937',
          muted: '#6B7280',
          dark: '#4B5563',
        },
        bronze: {
          DEFAULT: '#55743D',
          light: '#A3C585',
          dark: '#3F5E2B',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(139, 30, 45, 0.18)',
        'gold-subtle': '0 8px 24px -8px rgba(139, 30, 45, 0.18)',
        'charcoal-elevated': '0 12px 32px -14px rgba(31, 41, 55, 0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
