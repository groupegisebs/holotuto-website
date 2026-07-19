import { useTranslation } from 'react-i18next'
import Triangle from '../components/Triangle'
import { WEB_APP_URL } from '../constants/links'

const PILLAR_IMGS = [
  '/images/section3_img1.png',
  '/images/section3_img2.png',
  '/images/section3_img3.png',
]
const PILLAR_EMOJIS = ['💡', '✍️', '📈']

export default function SolutionSection() {
  const { t } = useTranslation()

  const pillars = [1, 2, 3].map((n, i) => ({
    img:   PILLAR_IMGS[i],
    alt:   t(`solution.pillar${n}_alt`),
    label: t(`solution.pillar${n}_label`),
    desc:  t(`solution.pillar${n}_desc`),
    emoji: PILLAR_EMOJIS[i],
  }))

  return (
    <section id="solution" className="py-20" style={{ background: '#EEF8FF' }}>
      {/* Triangles décoratifs d'arrière-plan */}
      <Triangle className="top-210 left-6" color = '#07f9e1' size={16} opacity={0.30} />
      <Triangle className="top-238 left-20" color = '#07f9e1' size={10} opacity={0.22} />
      <Triangle className="bottom-240 left-32" color = '#07f9e1' size={13} opacity={0.20} />
      <Triangle className="top-260 right-44"  color = '#07f9e1' size={11} opacity={0.18} />
      <Triangle className="bottom-245 right-14" color = '#07f9e1' size={15} opacity={0.22} />
      <Triangle className="bottom-280 right-36" color = '#07f9e1' size={9}  opacity={0.15} />

      <div className="section-wrapper">        
        {/* Header: title + AI robot badge side by side */}
        <div className="section-header">
          <div className="flex items-center justify-center gap-4 flex-wrap mb-3">
            <h2 className="section-title text-3xl md:text-4xl mb-0">{t('solution.title')}</h2>
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <img
                src="/images/section3_robot.png"
                alt={t('solution.img_alt_robot')}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <p className="section-subtitle max-w-2xl mx-auto text-base">{t('solution.subtitle')}</p>
        </div>

        {/* 3 pillar cards: image → emoji overlay → plain label + desc */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.label} className="card overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Emoji badge bottom-left of image */}
                <div className="absolute bottom-3 left-3 bg-white/90 rounded-xl px-2 py-1 shadow text-xl leading-none">
                  {p.emoji}
                </div>
              </div>
              <div className="p-5 text-center">
                <p className="font-montserrat font-bold text-ht-navy text-base">{p.label}</p>
                <p className="mt-1 font-inter text-ht-text text-xs leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stat bar */}
        <div className="mt-8 max-w-lg mx-auto bg-white rounded-2xl shadow-card px-6 py-4 flex flex-wrap items-center gap-6 justify-between">
          <div className="flex items-center gap-3">
            <span className="text-ht-blue font-inter text-sm font-medium">{t('solution.stat_quiz')}</span>
            <div className="flex items-center gap-2">
              <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-ht-blue to-ht-cyan" style={{ width: '80%' }} />
              </div>
              <span className="font-montserrat font-bold text-ht-blue text-sm">8/10</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-ht-text font-inter text-sm font-medium">{t('solution.stat_progression')}</span>
            <span className="font-montserrat font-bold text-ht-green text-sm">75%</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-inter text-ht-text/70">
            <span className="flex items-center gap-1"><span className="text-ht-green">✓</span> {t('solution.stat_lesson')}</span>
            <span className="flex items-center gap-1"><span className="text-ht-green">✓</span> {t('solution.stat_exercise')}</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href={WEB_APP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary px-10 py-4 text-base shadow-lg shadow-ht-green/20">
            {t('solution.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
