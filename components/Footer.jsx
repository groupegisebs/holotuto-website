import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Smartphone } from 'lucide-react'
import { WEB_APP_URL, ANDROID_APP_URL } from '../constants/links'

export default function Footer() {
  const { t } = useTranslation()

  const cols = [
    {
      titleKey: 'footer.col_product',
      links: [
        { labelKey: 'footer.link_howItWorks', href: '/#how-it-works', external: false },
        { labelKey: 'footer.link_ai',          href: '/#ai',          external: false },
        { labelKey: 'footer.link_gamification',href: '/#gamification',external: false },
        { labelKey: 'footer.link_results',     href: '/#results',     external: false },
        { labelKey: 'footer.link_webApp',      href: WEB_APP_URL,     external: true },
        { labelKey: 'footer.link_android',     href: ANDROID_APP_URL, external: true },
      ],
    },
    {
      titleKey: 'footer.col_who',
      links: [
        { labelKey: 'footer.link_parents', href: '/#parents', external: false },
        { labelKey: 'footer.link_schools', href: '/#schools', external: false },
      ],
    },
    {
      titleKey: 'footer.col_support',
      links: [
        { labelKey: 'footer.link_faq',     href: '/#faq',                       external: false },
        { labelKey: 'footer.link_contact', href: '/contact',                     external: false },
        { labelKey: 'footer.link_website', href: 'https://holotuto.com',         external: true },
      ],
    },
    {
      titleKey: 'footer.col_legal',
      links: [
        { labelKey: 'footer.link_privacy',          href: '/privacy-policy',           external: false },
        { labelKey: 'footer.link_terms',             href: '/terms-of-use',             external: false },
        { labelKey: 'footer.link_legalNotice',       href: '/legal-notice',             external: false },
        { labelKey: 'footer.link_accountDeletion',   href: '/account-deletion',         external: false },
        { labelKey: 'footer.link_children',          href: '/children-data-protection', external: false },
        { labelKey: 'footer.link_cookies',           href: '/cookies-policy',           external: false },
      ],
    },
  ]

  return (
    <footer className="bg-ht-navy text-white pt-16 pb-8" id="contact">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <img
                  src="/images/logo.svg"
                  alt={t('nav.logo')}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="font-montserrat font-extrabold text-xl">
                <span className="text-ht-blue">HOLO</span>
                <span className="text-ht-green"> TUTO</span>
              </span>
            </div>
            <p className="font-inter text-sm text-white/60 leading-relaxed">
              {t('footer.brand_desc')}
            </p>
            <p className="font-inter text-xs text-white/40">www.holotuto.com</p>
            <a
              href={ANDROID_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-inter font-medium text-white transition-colors"
            >
              <Smartphone size={16} aria-hidden="true" />
              {t('footer.link_android')}
            </a>
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <div key={col.titleKey}>
              <h4 className="font-montserrat font-bold text-xs mb-4 uppercase tracking-widest text-white/40">
                {t(col.titleKey)}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-inter text-sm text-white/65 hover:text-white transition-colors"
                      >
                        {t(l.labelKey)}
                      </a>
                    ) : (
                      <Link
                        to={l.href}
                        className="font-inter text-sm text-white/65 hover:text-white transition-colors"
                      >
                        {t(l.labelKey)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-inter text-white/35">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex gap-5">
            <Link to="/legal-notice" className="hover:text-white transition-colors">{t('footer.link_legalNotice')}</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">{t('footer.link_privacy')}</Link>
            <Link to="/cookies-policy" className="hover:text-white transition-colors">{t('footer.link_cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
