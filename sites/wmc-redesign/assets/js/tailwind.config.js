/**
 * World Mathematics Championships — Shared Tailwind CSS Configuration
 * Loaded after the Tailwind CDN script on every page.
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        teal: {
          950: '#041F1A',
          900: '#0A3830',
          800: '#0D5247',
          700: '#0F6B5E',
          600: '#149177',
          500: '#17A689',
        },
        gold: {
          500: '#D4A017',
          400: '#E8B931',
          300: '#F0CC5B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
};
