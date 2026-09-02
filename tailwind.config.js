/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37', ice: '#00FFFF', crimson: '#DC143C',
        azure: '#00BFFF', ember: '#E8751A', leaf: '#4CAF50',
        dark: '#0a0a0a', darker: '#050505',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
