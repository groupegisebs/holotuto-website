import { useTranslation } from 'react-i18next'
import Triangle from '../components/Triangle'
import { GraduationCap, Search, Users } from 'lucide-react'
import { useCalendly } from '../contexts/CalendlyContext'

const BENEFIT_ICONS = [
  { icon: GraduationCap, color: 'text-ht-green', bg: 'bg-ht-mint',  key: 'benefit1' },
  { icon: Search,        color: 'text-ht-blue',  bg: 'bg-ht-light', key: 'benefit2' },
  { icon: Users,         color: 'text-ht-cyan',  bg: 'bg-cyan-50',  key: 'benefit3' },
]

export default function SchoolsSection() {
  const { t } = useTranslation()
  const { openModal } = useCalendly()

  const DashboardMockup = () => (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-4 space-y-3 mt-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-inter text-xs text-ht-text">{t('schools.dashboard_student')}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-ht-green rounded-full" style={{ width: '82%' }} />
            </div>
            <span className="font-montserrat font-bold text-ht-green text-sm">82%</span>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 text-center">
          <span className="text-orange-500 text-lg">!</span>
          <p className="font-inter text-xs text-orange-600 font-medium mt-0.5">{t('schools.dashboard_alerts')}</p>
          <p className="font-inter text-[10px] text-orange-400">{t('schools.dashboard_needs')}</p>
        </div>
      </div>
    </div>
  )

  return (
    <section id="schools" className="py-20" style={{ background: '#EEF8FF' }}>
      {/* Triangles décoratifs d'arrière-plan */}
      <Triangle className="top-810 left-6"   size={16} opacity={0.30} />
      <Triangle className="top-838 left-20"  size={10} opacity={0.18} />
      <Triangle className="bottom-4 left-32" size={13} opacity={0.20} />
      <Triangle className="top-860 right-44"  size={11} opacity={0.18} />
      <Triangle className="bottom-855 right-14" size={15} opacity={0.22} />
      <Triangle className="bottom-880 right-36" size={9}  opacity={0.15} />

      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          <div className="space-y-4 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/3' }}>
              <img
                src="/images/section10_img1.png"
                alt={t('schools.img_alt')}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ht-navy/15 to-transparent" />
            </div>
            <DashboardMockup />
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div className="eyebrow">{t('schools.eyebrow')}</div>

            <h2 className="section-title text-3xl md:text-4xl">
              {t('schools.title_part1')}{' '}
              <span className="text-ht-blue">{t('schools.title_blue')}</span>
            </h2>

            <p className="section-subtitle text-base">{t('schools.subtitle')}</p>

            <div className="space-y-3">
              {BENEFIT_ICONS.map((b) => {
                const Icon = b.icon
                return (
                  <div key={b.key} className="card-feature">
                    <div className={`icon-badge ${b.bg}`}>
                      <Icon size={20} className={b.color} />
                    </div>
                    <div>
                      <p className="font-montserrat font-bold text-ht-navy text-sm">{t(`schools.${b.key}_title`)}</p>
                      <p className="font-inter text-ht-text text-xs mt-0.5 italic">{t(`schools.${b.key}_sub`)}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button onClick={openModal} className="btn-primary inline-flex px-8 py-4 text-base shadow-lg shadow-ht-green/20">
              {t('schools.cta')}
            </button>
          </div>
        </div>
      </div>
      {/* <WaveDivider color="#ffffff" /> */}
    </section>
  )
}
