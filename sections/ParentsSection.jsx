import { useTranslation } from 'react-i18next'
import Triangle from '../components/Triangle'
import { Smile, BarChart2, CheckCircle } from 'lucide-react'

const BENEFIT_ICONS = [
  { icon: Smile,       color: 'text-ht-green', bg: 'bg-ht-mint',  key: 'benefit1' },
  { icon: BarChart2,   color: 'text-ht-blue',  bg: 'bg-ht-light', key: 'benefit2' },
  { icon: CheckCircle, color: 'text-ht-cyan',  bg: 'bg-cyan-50',  key: 'benefit3' },
]

export default function ParentsSection() {
  const { t } = useTranslation()

  // Progress widget matching the design: Progression 71% bar + Exercice terminé 8/10
  const ProgressWidget = () => (
    <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl p-4 w-44 border border-gray-100">
      <div className="mb-3">
        <div className="flex justify-between text-xs font-inter mb-1">
          <span className="text-ht-text font-medium">{t('parents.widget_title')}</span>
          <span className="text-ht-green font-semibold">71%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-ht-blue to-ht-green rounded-full" style={{ width: '71%' }} />
        </div>
      </div>
      <div className="flex justify-between text-xs font-inter">
        <span className="text-ht-text">{t('parents.widget_exercises')}</span>
        <span className="text-ht-blue font-semibold">8 / 10</span>
      </div>
    </div>
  )

  return (
    <section id="parents" className="py-20 bg-white">
      {/* Triangles décoratifs d'arrière-plan */}
      <Triangle className="top-710 left-6" color={'#14f1a0'}  size={18} opacity={0.30} />
      <Triangle className="top-738 left-20" color={'#14f1a0'} size={13} opacity={0.18} />
      <Triangle className="bottom-4 left-32" color={'#14f1a0'} size={15} opacity={0.20} />
      <Triangle className="top-760 right-44"  color={'#14f1a0'} size={14} opacity={0.18} />
      <Triangle className="bottom-755 right-14" color={'#14f1a0'} size={15} opacity={0.22} />
      <Triangle className="bottom-780 right-36" color={'#14f1a0'} size={11}  opacity={0.15} />

      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Left — photo with progress widget overlay */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/3' }}>
              <img
                src="/images/section9_img1.png"
                alt={t('parents.img_alt')}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ht-navy/20 to-transparent" />
            </div>
            <ProgressWidget />
          </div>

          {/* Right — title, subtitle, benefits, CTA */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="section-title text-3xl md:text-4xl">
              {t('parents.title_part1')}<br />
              <span className="text-ht-green">{t('parents.title_green')}</span>
            </h2>

            <p className="section-subtitle text-base">{t('parents.subtitle')}</p>

            <div className="space-y-3">
              {BENEFIT_ICONS.map((b) => {
                const Icon = b.icon
                return (
                  <div key={b.key} className="card-feature">
                    <div className={`icon-badge ${b.bg}`}>
                      <Icon size={20} className={b.color} />
                    </div>
                    <div>
                      <p className="font-montserrat font-bold text-ht-navy text-sm">{t(`parents.${b.key}_title`)}</p>
                      <p className="font-inter text-ht-text text-xs mt-0.5">{t(`parents.${b.key}_sub`)}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <a href="https://holotuto.com" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex px-8 py-4 text-base shadow-lg shadow-ht-green/20">
              {t('parents.cta')}
            </a>
          </div>
        </div>
      </div>
      {/* <WaveDivider color="#EEF8FF" /> */}
    </section>
  )
}
