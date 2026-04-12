import { useTranslation } from 'react-i18next'
import Triangle from '../components/Triangle'
import { Shield, Heart, Lock, Home } from 'lucide-react'

const ITEM_META = [
  { icon: Shield, color: 'text-ht-blue',    bg: 'bg-ht-light',  key: 'item1' },
  { icon: Heart,  color: 'text-ht-green',   bg: 'bg-ht-mint',   key: 'item2' },
  { icon: Lock,   color: 'text-purple-500', bg: 'bg-purple-50', key: 'item3' },
  { icon: Home,   color: 'text-ht-cyan',    bg: 'bg-cyan-50',   key: 'item4' },
]

export default function ReassuranceSection() {
  const { t } = useTranslation()

  return (
    <section id="reassurance" className="py-20 bg-white">
      {/* Triangles décoratifs d'arrière-plan */}
      <Triangle className="top-910 left-6"   size={16} opacity={0.30} />
      <Triangle className="top-938 left-20"  size={10} opacity={0.18} />
      <Triangle className="bottom-4 left-32" size={13} opacity={0.20} />
      <Triangle className="top-960 right-44"  size={11} opacity={0.18} />
      <Triangle className="bottom-955 right-14" size={15} opacity={0.22} />
      <Triangle className="bottom-980 right-36" size={9}  opacity={0.15} />

      <div className="section-wrapper">
        <div className="section-header">
          <h2 className="section-title text-3xl md:text-4xl">{t('reassurance.title')}</h2>
          <p className="section-subtitle max-w-2xl mx-auto text-base">{t('reassurance.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEM_META.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.key} className="card p-6 space-y-4 text-center hover:shadow-card-hover transition-shadow">
                <div className={`icon-badge ${item.bg} mx-auto w-14 h-14`}>
                  <Icon size={26} className={item.color} />
                </div>
                <h3 className="font-montserrat font-bold text-ht-navy text-sm leading-snug">
                  {t(`reassurance.${item.key}_title`)}
                </h3>
                <p className="font-inter text-ht-text text-xs leading-relaxed">
                  {t(`reassurance.${item.key}_sub`)}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      {/* <WaveDivider color="#EEF8FF" /> */}
    </section>
  )
}
