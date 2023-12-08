/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: '#1fdf64',
          dark: '#1ed760',
        },
        secondary: {
          DEFAULT: '#191414',
          dark: '#121212',
        },
        tertiary: {
          DEFAULT: '#282828',
          dark: '#181818',
        },
        background: {
          DEFAULT: '#121212',
          dark: '#000000',
        },
        white: {
          DEFAULT: '#f6f6f6',
          dark: '#FFFFFF',
        },
        gray: {
          DEFAULT: '#a7a7a7',
          dark: '#737373',
        },
      },
    },
  },
  plugins: [],
}
