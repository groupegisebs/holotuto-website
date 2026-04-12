/**
 * Tests unitaires — AISection & ChatDemo
 * - Rendu de la section et des 4 icônes de fonctionnalités
 * - Comportement de l'animation : messages apparaissent progressivement
 * - Reset automatique de l'animation
 * - Nettoyage des timers au démontage (pas de fuite mémoire)
 */
import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest'
import { act, render as rtlRender } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n.js'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import AISection from '../../../sections/AISection'

/** Rendu synchrone (i18n déjà initialisé), compatible avec vi.useFakeTimers */
function renderSync() {
  return rtlRender(
    <I18nextProvider i18n={i18n}>
      <AISection />
    </I18nextProvider>
  )
}

// ---------------------------------------------------------------------------
// Structure (sans fake timers — renderWithI18n est async)
// ---------------------------------------------------------------------------
describe('AISection — structure', () => {
  it('rend la section avec id="ai"', async () => {
    await renderWithI18n(<AISection />)
    expect(document.querySelector('section#ai')).toBeInTheDocument()
  })

  it('affiche le titre de section', async () => {
    await renderWithI18n(<AISection />)
    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('rend les 4 fonctionnalités IA', async () => {
    await renderWithI18n(<AISection />)
    expect(document.querySelectorAll('.card-feature')).toHaveLength(4)
  })

  it("l'encart (callout) est rendu", async () => {
    await renderWithI18n(<AISection />)
    expect(document.querySelector('.border-l-4.border-ht-green')).toBeInTheDocument()
  })

  it("l'image de fond du ChatDemo est rendue", async () => {
    await renderWithI18n(<AISection />)
    expect(document.querySelector('img[loading="lazy"]')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Animation (fake timers) — UN seul bloc pour éviter les conflits beforeEach
// ---------------------------------------------------------------------------
describe('AISection — ChatDemo animation & highlight (timers)', () => {
  // Initialiser i18n avec de vrais timers AVANT d'activer les faux
  beforeAll(async () => {
    await i18n.changeLanguage('fr')
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initialement aucun message de chat n\'est visible', () => {
    renderSync()
    expect(document.querySelectorAll('.animate-fade-in')).toHaveLength(0)
  })

  it('après 700ms le premier message apparaît (delay=0 + 600ms)', () => {
    renderSync()
    act(() => { vi.advanceTimersByTime(700) })
    expect(document.querySelectorAll('.animate-fade-in').length).toBeGreaterThanOrEqual(1)
  })

  it('après 1900ms le deuxième message apparaît (delay=1200 + 600ms)', () => {
    renderSync()
    act(() => { vi.advanceTimersByTime(1900) })
    expect(document.querySelectorAll('.animate-fade-in').length).toBeGreaterThanOrEqual(2)
  })

  it('après 5500ms au moins 4 messages animés sont visibles', () => {
    renderSync()
    act(() => { vi.advanceTimersByTime(5500) })
    expect(document.querySelectorAll('.animate-fade-in').length).toBeGreaterThanOrEqual(4)
  })

  /**
   * Chronologie du reset :
   *  t=0    : visible=0, effect run #1 → restart planifié à t+8000
   *  t=600  : visible→1, dep [0]→[-1], effect re-run → cleanup annule restart
   *            effect run #2 → nouveau restart planifié à t=600+8000 = 8600ms
   *  t=8600 : visible→0 (reset effectif)
   *  t=9200 : premier nouveau message (600ms après reset)
   *
   * On avance à t=9000ms (entre 8600 et 9200) pour vérifier que visible=0
   * (aucun message) sans que le prochain cycle ait commencé.
   */
  it('le reset se produit avant t=9000ms (visible revient à 0)', () => {
    renderSync()
    // Avancer jusqu'à T=9000ms en une seule passe.
    // React 18 batche tous les setVisible(1..6) + le setVisible(0) du restart
    // (T=8000ms). Le dernier état visible est 0 — le reset a bien eu lieu.
    act(() => { vi.advanceTimersByTime(9000) })
    expect(document.querySelectorAll('.animate-fade-in')).toHaveLength(0)
  })

  it('le message highlight (msg index 5, delay=5800+600ms) a la classe bg-ht-green', () => {
    renderSync()
    // Avancer jusqu'à ce que le message highlight soit visible (delay=5800 + 600 = 6400ms)
    // On prend 6500ms pour avoir une marge confortable
    act(() => { vi.advanceTimersByTime(6500) })
    // Le message highlight est le div interne avec bg-ht-green
    expect(document.querySelector('div.bg-ht-green')).toBeInTheDocument()
  })

  it('les timers sont nettoyés au démontage (pas de fuite mémoire)', () => {
    const clearTimeoutSpy  = vi.spyOn(globalThis, 'clearTimeout')
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const { unmount } = renderSync()
    unmount()
    expect(clearTimeoutSpy).toHaveBeenCalled()
    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
