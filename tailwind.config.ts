/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          lavender: {
            50: '#faf7ff',
            100: '#f3edff',
            200: '#e9ddff',
            300: '#d7c3ff',
            400: '#c09dff',
            500: '#a673ff',
            600: '#9147ff',
            700: '#7c2df7',
            800: '#6920d3',
            900: '#581cb0',
            950: '#3a0d78'
          }
        }
      },
    },
    plugins: [],
  }