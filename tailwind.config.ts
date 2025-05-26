import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'desktop-small': '450px',
        'desktop-large': '1008px',
        'desktop-extra-large': '1400px',
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        green: {
          100: '#177126',
          200: '#D7F3DB',
          300: '#77B281',
        },
        red: {
          100: '#c73838',
          200: '#ff0d73',
          300: '#FFA3A3',
          400: '#FF3C3C',
        },
        black: {
          100: '#161618',
          200: '#323232',
        },
        grey: {
          100: '#81919c',
          200: '#d4d4d4',
          300: '#6b7280',
          400: '#C7C7C7',
        },
        dark: {
          100: '#424549',
          200: '#36393e',
          300: '#282b30',
          400: '#1e2124',
          500: '#36393e',
        },
        orange: {
          100: '#e37910',
          200: '#693502',
          300: '#693502',
        },
        yellow: {
          100: '#FFFFFF',
          200: '#F8F8FF',
          300: '#F3F3F3',
        },
        purple: {
          100: '#0096FF',
          200: '#572E88',
        },
        blue: {
          100: '#0096FF',
          200: '#43d0ee',
          300: '#E6F1F9',
          400: '#7AC5F9',
        }
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
