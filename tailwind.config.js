/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          bg: '#0C0B09',
          secondary: '#14120F',
          surface: '#191713',
          elevated: '#211D17',
          border: 'rgba(214, 179, 106, 0.20)',
          borderSubtle: 'rgba(214, 179, 106, 0.10)',
          textPrimary: '#F5F0E6',
          textSecondary: '#B9B2A5',
        },
        gold: {
          accent: '#D6B36A',
          secondary: '#B99555',
          light: '#E5C98A',
          dark: '#9A7938',
          glow: 'rgba(214, 179, 106, 0.20)',
        },
        // Theme Compatibility Aliases
        navy: {
          main: '#0C0B09',
          secondary: '#14120F',
          card: '#191713',
          elevated: '#211D17',
          border: 'rgba(214, 179, 106, 0.20)',
          borderSubtle: 'rgba(214, 179, 106, 0.10)',
          textPrimary: '#F5F0E6',
          textSecondary: '#B9B2A5',
        },
        cyan: {
          accent: '#D6B36A',
        },
        violet: {
          accent: '#B99555',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
