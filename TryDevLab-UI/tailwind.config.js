/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff8ff',
          100: '#dff1ff',
          200: '#b8e4ff',
          300: '#7fd3ff',
          400: '#39bbff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e'
        }
      },
      boxShadow: {
        card: '0 10px 30px rgba(16, 24, 40, 0.08)'
      }
    }
  },
  plugins: []
};
