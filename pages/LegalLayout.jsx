import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CalendlyProvider } from '../contexts/CalendlyContext'
import CalendlyModal from '../components/CalendlyModal'

export default function LegalLayout({ titleKey, subtitleKey, updatedKey, children }) {
  const { t } = useTranslation()

  return (
    <CalendlyProvider>
      <div className="min-h-screen bg-white font-inter">
        <Navbar />
        <main className="pt-24 pb-20">
          {/* Page header */}
          <div className="bg-ht-light border-b border-gray-100">
            <div className="section-wrapper py-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-inter text-ht-text hover:text-ht-blue transition-colors mb-6"
              >
                <span>←</span>
                <span>{t('legal.back_home')}</span>
              </Link>
              <h1 className="font-montserrat font-extrabold text-3xl md:text-4xl text-ht-navy mb-3">
                {t(titleKey)}
              </h1>
              {subtitleKey && (
                <p className="font-inter text-base text-ht-text max-w-2xl">
                  {t(subtitleKey)}
                </p>
              )}
              {updatedKey && (
                <p className="font-inter text-xs text-ht-text/60 mt-3">
                  {t('legal.updated')}: {t(updatedKey)}
                </p>
              )}
            </div>
          </div>

          {/* Page content */}
          <div className="section-wrapper py-12">
            <div className="max-w-3xl legal-content">
              {children}
            </div>
          </div>
        </main>
        <Footer />
        <CalendlyModal />
      </div>
    </CalendlyProvider>
  )
}
