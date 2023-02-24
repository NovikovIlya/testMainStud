/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'MobileScreen': { 'raw': '(max-width: 617px)' },
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
