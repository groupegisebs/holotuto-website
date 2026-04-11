import { useTranslation } from 'react-i18next'
import { useCalendly } from '../contexts/CalendlyContext'

const ScreenMockup = ({ t }) => (
  <div className="bg-white/80 rounded-2xl shadow-xl p-4 w-52 text-left border border-gray-100">
    <p className="font-montserrat font-bold text-ht-navy text-xs mb-2">{t('hero.mockup_exercise')}</p>
    <div className="bg-ht-light rounded-xl p-3 mb-2 text-center">
      <span className="font-montserrat font-extrabold text-ht-navy text-2xl">3/4</span>
    </div>
    <div className="space-y-1.5 text-xs font-inter">
      {[
        { label: 'A. 0.25', correct: true },
        { label: 'B. 34', correct: false },
        { label: 'C. 3.4', correct: false },
      ].map((opt) => (
        <div key={opt.label} className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${opt.correct ? 'bg-ht-green' : 'bg-gray-200'}`} />
          <span className={opt.correct ? 'text-ht-navy font-semibold' : 'text-ht-text'}>
            {opt.label}{opt.correct ? ' ✓' : ''}
          </span>
        </div>
      ))}
    </div>
    <div className="mt-2 pt-2 border-t border-gray-100">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-ht-blue to-ht-green rounded-full" style={{ width: '75%' }} />
        </div>
        <span className="text-ht-green font-montserrat font-bold text-xs">75%</span>
      </div>
    </div>
  </div>
)

const XPBadge = ({ t }) => (
  <div className="absolute -top-4 -right-4 bg-ht-green text-white rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2 animate-float z-10">
    <span className="text-lg">⭐</span>
    <div>
      <p className="font-montserrat font-bold text-xs leading-none">{t('hero.xp_label')}</p>
      <p className="font-inter text-[10px] text-white/80 mt-0.5">{t('hero.xp_sub')}</p>
    </div>
  </div>
)

export default function HeroSection() {
  const { t } = useTranslation()
  const { openModal } = useCalendly()

  return (
    <section
      id="hero"
      className="relative pt-20 pb-0 w-full h-full object-contain bg-no-repeat bg-center bg-cover relative"
      style={{
        backgroundImage: 'url(/images/section1_img0.svg)',
      }}
    >

      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center min-h-[calc(100vh-5rem)] pb-20">

          {/* Texte */}
          <div className="space-y-10 order-1 lg:order-1">
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-ht-green animate-pulse" />
              {t('hero.eyebrow')}
            </div>

            <h1 className="section-title text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.2rem] bg-white/60 rounded-xl px-3 py-2">
              {t('hero.h1_part1')}{' '}
              <span className="text-ht-blue">{t('hero.h1_blue')}</span>
              {' '}{t('hero.h1_part2')}{' '}
              <span className="text-ht-green">{t('hero.h1_green')}</span>&nbsp;?
            </h1>

            <p className="section-subtitle max-w-lg bg-white/60 rounded-xl px-3 py-2">{t('hero.subtitle')}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://holotuto.com" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 text-base shadow-lg shadow-ht-green/20">
                {t('hero.cta_try')}
              </a>
              <button onClick={openModal} className="btn-secondary px-8 py-4 text-base">
                {t('hero.cta_demo')}
              </button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-inter text-ht-text/70">
              <span className="flex items-center gap-1.5">
                <span className="text-ht-green font-bold">✓</span>
                {t('hero.badge_level')}
              </span>
              <span className="hidden sm:inline text-ht-text/25">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-ht-blue font-bold">✓</span>
                {t('hero.badge_families')}
              </span>
            </div>
          </div>

          {/* Visuel */}
          <div className="relative order-2 lg:order-2 min-h-[28rem]">
            {/* Positioned over the laptop screen in the background SVG */}
            <div className="absolute bottom-[45%] right-[60%]">
              <div className="relative">
                <XPBadge t={t} />
                <ScreenMockup t={t} />
              </div>
            </div>
          </div> 
          
        </div>
      </div>
    </section>
  )
}
