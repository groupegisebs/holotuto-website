/**
 * Tests unitaires — ProblemSection
 * - Présence de la section et de son id
 * - 4 cartes de problèmes
 * - Tuiles de lettres colorées avec pushpins
 */
import { describe, it, expect } from 'vitest'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import ProblemSection from '../../../sections/ProblemSection'

describe('ProblemSection — structure', () => {
  it('rend la section avec id="problem"', async () => {
    await renderWithI18n(<ProblemSection />)
    expect(document.querySelector('section#problem')).toBeInTheDocument()
  })

  it('affiche un titre h2', async () => {
    await renderWithI18n(<ProblemSection />)
    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('rend 4 cartes de problèmes', async () => {
    await renderWithI18n(<ProblemSection />)
    // Chaque carte a une image lazy
    expect(document.querySelectorAll('img[loading="lazy"]').length).toBeGreaterThanOrEqual(4)
  })

  it('chaque carte a un titre h3', async () => {
    await renderWithI18n(<ProblemSection />)
    expect(document.querySelectorAll('h3').length).toBeGreaterThanOrEqual(4)
  })
})

describe('ProblemSection — tuiles de lettres', () => {
  it('rend des SVG pushpins (aria-hidden)', async () => {
    await renderWithI18n(<ProblemSection />)
    // Chaque lettre du titre décoratif a un pushpin SVG
    const pushpins = document.querySelectorAll('svg[aria-hidden="true"]')
    expect(pushpins.length).toBeGreaterThan(0)
  })

  it('la grille est en 4 colonnes sur large écran (lg:grid-cols-4)', async () => {
    await renderWithI18n(<ProblemSection />)
    const grid = document.querySelector('.lg\\:grid-cols-4')
    expect(grid).toBeInTheDocument()
  })
})

describe('ProblemSection — icônes des cartes', () => {
  it('chaque carte a un badge icône coloré', async () => {
    await renderWithI18n(<ProblemSection />)
    // Les icônes sont dans des div ronds (bg-blue-500, bg-amber-400, etc.)
    const iconBadges = document.querySelectorAll('.rounded-full.flex-shrink-0')
    expect(iconBadges.length).toBeGreaterThanOrEqual(4)
  })
})
