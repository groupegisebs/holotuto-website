/**
 * Tests unitaires — CalendlyContext
 * - CalendlyProvider fournit isOpen, openModal, closeModal
 * - openModal passe isOpen à true
 * - closeModal passe isOpen à false
 * - useCalendly lance une erreur hors provider
 */
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalendlyProvider, useCalendly } from '../../../contexts/CalendlyContext'

// Composant de test pour accéder au contexte
function TestConsumer() {
  const { isOpen, openModal, closeModal } = useCalendly()
  return (
    <div>
      <span data-testid="status">{isOpen ? 'open' : 'closed'}</span>
      <button onClick={openModal}>open</button>
      <button onClick={closeModal}>close</button>
    </div>
  )
}

describe('CalendlyContext — provider', () => {
  it('fournit isOpen=false par défaut', () => {
    render(
      <CalendlyProvider>
        <TestConsumer />
      </CalendlyProvider>
    )
    expect(screen.getByTestId('status').textContent).toBe('closed')
  })

  it('openModal passe isOpen à true', () => {
    render(
      <CalendlyProvider>
        <TestConsumer />
      </CalendlyProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'open' }))
    expect(screen.getByTestId('status').textContent).toBe('open')
  })

  it('closeModal repasse isOpen à false', () => {
    render(
      <CalendlyProvider>
        <TestConsumer />
      </CalendlyProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'open' }))
    expect(screen.getByTestId('status').textContent).toBe('open')
    fireEvent.click(screen.getByRole('button', { name: 'close' }))
    expect(screen.getByTestId('status').textContent).toBe('closed')
  })

  it('rend les enfants sans modifier le DOM', () => {
    render(
      <CalendlyProvider>
        <span data-testid="child">enfant</span>
      </CalendlyProvider>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})

describe('CalendlyContext — useCalendly hors provider', () => {
  it('lance une erreur si utilisé hors CalendlyProvider', () => {
    const OriginalError = console.error
    console.error = () => {}  // Supprime le bruit de React dans les logs de test

    function ComponentWithoutProvider() {
      useCalendly()
      return null
    }

    expect(() => render(<ComponentWithoutProvider />)).toThrow(
      'useCalendly must be used within CalendlyProvider'
    )

    console.error = OriginalError
  })
})
