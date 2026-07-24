import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#0b0d0c',
          soft: '#171a18',
          mute: '#5a635e',
        },
        paper: {
          DEFAULT: '#f5f7f2',
          deep: '#e8ece3',
        },
        lime: {
          DEFAULT: '#c8f000',
          hot: '#d9ff2e',
          deep: '#9bc200',
          soft: '#eef8b8',
        },
        mist: {
          DEFAULT: '#eef1ea',
          deep: '#dde3d6',
        },
        // legacy aliases used during transition
        sun: '#f5f7f2',
        tide: {
          DEFAULT: '#c8f000',
          bright: '#d9ff2e',
          deep: '#9bc200',
          soft: '#eef8b8',
        },
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        'hero-wash':
          'linear-gradient(115deg, rgba(11,13,12,0.92) 0%, rgba(11,13,12,0.72) 42%, rgba(11,13,12,0.35) 100%)',
        'lime-beam':
          'radial-gradient(ellipse 70% 55% at 15% 20%, rgba(200,240,0,0.22), transparent 55%)',
        checker:
          'linear-gradient(45deg, #e8ece3 25%, transparent 25%), linear-gradient(-45deg, #e8ece3 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e8ece3 75%), linear-gradient(-45deg, transparent 75%, #e8ece3 75%)',
      },
      boxShadow: {
        punch: '4px 4px 0 0 #0b0d0c',
        'punch-lime': '4px 4px 0 0 #c8f000',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        rise: 'rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'rise-late': 'rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards',
        pop: 'pop 0.55s cubic-bezier(0.34, 1.4, 0.64, 1) forwards',
        drift: 'drift 20s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        'underline-draw': 'underlineDraw 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        drift: {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.05) translate(-1%, -1%)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        underlineDraw: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
