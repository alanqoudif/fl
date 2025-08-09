/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // <-- أضف هذا السطر لتفعيل Dark Mode عبر class
  theme: {
    extend: {},
  },
  plugins: [],
};

