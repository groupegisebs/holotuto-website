import { useTranslation } from 'react-i18next'
import { useCalendly } from '../contexts/CalendlyContext'
import { WEB_APP_URL } from '../constants/links'

export default function CTAFinalSection() {
  const { t } = useTranslation()
  const { openModal } = useCalendly()

  return (
    <section id="try" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #182E5C 0%, #1F68E5 60%, #4CC3D6 100%)' }}
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #48BE52, transparent)' }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4CC3D6, transparent)' }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 backdrop-blur-sm border border-white/20">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img
                src="/images/logo.svg"
                alt={t('nav.logo')}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="font-montserrat font-extrabold text-white text-sm">
              {t('cta_final.logo_label')}
            </span>
          </div>
        </div>

        <h2 className="font-montserrat font-extrabold text-white text-3xl md:text-5xl leading-tight">
          {t('cta_final.title')}
        </h2>

        <p className="font-inter text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
          {t('cta_final.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={WEB_APP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary px-10 py-4 text-base shadow-xl shadow-black/20 bg-ht-green">
            {t('cta_final.cta_try')}
          </a>
          <button onClick={openModal} className="btn-outline-white px-10 py-4 text-base">
            {t('cta_final.cta_demo')}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/50 font-inter text-sm">
          {['badge1', 'badge2', 'badge3'].map((key) => (
            <span key={key} className="flex items-center gap-1.5">
              <span className="text-ht-green">✓</span>
              {t(`cta_final.${key}`)}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
