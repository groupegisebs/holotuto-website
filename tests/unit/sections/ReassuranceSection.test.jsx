/**
 * Tests unitaires — ReassuranceSection
 * - Présence de la section et de son id
 * - 4 items de réassurance (Shield, Heart, Lock, Home)
 * - Chaque item a un titre h3
 */
import { describe, it, expect } from 'vitest'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import ReassuranceSection from '../../../sections/ReassuranceSection'

describe('ReassuranceSection — structure', () => {
  it('rend la section avec id="reassurance"', async () => {
    await renderWithI18n(<ReassuranceSection />)
    expect(document.querySelector('section#reassurance')).toBeInTheDocument()
  })

  it('affiche un titre h2', async () => {
    await renderWithI18n(<ReassuranceSection />)
    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('rend 4 items de réassurance', async () => {
    await renderWithI18n(<ReassuranceSection />)
    expect(document.querySelectorAll('h3').length).toBe(4)
  })

  it('la grille est en 4 colonnes sur large écran (lg:grid-cols-4)', async () => {
    await renderWithI18n(<ReassuranceSection />)
    expect(document.querySelector('.lg\\:grid-cols-4')).toBeInTheDocument()
  })
})

describe('ReassuranceSection — icônes', () => {
  it('chaque item a un badge icône (icon-badge)', async () => {
    await renderWithI18n(<ReassuranceSection />)
    expect(document.querySelectorAll('.icon-badge').length).toBe(4)
  })

  it('les icônes SVG Lucide sont rendus (4 icônes)', async () => {
    await renderWithI18n(<ReassuranceSection />)
    // Lucide React rend des SVG
    expect(document.querySelectorAll('svg').length).toBeGreaterThanOrEqual(4)
  })
})

describe('ReassuranceSection — fond', () => {
  it('la section a le fond blanc (bg-white)', async () => {
    await renderWithI18n(<ReassuranceSection />)
    const section = document.querySelector('section#reassurance')
    expect(section.className).toContain('bg-white')
  })
})
