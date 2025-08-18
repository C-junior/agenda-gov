/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tocantins-blue': {
          DEFAULT: '#00529F',
          50: '#e6f0f9',
          100: '#cce1f3',
          200: '#99c3e6',
          300: '#66a5d9',
          400: '#3387cc',
          500: '#0069bf',
          600: '#00529f',
          700: '#003b73',
          800: '#002447',
          900: '#000d1b',
        },
        'tocantins-yellow': {
          DEFAULT: '#FFC72C',
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#ffdb66',
          400: '#ffd033',
          500: '#ffc72c',
          600: '#fcb900',
          700: '#fca700',
          800: '#fc9500',
          900: '#fb8300',
        },
        'tocantins-yellow-dark': '#fca700',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  safelist: [
    'bg-tocantins-blue',
    'text-tocantins-blue',
    'bg-tocantins-yellow',
    'text-tocantins-yellow',
    'bg-tocantins-yellow-dark',
    'text-tocantins-yellow-dark',
    'bg-blue-100',
    'bg-blue-200',
    'bg-blue-300',
    'text-blue-800',
    'hover:bg-blue-300',
  ],
}