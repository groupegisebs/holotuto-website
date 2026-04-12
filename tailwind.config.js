/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './**/*.{js,jsx,ts,tsx}',
    '!./node_modules/**',
  ],
  theme: {
    extend: {
      colors: {
        // Palette officielle HOLO TUTO — Charte Graphique
        'ht-blue':    '#1F68E5', // Titres, liens, accents UI
        'ht-green':   '#48BE52', // CTA principaux, badges, états positifs
        'ht-cyan':    '#4CC3D6', // Dégradés, surlignages, icônes
        'ht-navy':    '#182E5C', // Texte fort et navigation
        'ht-light':   '#EEF8FF', // Fonds de sections, cartes, halos
        'ht-mint':    '#EDFCEB', // Aplats secondaires, repères visuels
        'ht-text':    '#4A5568', // Corps de texte
        'ht-gray':    '#F7F9FC', // Fonds neutres très clairs
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        nunito:     ['Nunito', 'sans-serif'],
        inter:      ['Inter', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float:      'float 3s ease-in-out infinite',
        'fade-in':  'fade-in 0.3s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      boxShadow: {
        card:    '0 2px 16px 0 rgba(31,104,229,0.07)',
        'card-hover': '0 6px 24px 0 rgba(31,104,229,0.13)',
      },
    },
  },
  plugins: [],
}
