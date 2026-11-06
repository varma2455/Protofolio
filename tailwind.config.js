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
        dark: {
          bg: '#080A0F',
          secondary: '#10141D',
          card: '#151B26',
          cardHover: '#1B2332',
          text: '#F5F7FA',
          muted: '#929BAA',
          border: 'rgba(255, 255, 255, 0.09)',
          borderSubtle: 'rgba(255, 255, 255, 0.05)',
        },
        light: {
          bg: '#F8FAFC',
          secondary: '#EEF2F6',
          card: '#FFFFFF',
          cardHover: '#F1F5F9',
          text: '#0F172A',
          muted: '#64748B',
          border: 'rgba(15, 23, 42, 0.08)',
          borderSubtle: 'rgba(15, 23, 42, 0.04)',
        },
        accent: {
          blue: '#648CFF',
          blueHover: '#4B75FA',
          violet: '#9575FF',
          violetHover: '#815BF5',
          cyan: '#38BDF8',
          emerald: '#10B981',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient-hero': 'radial-gradient(circle at 50% 0%, rgba(100, 140, 255, 0.12) 0%, rgba(149, 117, 255, 0.05) 45%, transparent 70%)',
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        'grid-pattern-light': 'linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
