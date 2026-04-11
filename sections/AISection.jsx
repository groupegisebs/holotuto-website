import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Triangle from '../components/Triangle'
import { Lightbulb, CheckCircle, BookOpen, BarChart2 } from 'lucide-react'

const FEATURE_ICONS = [
  { icon: Lightbulb,   color: 'text-yellow-500', bg: 'bg-yellow-50', key: 'feature1' },
  { icon: CheckCircle, color: 'text-ht-cyan',    bg: 'bg-cyan-50',   key: 'feature2' },
  { icon: BookOpen,    color: 'text-ht-green',   bg: 'bg-ht-mint',   key: 'feature3' },
  { icon: BarChart2,   color: 'text-ht-blue',    bg: 'bg-ht-light',  key: 'feature4' },
]

function ChatDemo({ t }) {
  const chatMessages = [
    { from: 'ai',     text: t('ai.chat_ai1'),     delay: 0 },
    { from: 'ai',     text: t('ai.chat_ai2'),     delay: 1200 },
    { from: 'ai',     text: t('ai.chat_ai3'),     delay: 2400 },
    { from: 'user',   text: t('ai.chat_user1'),   delay: 3200 },
    { from: 'user',   text: t('ai.chat_user2'),   delay: 4000 },
    { from: 'ai',     text: t('ai.chat_ai4'),     delay: 5800, highlight: true },
    { from: 'status', text: t('ai.chat_status1'), delay: 6400 },
  ]

  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const timers = chatMessages.map((msg, i) =>
      setTimeout(() => setVisible(i + 1), msg.delay + 600)
    )
    const restart = setTimeout(() => setVisible(0), 8000)
    return () => { timers.forEach(clearTimeout); clearTimeout(restart) }
  }, [visible === 0 ? 0 : -1])

  useEffect(() => {
    const interval = setInterval(() => setVisible(0), 9500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: '600px' }}>
      <img
        src="/images/section5_img1.png"
        alt={t('ai.img_alt')}
        className="w-full h-full object-cover absolute inset-0"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ht-navy/65 via-ht-navy/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 gap-2">
        {chatMessages.map((msg, i) => {
          if (i >= visible) return null
          if (msg.from === 'status') return (
            <div key={i} className="flex justify-center">
              <span className="bg-white/95 text-ht-navy text-xs font-montserrat font-semibold px-3 py-1 rounded-full shadow">
                {msg.text}
              </span>
            </div>
          )
          return (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-start' : 'justify-end'} animate-fade-in`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs font-inter shadow ${
                msg.from === 'user'
                  ? 'bg-white/95 text-ht-navy rounded-bl-sm'
                  : msg.highlight
                    ? 'bg-ht-green text-white rounded-br-sm'
                    : 'bg-ht-blue/90 text-white rounded-br-sm'
              }`}>
                {msg.from === 'ai' && !msg.highlight && (
                  <span className="inline-flex items-center gap-1 mb-0.5 opacity-70 text-[10px]">
                    {t('ai.chat_bot_label')}
                  </span>
                )}
                <p>{msg.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function AISection() {
  const { t } = useTranslation()

  return (
    <section id="ai" className="py-20" style={{ background: '#EEF8FF' }}>
      {/* Triangles décoratifs d'arrière-plan */}
      <Triangle className="top-410 left-6"   size={16} opacity={0.30} />
      <Triangle className="top-438 left-20"  size={10} opacity={0.18} />
      <Triangle className="bottom-4 left-32" size={13} opacity={0.20} />
      <Triangle className="top-460 right-44"  size={11} opacity={0.18} />
      <Triangle className="bottom-455 right-14" size={15} opacity={0.22} />
      <Triangle className="bottom-480 right-36" size={9}  opacity={0.15} />

      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          <div className="order-2 lg:order-1">
            <ChatDemo t={t} />
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div className="eyebrow">
              <span className="font-montserrat font-extrabold">
                <span className="text-ht-blue">HOLO</span>
                <span className="text-ht-green"> TUTO</span>
              </span>
              &nbsp;{t('ai.eyebrow_suffix')}
            </div>

            <h2 className="section-title text-3xl md:text-4xl">{t('ai.title')}</h2>
            <p
              className="section-subtitle text-base"
              dangerouslySetInnerHTML={{ __html: t('ai.subtitle') }}
            />

            <div className="space-y-3">
              {FEATURE_ICONS.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.key} className="card-feature">
                    <div className={`icon-badge ${f.bg}`}>
                      <Icon size={20} className={f.color} />
                    </div>
                    <span className="font-montserrat font-semibold text-ht-navy text-sm">
                      {t(`ai.${f.key}`)}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="bg-white border-l-4 border-ht-green rounded-xl p-4 shadow-card">
              <p
                className="font-inter text-ht-text text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('ai.encart') }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
