/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'genshin' : 'url("https://wallpapercave.com/wp/wp9660709.jpg")',
        'genshin1' : 'url("https://wallpapercave.com/wp/wp9999057.jpg")',
      },
      keyframes: {
        'trans-down': {
          '0%, 100%': {transform: 'translateY(10px)'},
          '50%': {transform: 'translateY(0px)'}
        }
      },
      animation: {
        'trans-down':'trans-down 1.5s ease-in-out forwards'
      }
    },
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
}

