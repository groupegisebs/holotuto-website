/**
 * Tests unitaires — CalendlyModal
 * - La modale ne s'affiche pas quand isOpen=false
 * - La modale s'affiche quand isOpen=true
 * - L'iframe pointe vers l'URL Calendly correcte
 * - Le bouton fermer appelle closeModal
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n.js'
import { CalendlyContext } from '../../../contexts/CalendlyContext'
import CalendlyModal from '../../../components/CalendlyModal'

const CALENDLY_URL = 'https://calendly.com/admin-holotuto/30min'

/**
 * Rend CalendlyModal avec un contexte contrôlé manuellement.
 */
function renderModal({ isOpen, openModal = vi.fn(), closeModal = vi.fn() }) {
  return render(
    <CalendlyContext.Provider value={{ isOpen, openModal, closeModal }}>
      <I18nextProvider i18n={i18n}>
        <CalendlyModal />
      </I18nextProvider>
    </CalendlyContext.Provider>
  )
}

describe('CalendlyModal — visibilité', () => {
  it('n\'affiche pas le contenu quand isOpen=false', () => {
    renderModal({ isOpen: false })
    expect(document.querySelector('iframe')).not.toBeInTheDocument()
  })

  it('affiche le contenu quand isOpen=true', () => {
    renderModal({ isOpen: true })
    expect(document.querySelector('iframe')).toBeInTheDocument()
  })
})

describe('CalendlyModal — iframe Calendly', () => {
  it('l\'iframe pointe vers l\'URL Calendly correcte', () => {
    renderModal({ isOpen: true })
    const iframe = document.querySelector('iframe')
    expect(iframe.src).toBe(CALENDLY_URL)
  })

  it('l\'iframe a le title "Planifier une présentation"', () => {
    renderModal({ isOpen: true })
    const iframe = document.querySelector('iframe')
    expect(iframe.title).toBe('Planifier une présentation')
  })

  it('l\'iframe utilise loading="lazy"', () => {
    renderModal({ isOpen: true })
    const iframe = document.querySelector('iframe')
    expect(iframe.getAttribute('loading')).toBe('lazy')
  })
})

describe('CalendlyModal — bouton fermer', () => {
  it('le bouton fermer est accessible par aria-label', () => {
    renderModal({ isOpen: true })
    expect(screen.getByRole('button', { name: /fermer/i })).toBeInTheDocument()
  })

  it('cliquer sur le bouton fermer appelle closeModal', () => {
    const closeModal = vi.fn()
    renderModal({ isOpen: true, closeModal })
    fireEvent.click(screen.getByRole('button', { name: /fermer/i }))
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
