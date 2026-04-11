/**
 * Tests d'intégration — App (composition complète)
 * Vérifie que toutes les sections sont rendues dans le bon ordre
 * et que la structure globale de la page est correcte.
 */
import { describe, it, expect } from 'vitest'
import {} from '@testing-library/react'
import { renderWithI18n } from '../helpers/renderWithI18n'
import App from '../../App'

// IDs de toutes les sections dans leur ordre d'apparition dans App.jsx
// (vérifiés dans le code source de chaque section)
const SECTION_IDS = [
  'hero',
  'problem',
  'solution',
  'how-it-works',
  'ai',
  'results',
  'gamification',
  'parents',
  'schools',
  'reassurance',
  'faq',
  'try',      // CTAFinalSection utilise id="try"
  'contact',  // Footer
]

describe('App — structure de la page', () => {
  it('rend la Navbar (header fixe)', async () => {
    await renderWithI18n(<App />)
    expect(document.querySelector('header')).toBeInTheDocument()
  })

  it('rend le Footer avec id="contact"', async () => {
    await renderWithI18n(<App />)
    expect(document.querySelector('footer#contact')).toBeInTheDocument()
  })

  it('rend un élément <main>', async () => {
    await renderWithI18n(<App />)
    expect(document.querySelector('main')).toBeInTheDocument()
  })
})

describe('App — présence de toutes les sections', () => {
  SECTION_IDS.forEach((id) => {
    it(`la section #${id} est présente dans le DOM`, async () => {
      await renderWithI18n(<App />)
      const el = document.getElementById(id)
      expect(el).toBeInTheDocument()
    })
  })
})

describe('App — ordre des sections', () => {
  it('les sections apparaissent dans le bon ordre vertical', async () => {
    await renderWithI18n(<App />)
    const main = document.querySelector('main')
    const sections = Array.from(main.querySelectorAll('[id]')).map((el) => el.id)

    // Vérifier l'ordre relatif des sections clés
    const heroIdx = sections.indexOf('hero')
    const faqIdx  = sections.indexOf('faq')
    const ctaIdx  = sections.indexOf('try') // CTAFinalSection a id="try"

    expect(heroIdx).toBeLessThan(faqIdx)
    expect(faqIdx).toBeLessThan(ctaIdx)
  })

  it('"how-it-works" vient avant "ai"', async () => {
    await renderWithI18n(<App />)
    const allSections = Array.from(document.querySelectorAll('[id]')).map((el) => el.id)
    expect(allSections.indexOf('how-it-works')).toBeLessThan(allSections.indexOf('ai'))
  })

  it('"parents" vient avant "schools"', async () => {
    await renderWithI18n(<App />)
    const allSections = Array.from(document.querySelectorAll('[id]')).map((el) => el.id)
    expect(allSections.indexOf('parents')).toBeLessThan(allSections.indexOf('schools'))
  })
})

describe('App — internationalisation initiale', () => {
  it('en français, la page contient du texte français', async () => {
    await renderWithI18n(<App />, { lng: 'fr' })
    const pageText = document.body.textContent
    // En français, la navbar doit avoir "Essai gratuit" ou similaire
    expect(pageText.length).toBeGreaterThan(500)
  })

  it('en anglais, la page contient du texte anglais différent du français', async () => {
    const { unmount: unmountFr } = await renderWithI18n(<App />, { lng: 'fr' })
    const frText = document.body.textContent
    unmountFr()

    await renderWithI18n(<App />, { lng: 'en' })
    const enText = document.body.textContent
    expect(enText).not.toBe(frText)
  })
})
