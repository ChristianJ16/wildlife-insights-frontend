/** @type  {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-green': '#0C4B23',
        'secondary-green': '#22CE61',
      },
      boxShadow: {
        custom:
          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
      },
    },
    fontFamily: {
      sans: ['Lexend', 'sans-serif'],
    },
    // enables manual dark mode
    darkMode: 'class',
  },
  plugins: [],
};