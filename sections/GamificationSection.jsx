import { useTranslation } from 'react-i18next'
import Triangle from '../components/Triangle'

const BLOCK_IMGS = [
  '/images/section8_img1.png',
  '/images/section8_img2.png',
  '/images/section8_img3.png',
]
const BLOCK_TITLE_COLORS = ['text-ht-blue', 'text-ht-green', 'text-ht-blue']

// Large X corner decoration matching the design's salmon/coral cross shapes
const XMark = ({ className }) => (
  <svg
    viewBox="0 0 80 80"
    className={`absolute pointer-events-none opacity-50 ${className}`}
    aria-hidden="true"
  >
    <line x1="8" y1="8" x2="72" y2="72" stroke="#F87171" strokeWidth="16" strokeLinecap="round" />
    <line x1="72" y1="8" x2="8" y2="72" stroke="#F87171" strokeWidth="16" strokeLinecap="round" />
  </svg>
)

export default function GamificationSection() {
  const { t } = useTranslation()

  const MissionCard = () => (
    <div className="bg-white/90 rounded-2xl shadow-card p-5 w-64 space-y-6">
      <p className="font-montserrat font-bold text-ht-navy text-sm">{t('gamification.mission_title')}</p>
      <div className="space-y-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-ht-green text-white flex items-center justify-center text-xs flex-shrink-0">✓</span>
            <span className="font-inter text-xs text-ht-navy line-through opacity-60">{t(`gamification.mission${n}`)}</span>
            <span className="ml-auto text-ht-green text-xs font-bold">✓</span>
          </div>
        ))}
      </div>
      <button className="w-full btn-primary py-2 text-xs mt-1">
        {t('gamification.mission_done_btn')}
      </button>
    </div>
  )

  const XPCard = () => (
    <div className="bg-ht-green text-white rounded-2xl shadow-lg p-4 text-center">
      <p className="font-montserrat font-extrabold text-xl">Super!</p>
      <p className="font-montserrat font-bold text-sm mt-1">{t('gamification.xp_label')}</p>
    </div>
  )

  const overlays = [<MissionCard key="mission" />, null, <XPCard key="xp" />]

  const blocks = [1, 2, 3].map((n, i) => ({
    img:     BLOCK_IMGS[i],
    alt:     t(`gamification.block${n}_alt`),
    title:   t(`gamification.block${n}_title`),
    sub:     t(`gamification.block${n}_sub`),
    color:   BLOCK_TITLE_COLORS[i],
    overlay: overlays[i],
  }))

  return (
    <section id="gamification" className="relative py-20 overflow-hidden" style={{ background: '#EEF8FF' }}>
      {/* Triangles décoratifs d'arrière-plan */}
      <Triangle className="top-610 left-6"   size={16} opacity={0.30} />
      <Triangle className="top-638 left-20"  size={10} opacity={0.18} />
      <Triangle className="bottom-4 left-32" size={13} opacity={0.20} />
      <Triangle className="top-660 right-44"  size={11} opacity={0.18} />
      <Triangle className="bottom-655 right-14" size={15} opacity={0.22} />
      <Triangle className="bottom-680 right-36" size={9}  opacity={0.15} />

      {/* Corner X decorations — matches design */}
      <XMark className="w-28 h-28 -top-4 -left-4" />
      <XMark className="w-28 h-28 -top-4 -right-4" />

      <div className="section-wrapper">
        <div className="section-header">
          <h2 className="section-title text-3xl md:text-4xl">{t('gamification.title')}</h2>
          <p
            className="section-subtitle max-w-2xl mx-auto text-base"
            dangerouslySetInnerHTML={{ __html: t('gamification.subtitle') }}
          />
        </div>

        {/* Block title sits ABOVE the card, then image/overlay card, then sub below */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {blocks.map((b) => (
            <div 
              key={b.title} 
              className="flex flex-col items-center text-center bg-white rounded-3xl shadow-card hover:shadow-card-hover
                         transition-shadow duration-200 overflow-hidden group"
            >
              <hr className="border-t border-ht-light mx-auto w-3/4 my-1" />
              <h3 className={`font-montserrat font-bold text-base ${b.color} mb-3`}>{b.title}</h3>
              <div className="card overflow-hidden group w-full">
                <div className="relative overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src={b.img}
                    alt={b.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ht-navy/20 to-transparent" />
                  {b.overlay && (
                    <div className="absolute bottom-3 left-3 right-3">{b.overlay}</div>
                  )}
                </div>
              </div>
              <p className="font-inter text-ht-text text-sm mt-3">{b.sub}</p>
              <hr className="border-t border-ht-light mx-auto w-3/4 my-1" />
            </div>
          ))}
        </div>

        {/* LEGO bricks at the bottom */}
        <div className="flex justify-center mt-10">
          <img
            src="/images/lego_bricks.png"
            alt={t('gamification.bricks_alt')}
            className="h-20 object-cover rounded-xl opacity-70"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
