/**
 * Tests unitaires — Triangle
 * Composant décoratif réutilisable (CSS border-trick)
 * - Rendu sans erreur
 * - Props size, color, opacity, className appliquées
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Triangle from '../../../components/Triangle'

describe('Triangle — rendu de base', () => {
  it('se rend sans erreur avec les props par défaut', () => {
    expect(() => render(<Triangle />)).not.toThrow()
  })

  it('rend un div (pas un SVG)', () => {
    const { container } = render(<Triangle />)
    expect(container.querySelector('div')).toBeInTheDocument()
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('applique les classes CSS absolute et pointer-events-none', () => {
    const { container } = render(<Triangle />)
    const el = container.firstChild
    expect(el.className).toContain('absolute')
    expect(el.className).toContain('pointer-events-none')
  })
})

describe('Triangle — props', () => {
  it('la prop className est ajoutée à la div', () => {
    const { container } = render(<Triangle className="top-10 left-4" />)
    const el = container.firstChild
    expect(el.className).toContain('top-10')
    expect(el.className).toContain('left-4')
  })

  it('la prop size contrôle les dimensions CSS (borderLeft, borderRight, borderBottom)', () => {
    const { container } = render(<Triangle size={30} />)
    const el = container.firstChild
    expect(el.style.borderLeft).toContain('30px')
    expect(el.style.borderRight).toContain('30px')
    expect(el.style.borderBottom).toContain('48px')  // 30 * 1.6
  })

  it('la prop color est appliquée en inline style', () => {
    const { container } = render(<Triangle color="#FF0000" />)
    const el = container.firstChild
    expect(el.style.borderBottom).toContain('rgb(255, 0, 0)')
  })

  it('la prop opacity est appliquée en inline style', () => {
    const { container } = render(<Triangle opacity={0.5} />)
    const el = container.firstChild
    expect(el.style.opacity).toBe('0.5')
  })

  it('width et height sont 0 (triangle CSS pur)', () => {
    const { container } = render(<Triangle />)
    const el = container.firstChild
    expect(el.style.width).toBe('0px')
    expect(el.style.height).toBe('0px')
  })
})
