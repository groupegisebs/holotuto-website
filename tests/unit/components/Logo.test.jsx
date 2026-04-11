/**
 * Tests unitaires — Logo
 * Props : size ('sm'|'md'|'lg'|'xl'), variant ('default'|'dark'|'light')
 * State : isHovered → scale-110 au hover
 */
import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import Logo from '../../../components/Logo'

describe('Logo — props size', () => {
  const sizeClasses = {
    sm: 'w-8',
    md: 'w-12',
    lg: 'w-16',
    xl: 'w-20',
  }

  Object.entries(sizeClasses).forEach(([size, cls]) => {
    it(`size="${size}" applique la classe ${cls}`, () => {
      const { container } = render(<Logo size={size} />)
      expect(container.firstChild).toHaveClass(cls)
    })
  })

  it('size par défaut est "md" (w-12)', () => {
    const { container } = render(<Logo />)
    expect(container.firstChild).toHaveClass('w-12')
  })
})

describe('Logo — props variant', () => {
  it('variant par défaut "default" applique le gradient', () => {
    const { container } = render(<Logo />)
    expect(container.firstChild).toHaveClass('bg-gradient-to-br')
    expect(container.firstChild).toHaveClass('from-ht-blue')
  })

  it('variant="dark" applique les classes dark', () => {
    const { container } = render(<Logo variant="dark" />)
    expect(container.firstChild).toHaveClass('bg-gradient-to-br')
    expect(container.firstChild).toHaveClass('text-ht-navy')
  })

  it('variant="light" applique text-white', () => {
    const { container } = render(<Logo variant="light" />)
    expect(container.firstChild).toHaveClass('text-white')
  })
})

describe('Logo — hover state', () => {
  it('sans hover, le logo a la classe scale-100', () => {
    const { container } = render(<Logo />)
    expect(container.firstChild).toHaveClass('scale-100')
    expect(container.firstChild).not.toHaveClass('scale-110')
  })

  it('au mouseenter, le logo passe à scale-110', () => {
    const { container } = render(<Logo />)
    fireEvent.mouseEnter(container.firstChild)
    expect(container.firstChild).toHaveClass('scale-110')
    expect(container.firstChild).not.toHaveClass('scale-100')
  })

  it('au mouseleave après hover, le logo revient à scale-100', () => {
    const { container } = render(<Logo />)
    fireEvent.mouseEnter(container.firstChild)
    fireEvent.mouseLeave(container.firstChild)
    expect(container.firstChild).toHaveClass('scale-100')
    expect(container.firstChild).not.toHaveClass('scale-110')
  })
})

describe('Logo — rendu SVG', () => {
  it('rend un élément SVG', () => {
    const { container } = render(<Logo />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('le SVG contient un élément <defs>', () => {
    const { container } = render(<Logo />)
    expect(container.querySelector('defs')).toBeInTheDocument()
  })
})
