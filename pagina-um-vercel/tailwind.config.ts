import type { Config } from 'tailwindcss';

/** Tokens vindos do :root do style.css original. */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        dark: '#1a1a1a',
        mid: '#4a4a4a',
        light: '#f5f5f5',
        line: '#e2e2e2',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: { sm: '8px', md: '14px', lg: '24px' },
      maxWidth: { container: '1180px' },
      boxShadow: {
        mock: '0 30px 60px -20px rgba(0,0,0,0.18)',
        float: '0 12px 30px -8px rgba(0,0,0,0.4)',
      },
      fontSize: {
        h1: ['clamp(2.2rem, 4.5vw, 3.4rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.7rem, 3vw, 2.3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      transitionDuration: { DEFAULT: '250ms' },
    },
  },
  plugins: [],
};

export default config;
