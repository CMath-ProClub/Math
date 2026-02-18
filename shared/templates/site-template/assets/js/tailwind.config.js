// Tailwind CSS runtime config — customize colors per site
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0C1D3A',
          800: '#132B50',
          700: '#1E3A5F',
          600: '#2B4C7E',
          500: '#3A6298',
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
