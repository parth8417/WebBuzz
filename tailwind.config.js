/** @type {import('tailwindcss').Config} */
import accessibleColors from './src/utils/accessibleColors.js';

export default {
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
};
