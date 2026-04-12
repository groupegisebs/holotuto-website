import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const cols = [
    {
      titleKey: 'footer.col_product',
      links: [
        { labelKey: 'footer.link_howItWorks', href: '#how-it-works', prop: '' },
        { labelKey: 'footer.link_ai',          href: '#ai', prop: '' },
        { labelKey: 'footer.link_gamification',href: '#gamification', prop: '' },
        { labelKey: 'footer.link_results',     href: '#results', prop: '' },
      ],
    },
    {
      titleKey: 'footer.col_who',
      links: [
        { labelKey: 'footer.link_parents', href: '#parents', prop: '' },
        { labelKey: 'footer.link_schools', href: '#schools', prop: '' },
      ],
    },
    {
      titleKey: 'footer.col_support',
      links: [
        { labelKey: 'footer.link_faq',     href: '#faq', prop: '' },
        { labelKey: 'footer.link_contact', href: 'mailto:contact@holotuto.com', prop: '' },
        { labelKey: 'footer.link_website', href: 'https://holotuto.com', prop: {'target': '_blank', 'rel': 'noopener noreferrer'} },
      ],
    },
  ]

  return (
    <footer className="bg-ht-navy text-white pt-16 pb-8" id="contact">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

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
                    <a
                      href={l.href}
                      {...(l.prop ? l.prop : {})}
                      className="font-inter text-sm text-white/65 hover:text-white transition-colors"
                    >
                      {t(l.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-inter text-white/35">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">{t('footer.legal')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.gdpr')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
