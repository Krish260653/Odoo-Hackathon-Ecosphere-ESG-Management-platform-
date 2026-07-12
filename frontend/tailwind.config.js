/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D6A4F',
          hover: '#1B4332',
          light: '#E9F5ED',
        },
        social: {
          DEFAULT: '#457B9D',
          hover: '#345D78',
          light: '#EBF3F7',
        },
        governance: {
          DEFAULT: '#E9C46A',
          hover: '#D4B04C',
          light: '#FDF8EC',
        },
        background: {
          DEFAULT: '#FAFAFA',
          card: '#FFFFFF',
        },
        text: {
          main: '#1A1A1A',
          muted: '#6B7280',
        },
        border: {
          subtle: '#EEEEEE',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'card': '16px',
      }
    },
  },
  plugins: [],
}
