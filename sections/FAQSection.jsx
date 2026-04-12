import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import WaveDivider from '../components/WaveDivider'
import { ChevronDown } from 'lucide-react'

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
      <button
        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-ht-light/50 transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-ht-light text-ht-blue font-montserrat font-bold text-xs flex items-center justify-center flex-shrink-0">
            {index + 1}
          </span>
          <span className="font-montserrat font-semibold text-ht-navy text-sm">{q}</span>
        </span>
        <ChevronDown
          size={18}
          className={`text-ht-blue flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1 font-inter text-ht-text text-sm leading-relaxed border-t border-gray-50">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQSection() {
  const { t } = useTranslation()

  const faqs = [1, 2, 3, 4, 5, 6].map((n) => ({
    q: t(`faq.q${n}`),
    a: t(`faq.a${n}`),
  }))

  return (
    <section id="faq" className="py-20" style={{ background: '#EEF8FF' }}>
      <div className="section-wrapper">
        <div className="section-header">
          <h2 className="section-title text-3xl md:text-4xl">{t('faq.title')}</h2>
          <p className="section-subtitle max-w-xl mx-auto text-base">{t('faq.subtitle')}</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
      {/* <WaveDivider color="#ffffff" /> */}
    </section>
  )
}
