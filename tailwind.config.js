/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'MobileScreen': { 'raw': '(max-width: 617px)' },
      },
      colors: {
        EllipseColor: '#7fc3e5'
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
