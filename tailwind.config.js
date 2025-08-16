/** @type {import('tailwindcss').Config} */
const accessibleColors = require('./src/utils/accessibleColors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: accessibleColors,
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}
