/**
 * Tests unitaires — ParentsSection
 * - Présence de la section et de son id
 * - 3 bénéfices (card-feature)
 * - Widget de progression (71%, 8/10)
 * - CTA vers #try
 */
import { describe, it, expect } from 'vitest'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import ParentsSection from '../../../sections/ParentsSection'

describe('ParentsSection — structure', () => {
  it('rend la section avec id="parents"', async () => {
    await renderWithI18n(<ParentsSection />)
    expect(document.querySelector('section#parents')).toBeInTheDocument()
  })

  it('affiche un titre h2', async () => {
    await renderWithI18n(<ParentsSection />)
    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('rend 3 bénéfices (.card-feature)', async () => {
    await renderWithI18n(<ParentsSection />)
    expect(document.querySelectorAll('.card-feature')).toHaveLength(3)
  })

  it('contient le lien CTA vers classroom.holotuto.com', async () => {
    await renderWithI18n(<ParentsSection />)
    expect(document.querySelector('a[href="https://classroom.holotuto.com"]')).toBeInTheDocument()
  })
})

describe('ParentsSection — widget de progression', () => {
  it('affiche "71%" dans le widget', async () => {
    await renderWithI18n(<ParentsSection />)
    expect(document.body.textContent).toContain('71%')
  })

  it('affiche "8 / 10" dans le widget', async () => {
    await renderWithI18n(<ParentsSection />)
    expect(document.body.textContent).toContain('8 / 10')
  })

  it('la barre de progression a une largeur de 71%', async () => {
    await renderWithI18n(<ParentsSection />)
    const bar = document.querySelector('[style*="width: 71%"]')
    expect(bar).toBeInTheDocument()
  })
})

describe('ParentsSection — image', () => {
  it('contient une image lazy de la section', async () => {
    await renderWithI18n(<ParentsSection />)
    const img = document.querySelector('img[loading="lazy"]')
    expect(img).toBeInTheDocument()
  })
})
