/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tocantins-blue': '#00529F',
        'tocantins-yellow': '#FFC72C',
        'tocantins-yellow-dark': '#fca700',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  // Safelist some classes that might be dynamically used
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