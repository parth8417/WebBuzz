/** @type {import('tailwindcss').Config} */
// Import accessibleColors from the ESM module via a dynamic import
let accessibleColors;
import('./src/utils/accessibleColors.js').then(module => {
  accessibleColors = module.default;
});

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
