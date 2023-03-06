/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,scss}"],
  theme: {
    extend: {
      colors: {
        EllipseColor: "#7fc3e5",
        bluekfu: "#1677ff",
        "gray-d9": "#b9b9b9",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
