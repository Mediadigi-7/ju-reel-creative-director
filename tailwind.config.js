/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        google: {
          blue: '#1A73E8',
          'blue-hover': '#1557B0',
          'blue-light': '#E8F0FE',
        },
        joy: {
          red: '#AF1E2A',
          'red-dark': '#8B1721',
          'red-light': '#FDF2F3',
          'red-subtle': '#F8D7DA',
          gray: '#524F4F',
          dark: '#1C1917',
          surface: '#FBFBFB',
          border: '#E7E5E4',
          muted: '#78716C',
        },
      },
    },
  },
  plugins: [],
}
