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
      colors: {
        dark: {
          100: '#424549',
          200: '#36393e',
          300: '#282b30',
          400: '#1e2124',
          500: '#36393e',
        },
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
