/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",      // if using the "pages" directory
    "./app/**/*.{js,ts,jsx,tsx}",        // if using the new "app" directory
    "./components/**/*.{js,ts,jsx,tsx}"  // if you have a components folder
  ],
  darkMode: 'class', // or 'media', if you prefer
  theme: {
    extend: {
      colors: {
        // Light mode colors (inspired by DEIC/DKCERT)
        deicBlue: '#00254f',       // Deep navy/dark blue
        deicLightBlue: '#0053a4',  // Lighter accent
        deicOrange: '#f47c20',     // Orange accent
        deicGray: '#f5f5f5',

        // Dark mode (Tokyo Night Storm)
        tnStormBg: '#24283b',      // near-black / deep blue background
        tnStormFg: '#c0caf5',      // light gray/blue text
        tnStormAccent1: '#7aa2f7', // bright-ish teal/blue
        tnStormAccent2: '#bb9af7', // purple/pink accent
        tnStormAccent3: '#e0af68', // earthy brown/gold accent
      },
    },
  },
  plugins: [],
}
