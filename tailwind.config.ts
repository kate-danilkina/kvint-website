import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        'bg-2': '#12121A',
        accent: '#1A6EFF',
        'accent-dim': 'rgba(26,110,255,0.13)',
        text: '#F0F0F5',
        muted: '#888899',
        border: 'rgba(255,255,255,0.06)',
        // Data colours: growth / loss
        up: '#34D399',
        down: '#F87171',
        // Light "printed report" surface
        paper: '#F2F1EC',
        ink: '#15151B',
        'ink-muted': '#5E5E6A',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}

export default config
