import { useTranslation } from 'react-i18next'
import { Home, Star, Check } from 'lucide-react'
import { useCalendly } from '../contexts/CalendlyContext'
import { WEB_APP_URL, ANDROID_APP_URL } from '../constants/links'

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

const GooglePlayBadge = () => (
  <svg viewBox="0 0 155 46" className="h-11 w-auto" aria-hidden="true">
    <rect width="155" height="46" rx="6" fill="#000" />
    <path fill="#EA4335" d="M12.5 8.2l12.8 12.8-3.5 3.5L9 11.7c-.6-.6-.4-1.5.4-1.9l3.1-1.6z" />
    <path fill="#FBBC04" d="M32.2 18.5l-3.9-2.2-4.5 4.5 4.5 4.5 3.9-2.2c1.1-.6 1.1-2.2 0-2.8v-1.8z" />
    <path fill="#34A853" d="M12.5 37.8l9.3-9.3 3.5 3.5-12.8 6.8c-.8.4-1.6-.3-1.4-1.2l1.4.2z" />
    <path fill="#4285F4" d="M21.8 18.5L9.1 11.8c-.6-.3-1.3.1-1.3.8v20.8c0 .7.7 1.1 1.3.8l12.7-6.7-3.5-3.5 3.5-3.5z" />
    <text x="48" y="18" fill="#fff" fontFamily="Arial,sans-serif" fontSize="8" letterSpacing="0.5">DISPONIBLE SUR</text>
    <text x="48" y="34" fill="#fff" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700">Google Play</text>
  </svg>
)

export default function HeroSection() {
  const { t } = useTranslation()
  const { openModal } = useCalendly()

  const androidPoints = [
    t('hero.android_point1'),
    t('hero.android_point2'),
    t('hero.android_point3'),
  ]

  return (
    <section
      id="hero"
      className="relative pt-[4.5rem] pb-0 w-full bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: 'url(/images/section1_img0.svg)',
      }}
    >
      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center min-h-[calc(100vh-4.5rem)] pb-16 pt-8">

          {/* Colonne texte */}
          <div className="space-y-7 order-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-ht-green/10 border border-ht-green/25 px-3.5 py-1.5">
              <Home size={14} className="text-ht-green flex-shrink-0" aria-hidden="true" />
              <span className="font-inter text-xs sm:text-sm font-medium text-ht-navy">
                {t('hero.eyebrow')}
              </span>
            </div>

            <h1 className="section-title text-4xl md:text-5xl lg:text-[2.9rem] xl:text-[3.15rem]">
              {t('hero.h1_part1')}{' '}
              <span className="text-ht-blue">{t('hero.h1_blue')}</span>
              {' '}{t('hero.h1_part2')}{' '}
              <span className="text-ht-green">{t('hero.h1_green')}</span>&nbsp;?
            </h1>

            <p className="section-subtitle max-w-lg">{t('hero.subtitle')}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WEB_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-7 py-3.5 text-base shadow-lg shadow-ht-green/20"
              >
                {t('hero.cta_try')}
                <span className="ml-1.5" aria-hidden="true">›</span>
              </a>
              <button onClick={openModal} className="btn-secondary px-7 py-3.5 text-base">
                {t('hero.cta_demo')}
                <span className="ml-1.5" aria-hidden="true">›</span>
              </button>
            </div>

            {/* Carte Google Play (maquette) */}
            <div className="rounded-2xl border border-ht-green/20 bg-white/90 backdrop-blur-sm p-4 sm:p-5 shadow-sm max-w-md">
              <p className="font-montserrat font-bold text-ht-navy text-sm mb-3">
                {t('hero.android_title')}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-3">
                <a
                  href={ANDROID_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex hover:opacity-90 transition-opacity"
                  aria-label={t('hero.android_play_aria')}
                >
                  <GooglePlayBadge />
                </a>

                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/logo.svg"
                    alt=""
                    className="w-10 h-10 rounded-xl object-contain bg-ht-light p-1"
                  />
                  <div>
                    <div className="flex items-center gap-0.5 text-amber-400" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <p className="font-inter text-xs text-ht-text mt-0.5">
                      {t('hero.android_rating')}
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-1.5">
                {androidPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2 font-inter text-xs text-ht-text">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-ht-green/15 text-ht-green flex-shrink-0">
                      <Check size={10} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visuel */}
          <div className="relative order-2 min-h-[28rem]">
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
