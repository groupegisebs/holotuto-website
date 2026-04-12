/**
 * Tests unitaires — SchoolsSection
 * - Présence de la section et de son id
 * - 3 bénéfices (card-feature)
 * - DashboardMockup (82%, alertes)
 * - CTA vers #demo
 * - WaveDivider rendu
 */
import { describe, it, expect } from 'vitest'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import SchoolsSection from '../../../sections/SchoolsSection'

describe('SchoolsSection — structure', () => {
  it('rend la section avec id="schools"', async () => {
    await renderWithI18n(<SchoolsSection />)
    expect(document.querySelector('section#schools')).toBeInTheDocument()
  })

  it('affiche un titre h2', async () => {
    await renderWithI18n(<SchoolsSection />)
    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('rend 3 bénéfices (.card-feature)', async () => {
    await renderWithI18n(<SchoolsSection />)
    expect(document.querySelectorAll('.card-feature')).toHaveLength(3)
  })

  it('contient un bouton CTA qui ouvre la modale Calendly', async () => {
    await renderWithI18n(<SchoolsSection />)
    expect(document.querySelector('button.btn-primary')).toBeInTheDocument()
  })
})

describe('SchoolsSection — DashboardMockup', () => {
  it('affiche "82%" dans le dashboard', async () => {
    await renderWithI18n(<SchoolsSection />)
    expect(document.body.textContent).toContain('82%')
  })

  it('la barre de progression du dashboard a une largeur de 82%', async () => {
    await renderWithI18n(<SchoolsSection />)
    const bar = document.querySelector('[style*="width: 82%"]')
    expect(bar).toBeInTheDocument()
  })
})

describe('SchoolsSection — image et WaveDivider', () => {
  it('contient une image lazy de la section', async () => {
    await renderWithI18n(<SchoolsSection />)
    expect(document.querySelector('img[loading="lazy"]')).toBeInTheDocument()
  })

  it('rend un WaveDivider (SVG en bas de section)', async () => {
    await renderWithI18n(<SchoolsSection />)
    expect(document.querySelector('svg')).toBeInTheDocument()
  })
})
