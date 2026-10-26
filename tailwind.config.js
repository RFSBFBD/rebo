/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bayaak: {
          navy: {
            DEFAULT: '#0B192C',
            dark: '#06101E',
            light: '#142744',
            surface: '#1A3258',
            muted: '#334E68',
          },
          gold: {
            DEFAULT: '#D4AF37',
            light: '#F5E6BE',
            bright: '#F9DC7D',
            dark: '#AA8221',
            metallic: '#C5A059',
            gradientStart: '#BF953F',
            gradientMid: '#FCF6BA',
            gradientEnd: '#B38728',
          },
          cream: {
            DEFAULT: '#FBF9F5',
            warm: '#F7F3EB',
            card: '#FFFFFF',
            border: '#E8E1D5',
            muted: '#8A8275',
          }
        }
      },
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 4px 20px -2px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 10px 30px -4px rgba(212, 175, 55, 0.35)',
        'navy-sm': '0 2px 8px 0 rgba(11, 25, 44, 0.08)',
        'navy-md': '0 8px 24px -4px rgba(11, 25, 44, 0.12)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
