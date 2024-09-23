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
        blue50:'#E8ECF9',
        blue100:'#B8C5EB',
        blue200:'#96A9E2',
        blue300:'#6682D4',
        blue400:'#496ACC',
        blue500:'#1B45BF',
        blue600:'#193FAE',
        blue700:'#133188',
        blue800:'#0F2669',
        blue900:'#0B1D50',      
      },
      fontSize: {
        'p18' : '18px',
        'p20' : '20px',
      }
    },
  },
  plugins: [],
}