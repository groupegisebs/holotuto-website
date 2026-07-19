import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation()
  const current = i18n.language?.slice(0, 2) || 'fr'

  const toggle = () => {
    i18n.changeLanguage(current === 'fr' ? 'en' : 'fr')
  }

  return (
    <button
      onClick={toggle}
      aria-label={current === 'fr' ? 'Switch to English' : 'Passer en français'}
      className={`inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-full border-2 transition-all duration-200
        border-ht-blue/25 text-ht-navy hover:border-ht-blue hover:bg-ht-light
        font-montserrat font-bold text-sm tracking-wide ${className}`}
    >
      {/* Affiche la langue courante (comme la maquette) */}
      <span>{current === 'fr' ? 'FR' : 'EN'}</span>
      <span className="text-[10px] opacity-60" aria-hidden="true">▾</span>
    </button>
  )
}
