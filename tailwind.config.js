/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black50:'#E6E6E6',
        black100:'#B0B0B0',
        black200:'#8A8A8A',
        black300:'#545454',
        black400:'#333333',
        black500:'#000000',
        blue600:'#193FAE',
        yellow500:'#FACC05',
        gray50:'#FDFDFD',
        gray100:'#F7F7F7',
        gray200:'#F4F4F4',
        gray300:'#EEEEEE',
        gray400:'#EBEBEB',
        gray500:'#E6E6E6',
        gray600:'#D1D1D1',
        gray700:'#A3A3A3',
        gray800:'#7F7F7F',
        gray900:'#616161',
      },
      fontSize: {
        'p18' : '18px',
        'p20' : '20px',
      }
    },
  },
  plugins: [],
}