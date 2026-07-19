import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useCalendly } from '../contexts/CalendlyContext'
import { WEB_APP_URL, ANDROID_APP_URL } from '../constants/links'

const navLinkClass =
  'inline-flex items-center h-9 text-sm font-inter font-medium text-ht-navy/70 hover:text-ht-blue transition-colors whitespace-nowrap'

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { openModal } = useCalendly()

  const navLinks = [
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.parents'),    href: '#parents' },
    { label: t('nav.schools'),    href: '#schools' },
    { label: t('nav.features'),   href: '#ai' },
    { label: t('nav.faq'),        href: '#faq' },
    { label: t('nav.contact'),    href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/97 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white'
      }`}
    >
      <nav className="section-wrapper flex items-center h-[4.5rem] gap-4 xl:gap-8">

        {/* Logo + tagline (comme la maquette) */}
        <a href="#hero" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0">
            <img
              src="/images/logo.svg"
              alt={t('nav.logo')}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="leading-tight">
            <span className="font-montserrat font-extrabold text-lg tracking-tight block">
              <span className="text-ht-blue">HOLO</span>
              <span className="text-ht-green"> TUTO</span>
            </span>
            <span className="font-inter text-[11px] text-ht-text/55 hidden sm:block">
              {t('nav.tagline')}
            </span>
          </div>
        </a>

        {/* Liens — espacement uniforme, centrés */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-5 xl:gap-7 min-w-0">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={navLinkClass}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions : langue + 2 CTA (Android est dans le hero) */}
        <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
          <LanguageSwitcher />
          <button onClick={openModal} className="btn-secondary h-9 px-5 text-sm">
            {t('nav.seeDemo')}
          </button>
          <a
            href={WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-9 px-5 text-sm"
          >
            {t('nav.tryFree')}
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-2 ml-auto">
          <LanguageSwitcher />
          <button
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-ht-navy hover:bg-ht-light transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-5 space-y-1 shadow-lg">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center h-11 text-sm font-inter font-medium text-ht-navy hover:text-ht-blue border-b border-gray-50 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-2.5">
            <a
              href={ANDROID_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center h-11 text-sm font-montserrat font-bold rounded-full border-2 border-ht-blue/25 text-ht-navy hover:bg-ht-light transition-colors w-full"
            >
              {t('nav.downloadAndroid')}
            </a>
            <button
              onClick={() => { openModal(); setOpen(false) }}
              className="btn-secondary h-11 text-sm w-full"
            >
              {t('nav.seeDemo')}
            </button>
            <a
              href={WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary h-11 text-sm w-full"
            >
              {t('nav.tryFree')}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
