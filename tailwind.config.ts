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
      fontWeight: {
        600: '600',
        700: '700',
        800: '800',
      },
      colors: {
        ink: {
          DEFAULT: '#0e2428',
          soft: '#1a353b',
          mute: '#3d565c',
        },
        mist: {
          DEFAULT: '#f2f6f5',
          deep: '#e4eeeb',
        },
        foam: '#cfe3de',
        tide: {
          DEFAULT: '#1f7a6e',
          bright: '#2a9b8c',
          deep: '#145a52',
          soft: '#d5ebe6',
        },
        sun: '#f7faf9',
      },
      backgroundImage: {
        'grain':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        'hero-wash':
          'linear-gradient(105deg, rgba(14,36,40,0.88) 0%, rgba(14,36,40,0.55) 45%, rgba(14,36,40,0.25) 100%)',
        'section-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(42,155,140,0.12), transparent 60%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'rise': 'rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'drift': 'drift 18s ease-in-out infinite',
        'shimmer': 'shimmer 2.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-12px) scale(1.03)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
