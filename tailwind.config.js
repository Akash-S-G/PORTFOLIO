/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#060706',
          900: '#0B0D0C', // Primary background
          850: '#101312',
          800: '#141816', // Card background
          750: '#1A201D',
          700: '#232A27', // Border
          600: '#343E3A',
        },
        ivory: {
          DEFAULT: '#F4F1E8', // Primary text
          dim: '#C8C4B7',
          muted: '#8E8B80',
          subtle: '#58564F',
        },
        lime: {
          DEFAULT: '#C5F36B', // Electric lime accent
          hover: '#B5E857',
          dim: '#8FB838',
          subtle: 'rgba(197, 243, 107, 0.12)',
          glow: 'rgba(197, 243, 107, 0.25)',
        },
        cyan: {
          DEFAULT: '#38C7D2', // Muted cyan technical accent
          muted: '#247D85',
          subtle: 'rgba(56, 199, 210, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
