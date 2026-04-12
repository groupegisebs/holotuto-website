import { useTranslation } from 'react-i18next'
import Triangle from '../components/Triangle'

const STEP_IMGS = [
  '/images/section4_img1.png',
  '/images/section4_img2.png',
  '/images/section4_img3.png',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=75',
]
const STEP_COLORS = ['bg-ht-blue', 'bg-ht-cyan', 'bg-ht-green', 'bg-purple-500']

// Widget Progress report superposé sur la carte 4
const ProgressWidget = ({ t }) => {
  const rows = [
    { key: 'subject_maths',    pct: 78, color: 'bg-ht-blue' },
    { key: 'subject_french',   pct: 65, color: 'bg-ht-green' },
    { key: 'subject_sciences', pct: 91, color: 'bg-purple-500' },
  ]
  return (
    <div className="absolute bottom-3 left-3 bg-white rounded-xl shadow-lg p-3 w-52 text-xs font-inter">
      <p className="font-montserrat font-bold text-ht-navy text-xs mb-2">
        {t('howItWorks.progress_report')}
      </p>
      {rows.map((r) => (
        <div key={r.key} className="flex items-center gap-2 mb-1 last:mb-0">
          <span className="text-ht-text w-14 shrink-0">{t(`howItWorks.${r.key}`)}</span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className={`${r.color} h-full rounded-full`} style={{ width: `${r.pct}%` }} />
          </div>
          <span className="text-ht-navy font-semibold w-7 text-right">{r.pct}%</span>
        </div>
      ))}
    </div>
  )
}

export default function HowItWorksSection() {
  const { t } = useTranslation()

  const steps = [1, 2, 3, 4].map((n, i) => ({
    num:     String(n),
    title:   t(`howItWorks.step${n}_title`),
    sub:     t(`howItWorks.step${n}_sub`),
    alt:     t(`howItWorks.step${n}_alt`),
    img:     STEP_IMGS[i],
    color:   STEP_COLORS[i],
    overlay: n === 4,
  }))

  return (
    <section
      id="how-it-works"
      className="py-20 bg-white w-full relative overflow-hidden"
      style={{ background: 'linear-gradient(155deg, #C8EBFA 0%, #EEF8FF 50%, #ffffff 100%)' }}
    >
      {/* Triangles décoratifs d'arrière-plan */}
      <Triangle className="top-310 left-26"   size={16} opacity={0.30} />
      <Triangle className="top-338 left-25"  size={10} opacity={0.18} />
      <Triangle className="bottom-340 left-22" size={13} opacity={0.20} />
      <Triangle className="top-360 right-24"  size={11} opacity={0.18} />
      <Triangle className="bottom-355 right-14" size={15} opacity={0.22} />
      <Triangle className="bottom-380 right-6" size={9}  opacity={0.15} />

      {/* SVG décoratif en avant-plan, couvre toute la section */}
      <div
        className="absolute h-full inset-0 bg-no-repeat bg-bottom bg-cover pointer-events-none z-10"
        style={{ backgroundImage: 'url(/images/section4_img0.svg)' }}
      />

      <div className="section-wrapper relative z-0 hover:z-20 transition-[filter] duration-300 hover:brightness-105">
        <div className="section-header">
          <h2 className="section-title text-3xl md:text-4xl">{t('howItWorks.title')}</h2>
          <p className="section-subtitle max-w-2xl mx-auto text-base">{t('howItWorks.subtitle')}</p>
        </div>

        {/* Grille décalée vers la gauche — toutes les cartes à hauteur uniforme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end lg:-translate-x-8">
          {steps.map((s) => (
            <div
              key={s.num}
              className="card overflow-hidden group flex flex-col lg:h-[20rem]"
            >
              {/* En-tête : badge numéro + titre + sous-titre */}
              <div className="p-4 flex flex-col items-start gap-2 flex-shrink-0">
                <div
                  className={`${s.color} w-9 h-9 rounded-full text-white font-montserrat font-extrabold text-base flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  {s.num}
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-ht-navy text-sm leading-snug h-10 overflow-hidden">
                    {s.title}
                  </h3>
                  <hr className="border-t border-ht-light mx-auto w-3/4 my-1" />
                  <p className="font-inter text-ht-text/70 text-xs italic mt-1">{s.sub}</p>
                </div>
              </div>

              {/* Image qui occupe le reste de la carte */}
              <div className="relative flex-1 overflow-hidden min-h-0">
                <img
                  src={s.img}
                  alt={s.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {s.overlay && <ProgressWidget t={t} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
