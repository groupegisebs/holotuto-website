/**
 * Tests unitaires — WaveDivider
 * Props : color (non utilisé sur les paths — hardcodé dans SVG), flip (scaleY(-1))
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import WaveDivider from '../../../components/WaveDivider'

describe('WaveDivider', () => {
  it('rend un élément SVG', () => {
    const { container } = render(<WaveDivider />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('le SVG a un viewBox 1440x60', () => {
    const { container } = render(<WaveDivider />)
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 1440 60')
  })

  it('sans flip, le transform vaut none', () => {
    const { container } = render(<WaveDivider />)
    const wrapper = container.firstChild
    expect(wrapper.style.transform).toBe('none')
  })

  it('avec flip=true, le transform vaut scaleY(-1)', () => {
    const { container } = render(<WaveDivider flip={true} />)
    const wrapper = container.firstChild
    expect(wrapper.style.transform).toBe('scaleY(-1)')
  })

  it('avec flip=false, le transform reste none', () => {
    const { container } = render(<WaveDivider flip={false} />)
    const wrapper = container.firstChild
    expect(wrapper.style.transform).toBe('none')
  })

  it('accepte la prop color sans crash (prop de l\'API publique)', () => {
    expect(() => render(<WaveDivider color="#EEF8FF" />)).not.toThrow()
  })

  it('le SVG a preserveAspectRatio="none"', () => {
    const { container } = render(<WaveDivider />)
    expect(container.querySelector('svg')).toHaveAttribute('preserveAspectRatio', 'none')
  })

  it('le wrapper a la classe w-full pour occuper toute la largeur', () => {
    const { container } = render(<WaveDivider />)
    expect(container.firstChild).toHaveClass('w-full')
  })
})
