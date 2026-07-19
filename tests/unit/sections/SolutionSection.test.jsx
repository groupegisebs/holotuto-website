/**
 * Tests unitaires — SolutionSection
 * - Présence de la section et de son id
 * - 3 piliers (images + labels)
 * - Barre de stats (8/10, 75%)
 * - CTA vers #how-it-works
 */
import { describe, it, expect } from 'vitest'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import SolutionSection from '../../../sections/SolutionSection'

describe('SolutionSection — structure', () => {
  it('rend la section avec id="solution"', async () => {
    await renderWithI18n(<SolutionSection />)
    expect(document.querySelector('section#solution')).toBeInTheDocument()
  })

  it('affiche un titre h2', async () => {
    await renderWithI18n(<SolutionSection />)
    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('rend 3 piliers (grille sm:grid-cols-3)', async () => {
    await renderWithI18n(<SolutionSection />)
    const grid = document.querySelector('.sm\\:grid-cols-3')
    expect(grid).toBeInTheDocument()
    expect(grid.children.length).toBe(3)
  })

  it('chaque pilier a une image lazy', async () => {
    await renderWithI18n(<SolutionSection />)
    expect(document.querySelectorAll('img[loading="lazy"]').length).toBeGreaterThanOrEqual(3)
  })
})

describe('SolutionSection — barre de stats', () => {
  it('affiche le score "8/10"', async () => {
    await renderWithI18n(<SolutionSection />)
    expect(document.body.textContent).toContain('8/10')
  })

  it('affiche la progression "75%"', async () => {
    await renderWithI18n(<SolutionSection />)
    expect(document.body.textContent).toContain('75%')
  })
})

describe('SolutionSection — CTA', () => {
  it('contient un lien vers myholo.holotuto.com (Découvrir la plateforme)', async () => {
    await renderWithI18n(<SolutionSection />)
    expect(document.querySelector('a[href="https://www.myholo.holotuto.com/"]')).toBeInTheDocument()
  })
})

describe('SolutionSection — badge robot IA', () => {
  it('affiche l\'image du robot IA', async () => {
    await renderWithI18n(<SolutionSection />)
    expect(document.querySelector('img[src="/images/section3_robot.png"]')).toBeInTheDocument()
  })
})
