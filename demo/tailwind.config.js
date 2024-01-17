/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./main.js",
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      // '2xl': '1400px' 
    },
    colors:{
      ...colors,
      'primary': "#5B9BC6",
      'dark': "#121B2B",
      'gray': {
        DEFAULT: "#DBE3F1",
        light: "#F3F6FA"
      },
      'blue': {
        DEFAULT: "#5B9BC6",
        dark: "#27637F",
        light: "#C4E3FF"
      },
    },
    extend: {
      fontFamily: {
          raleway: 'Raleway',
          roboto: 'Roboto'
      },
      backgroundImage: {
        'topImage': "url('/img/bg/top.png')",
        'feedbackImage': "url('/img/bg/feedback.png')",
        'orderImage': "url('/img/bg/order.png')"
      }
    },
  },
  plugins: [],
}