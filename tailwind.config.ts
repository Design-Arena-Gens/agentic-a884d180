import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0D10',
        surface: '#111418',
        muted: '#1A1F24',
        primary: '#6EE7B7',
        secondary: '#93C5FD',
        text: '#E5E7EB',
        subtle: '#9CA3AF'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
} satisfies Config
