/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {
      backgroundSize: {
        '50' : "50%"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login-pattern': "url('/img/login-bg.webp')",
        'white-to-lightblue': "linear-gradient(90deg, #fff, #EEF7FF)"
      },
      borderRadius: {
        'md': '0.5rem',
        'lg': '1rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1370px',
        '3xl': '1536px',
      },
      minHeight: {
        '600': '600px',
        '100': '100px',
        'screen': 'calc(100vh - 64px)',
      },
      listStyleImage: {
        checkmark: 'url("/img/check.svg")',
      },
    },
    colors: {
      'blue': {
        900: '#111F40',
        800: '#1B3266',
        700: '#0172BE',
        600: '#649ED8',
        500: '#D4ECFF',
        400: '#EEF7FF', 
      },
      'gray' :{
        700: '#666'
      },
      'green': '#A4CC00',
      'white': '#fff',
      'red': '#ff0000',
      'grad1': '#2950BA',
      'grad2': '#0071BC',
      'grad3': '#2A92EB',
      'transparent': 'transparent',
      'white-50' : 'rgba(255,255,255, 0.5)',
      'inherit' : 'inherit'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Sanchez', 'serif'],
    },
  },
  plugins: [],
}

