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
          DEFAULT: '#101113',
          50: '#2c2e33',
          100: '#232529',
          200: '#1b1c1e',
          300: '#151618',
          400: '#101113',
          500: '#0b0c0d',
        },
        charcoal: {
          DEFAULT: '#242426',
          light: '#323235',
          lighter: '#434347',
          dark: '#1c1c1e',
        },
        gold: {
          DEFAULT: '#D8BE82',
          light: '#E5D1A2',
          dark: '#BA9F60',
          muted: '#C4AB70',
        },
        champagne: {
          DEFAULT: '#F1DFA5',
          light: '#F8EED1',
          dark: '#E0CA82',
        },
        ivory: {
          DEFAULT: '#F5F2EB',
          muted: '#E6E2D8',
          dark: '#D2CDC0',
        },
        bronze: {
          DEFAULT: '#8F7952',
          light: '#A69068',
          dark: '#6E5C3B',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(216, 190, 130, 0.25)',
        'gold-subtle': '0 0 15px -3px rgba(216, 190, 130, 0.15)',
        'charcoal-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
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
