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
        bg: '#ECEBE6',
        'bg-2': '#FFFFFF',
        accent: '#1A6EFF',
        'accent-dim': 'rgba(26,110,255,0.13)',
        text: '#111114',
        muted: '#5C5C66',
        border: 'rgba(0,0,0,0.08)',
        night: '#111114',
        // Data colours: growth / loss
        up: '#0A8F5F',
        down: '#D23B3B',
        // Light "printed report" surface
        paper: '#F2F1EC',
        ink: '#15151B',
        'ink-muted': '#5E5E6A',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      // Fluid type scale — values live in app/globals.css (:root)
      fontSize: {
        'step--1': 'var(--step--1)',
        'step-0': 'var(--step-0)',
        'step-1': 'var(--step-1)',
        'step-2': 'var(--step-2)',
        'step-3': 'var(--step-3)',
        'step-4': 'var(--step-4)',
        'step-5': 'var(--step-5)',
        'step-6': 'var(--step-6)',
      },
      // Fluid spacing — usable as py-fluid-2xl, gap-fluid-m, mb-fluid-l …
      spacing: {
        'fluid-xs': 'var(--space-xs)',
        'fluid-s': 'var(--space-s)',
        'fluid-m': 'var(--space-m)',
        'fluid-l': 'var(--space-l)',
        'fluid-xl': 'var(--space-xl)',
        'fluid-2xl': 'var(--space-2xl)',
        'fluid-3xl': 'var(--space-3xl)',
      },
      borderRadius: {
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}

export default config
