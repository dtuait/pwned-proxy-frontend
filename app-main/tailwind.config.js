/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",      // if using the "pages" directory
    "./app/**/*.{js,ts,jsx,tsx}",        // if using the new "app" directory
    "./components/**/*.{js,ts,jsx,tsx}"  // if you have a components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
