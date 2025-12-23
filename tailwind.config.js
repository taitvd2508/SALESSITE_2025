/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      keyframes: {
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        toastOut: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-8px) scale(0.98)' }
        }
      },
      animation: {
        toastIn: 'toastIn 0.2s ease-out',
        toastOut: 'toastOut 0.2s ease-in'
      },
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
  },
  plugins: []
};
