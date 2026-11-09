/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Softened light theme: warm paper instead of pure white, charcoal instead of pure black
        white: '#FAF7F1',
        black: '#181715',
        neutral: colors.stone,
        // Dark theme graphite palette
        graphite: {
          950: '#060706',
          900: '#0B0D0C',
          850: '#111413',
          800: '#161B18',
          750: '#1C221F',
          700: '#252D29',
          600: '#353F3A',
        },
        // Dark theme typography
        ivory: {
          DEFAULT: '#F4F1E8',
          dim: '#C8C4B7',
          muted: '#8E8B80',
        },
        // Technical accents
        lime: {
          DEFAULT: '#C5F36B',
          hover: '#B1E350',
          dark: '#589A29',
          subtle: 'rgba(197, 243, 107, 0.12)',
          glow: 'rgba(197, 243, 107, 0.25)',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          dark: '#0891B2',
          subtle: 'rgba(34, 211, 238, 0.12)',
        },
        accent: {
          DEFAULT: '#6366F1',
          soft: '#818CF8',
          subtle: 'rgba(99, 102, 241, 0.12)',
        },
        // Signal orange — primary accent on black/white
        signal: {
          DEFAULT: '#FF4D00',
          bright: '#FF6A26',
          deep: '#E04400',
          subtle: 'rgba(255, 77, 0, 0.12)',
          glow: 'rgba(255, 77, 0, 0.25)',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'IBM Plex Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['Anton', 'Archivo', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
