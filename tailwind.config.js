/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hand: ['Caveat', 'Patrick Hand', 'cursive'],
        kalam: ['Kalam', 'cursive'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: {
          50: '#fdfcf9',
          100: '#faf8f2',
          200: '#f3efe3',
          300: '#e8e1cb',
          400: '#d7cbb0',
          500: '#baaa87',
          800: '#3c3529',
          900: '#231e17',
        },
        denim: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#273549',
          600: '#334155',
        },
        gingham: {
          red: '#c92a2a',
          light: '#f8d7da',
        }
      },
      boxShadow: {
        'paper-sm': '0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.08)',
        'paper-md': '0 6px 16px -2px rgba(0,0,0,0.12), 0 2px 6px -1px rgba(0,0,0,0.08)',
        'paper-lg': '0 20px 35px -8px rgba(0,0,0,0.25), 0 8px 16px -4px rgba(0,0,0,0.15)',
        'paper-ball': '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.6)',
        'sticky': '2px 4px 10px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
