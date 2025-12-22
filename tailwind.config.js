/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#1152d4',
        'background-light': '#f6f6f8',
        'background-dark': '#101622',
        'card-dark': '#1b2331',
        'card-admin': '#232f48',
        'text-secondary': '#92a4c9'
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px'
      }
    }
  }
};
