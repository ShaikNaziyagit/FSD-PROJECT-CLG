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
        campii: {
          cream: '#F8F5EF',
          offwhite: '#FDFBF7',
          surface: 'rgba(255, 255, 255, 0.78)',
          'surface-hover': 'rgba(255, 255, 255, 0.94)',
          border: 'rgba(255, 255, 255, 0.9)',
          'border-subtle': 'rgba(226, 232, 240, 0.8)',
          primary: '#2563eb',
          cyan: '#0284c7',
          sky: '#38bdf8',
          violet: '#7c3aed',
          teal: '#0d9488',
          accent: '#4f46e5',
        },
        campus: {
          bg: '#F8F5EF',
          card: 'rgba(255, 255, 255, 0.8)',
          surface: 'rgba(255, 255, 255, 0.65)',
          border: 'rgba(226, 232, 240, 0.8)',
          'border-hover': 'rgba(99, 102, 241, 0.35)',
          cyan: '#0284c7',
          blue: '#2563eb',
          purple: '#7c3aed',
          violet: '#4f46e5',
          accent: '#06b6d4',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.6) 100%)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
      },
      boxShadow: {
        'glass': '0 10px 30px -4px rgba(15, 23, 42, 0.05), 0 4px 12px -2px rgba(15, 23, 42, 0.02)',
        'glass-glow': '0 0 25px -5px rgba(99, 102, 241, 0.18), 0 10px 32px 0 rgba(15, 23, 42, 0.05)',
        'cyan-glow': '0 0 20px -2px rgba(2, 132, 199, 0.25)',
        'purple-glow': '0 0 20px -2px rgba(124, 58, 237, 0.25)',
        'card-soft': '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', '"Outfit"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
