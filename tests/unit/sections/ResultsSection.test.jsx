/**
 * Tests unitaires — ResultsSection
 * - Présence de la section et de son id
 * - 4 cartes de résultats
 * - SVG BarChartIcon (aria-hidden)
 * - Triangles décoratifs
 */
import { describe, it, expect } from 'vitest'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import ResultsSection from '../../../sections/ResultsSection'

describe('ResultsSection — structure', () => {
  it('rend la section avec id="results"', async () => {
    await renderWithI18n(<ResultsSection />)
    expect(document.querySelector('section#results')).toBeInTheDocument()
  })

  it('affiche un titre h2', async () => {
    await renderWithI18n(<ResultsSection />)
    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('rend 4 cartes résultats (grille lg:grid-cols-4)', async () => {
    await renderWithI18n(<ResultsSection />)
    const grid = document.querySelector('.lg\\:grid-cols-4')
    expect(grid).toBeInTheDocument()
    expect(grid.children.length).toBe(4)
  })

  it('chaque carte a un titre h3', async () => {
    await renderWithI18n(<ResultsSection />)
    expect(document.querySelectorAll('h3').length).toBe(4)
  })
})

describe('ResultsSection — images', () => {
  it('les cartes ont des images lazy (au moins 4)', async () => {
    await renderWithI18n(<ResultsSection />)
    // 4 images portrait + 4 images footer = 8 images lazy
    expect(document.querySelectorAll('img[loading="lazy"]').length).toBeGreaterThanOrEqual(4)
  })
})

describe('ResultsSection — décoration', () => {
  it('le SVG BarChartIcon est présent (aria-hidden)', async () => {
    await renderWithI18n(<ResultsSection />)
    const svg = document.querySelector('svg[aria-hidden="true"]')
    expect(svg).toBeInTheDocument()
  })
})
