import { useTranslation } from 'react-i18next'
import Triangle from '../components/Triangle'

const RESULT_IMGS = [
  '/images/section6_img1.png',
  '/images/section6_img2.png',
  '/images/section6_img3.png',
  '/images/section6_img4.png',
]

const RESULT_IMGS_FOOTER = [
  '/images/section6_img1_footer.png',
  '/images/section6_img2_footer.png',
  '/images/section6_img3_footer.png',
  '/images/section6_img4_footer.png',
]

// Barres croissantes gauche→droite avec flèche tendance rouge — copie exacte du design
const BarChartIcon = () => (
  <svg width="76" height="66" viewBox="0 0 76 66" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1"  y="50" width="11" height="14" rx="2" fill="#4CC3D6" />
    <rect x="15" y="40" width="11" height="24" rx="2" fill="#1F68E5" />
    <rect x="29" y="44" width="11" height="20" rx="2" fill="#48BE52" />
    <rect x="43" y="26" width="11" height="38" rx="2" fill="#F97316" />
    <rect x="57" y="10" width="11" height="54" rx="2" fill="#EF4444" />
    {/* Ligne tendance rouge montante */}
    <polyline
      points="6,52 20,42 34,46 48,28 62,12"
      stroke="#EF4444" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" fill="none"
    />
    {/* Flèche en haut à droite */}
    <polygon points="62,12 55,18 68,20" fill="#EF4444" />
  </svg>
)

export default function ResultsSection() {
  const { t } = useTranslation()

  const results = [1, 2, 3, 4].map((n, i) => ({
    img:   RESULT_IMGS[i],
    alt:   t(`results.card${n}_alt`),
    title: t(`results.card${n}_title`),
    sub:   t(`results.card${n}_sub`),
    foot:   RESULT_IMGS_FOOTER[i],
  }))

  return (
    <section
      id="results"
      className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(155deg, #C8EBFA 0%, #EEF8FF 50%, #ffffff 100%)' }}
    >
      {/* Triangles décoratifs d'arrière-plan */}
      <Triangle className="top-510 left-6"   size={16} opacity={0.30} />
      <Triangle className="top-538 left-20"  size={10} opacity={0.18} />
      <Triangle className="bottom-4 left-32" size={13} opacity={0.20} />
      <Triangle className="top-560 right-44"  size={11} opacity={0.18} />
      <Triangle className="bottom-555 right-14" size={15} opacity={0.22} />
      <Triangle className="bottom-580 right-36" size={9}  opacity={0.15} />

      <div className="section-wrapper relative z-10">        
        {/* En-tête */}
        <div className="section-header relative pb-2">
          {/* Icône graphique sur fond circulaire blanc */}
          <div
            className="absolute -top-2 right-0 w-24 h-24 bg-white/5 rounded-full shadow-card
                        flex items-center justify-center"
          >
            <BarChartIcon />
          </div>

          {/* Titre avec dégradé bleu→cyan */}
          <h2
            className="font-montserrat font-extrabold leading-tight text-3xl md:text-4xl lg:text-5xl"
            style={{
              background: 'linear-gradient(90deg, #1F68E5 0%, #4CC3D6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('results.title')}
          </h2>

          <p className="section-subtitle max-w-2xl mx-auto text-base mt-3">
            {t('results.subtitle')}
          </p>
        </div>

        {/* Grille 4 cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((r) => (
            <div
              key={r.title}
              className="bg-white rounded-3xl shadow-card hover:shadow-card-hover
                         transition-shadow duration-200 overflow-hidden group"
            >
              {/* Image portrait ~60% de la carte */}
              <div className="h-56 overflow-hidden">
                <img
                  src={r.img}
                  alt={r.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Texte centré */}
              <div className="px-5 pt-4 pb-0 text-center space-y-1">
                <h3 className="font-montserrat font-bold text-ht-navy text-sm leading-snug">
                  {r.title}
                </h3>
                <hr className="border-t border-ht-light mx-auto w-3/4 my-1" />
                <p className="font-inter text-ht-text text-xs leading-relaxed">
                  {r.sub}
                </p>
              </div>

              {/* Footer image */}
              <div className="w-full mt-3 overflow-hidden">
                <img
                  src={r.foot}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
