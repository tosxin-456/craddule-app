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
        black100:'#B0B0B0',
        black200:'#8A8A8A',
        black400:'#333333',
        black500:'#000000',
      },
      fontSize: {
        'p18' : '18px',
        'p20' : '20px',
      }
    },
  },
  plugins: [],
}