import { useTranslation } from 'react-i18next'
import Triangle from '../components/Triangle'

const CARD_IMGS = [
  '/images/section2_img1.png',
  '/images/section2_img2.png',
  '/images/section2_img3.png',
  '/images/section2_img4.png',
]
const CARD_ICONS   = ['❓', '⚠️', '🕐', '🔒']
const CARD_ICONBGS = ['bg-blue-500', 'bg-amber-400', 'bg-teal-500', 'bg-teal-500']

const TILE_COLORS = [
  'bg-gray-900 text-white',
  'bg-yellow-400 text-gray-900',
  'bg-red-500 text-white',
  'bg-blue-500 text-white',
  'bg-green-500 text-white',
  'bg-purple-500 text-white',
  'bg-orange-400 text-white',
]
// Realistic pushpin: base color, dark shadow tone, highlight tone
const PIN_DEFS = [
  { base: '#FACC15', dark: '#A37E00', highlight: '#FEF08A' }, // yellow
  { base: '#EF4444', dark: '#991B1B', highlight: '#FCA5A5' }, // red
  { base: '#22C55E', dark: '#14532D', highlight: '#86EFAC' }, // green
  { base: '#3B82F6', dark: '#1E3A8A', highlight: '#93C5FD' }, // blue
  { base: '#4ADE80', dark: '#166534', highlight: '#BBF7D0' }, // light-green
  { base: '#94A3B8', dark: '#334155', highlight: '#E2E8F0' }, // gray
  { base: '#FB923C', dark: '#9A3412', highlight: '#FED7AA' }, // orange
]

const Pushpin = ({ def }) => (
  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id={`pg-${def.base}`} cx="38%" cy="32%" r="60%">
        <stop offset="0%"   stopColor={def.highlight} />
        <stop offset="55%"  stopColor={def.base} />
        <stop offset="100%" stopColor={def.dark} />
      </radialGradient>
      <filter id={`ps-${def.base}`} x="-30%" y="-20%" width="160%" height="160%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#00000055" />
      </filter>
    </defs>
    {/* Pin head sphere */}
    <circle
      cx="8" cy="7" r="6.5"
      fill={`url(#pg-${def.base})`}
      filter={`url(#ps-${def.base})`}
    />
    {/* Specular highlight */}
    <ellipse cx="5.5" cy="4.5" rx="2" ry="1.3" fill="white" opacity="0.45" transform="rotate(-20 5.5 4.5)" />
    {/* Pin needle */}
    <line x1="8" y1="13" x2="8" y2="19" stroke={def.dark} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function ProblemSection() {
  const { t } = useTranslation()

  const cards = [1, 2, 3, 4].map((n) => ({
    img:     CARD_IMGS[n - 1],
    alt:     t(`problem.card${n}_alt`),
    title:   t(`problem.card${n}_title`),
    sub:     t(`problem.card${n}_sub`),
    icon:    CARD_ICONS[n - 1],
    iconBg:  CARD_ICONBGS[n - 1],
  }))

  return (
    <section 
      id="problem" 
      className="py-20 w-full h-full object-contain bg-no-repeat bg-center bg-cover relative"
      style={{
        backgroundImage: 'url(/images/hero-bg.svg)',
      }}
    >
      {/* Triangles décoratifs d'arrière-plan */}
      <Triangle className="top-110 left-6"   size={16} opacity={0.30} />
      <Triangle className="top-138 left-20"  size={10} opacity={0.18} />
      <Triangle className="bottom-140 left-32" size={13} opacity={0.20} />
      <Triangle className="top-160 right-44"  size={11} opacity={0.18} />
      <Triangle className="bottom-140 right-14" size={15} opacity={0.22} />
      <Triangle className="bottom-180 right-36" size={9}  opacity={0.15} />

      <div className="section-wrapper">
        <div className="section-header">
          {/* Colored letter tiles with pushpins */}
          <div className="flex justify-center mb-6">
            <div className="flex items-end gap-1">
              {t('problem.letter_title').split('').map((letter, i) => (
                <div key={i} className="flex flex-col items-center gap-0">
                  <Pushpin def={PIN_DEFS[i % PIN_DEFS.length]} />
                  <span
                    className={`${TILE_COLORS[i % TILE_COLORS.length]} font-montserrat font-extrabold text-2xl md:text-3xl w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm`}
                  >
                    {letter}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="section-title text-3xl md:text-4xl">{t('problem.title')}</h2>
          <p className="section-subtitle max-w-2xl mx-auto text-base">{t('problem.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="card overflow-hidden group flex flex-col">
              {/* 1 — Card title on top */}
              <div className="px-5 pt-5 pb-3">
                <h3 className="font-montserrat font-bold text-ht-navy text-sm leading-snug text-center">{c.title}</h3>
              </div>

              {/* 2 — Photo in the middle */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* 3 — Icon badge + subtitle side by side */}
              <div className="flex items-start gap-3 px-5 py-4 mt-auto">
                <div className={`${c.iconBg} w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-base`}>
                  {c.icon}
                </div>
                <p className="font-inter text-ht-text text-xs leading-relaxed">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
