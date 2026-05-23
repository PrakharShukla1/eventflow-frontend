/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fde8e4',
          500: '#e84d3d',
          600: '#d43c2c',
          700: '#b22f21',
        },
        dark: {
          900: '#0f0f10',
          800: '#1a1a1c',
          700: '#242426',
          600: '#2e2e30',
        }
      }
    },
  },
  plugins: [],
};
