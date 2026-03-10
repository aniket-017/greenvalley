/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2d5a27',
          light: '#3d7a35',
          dark: '#1e3d1a',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(45, 90, 39, 0.08), 0 2px 4px -2px rgba(45, 90, 39, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(45, 90, 39, 0.12), 0 8px 10px -6px rgba(45, 90, 39, 0.08)',
      },
    },
  },
  plugins: [],
};
