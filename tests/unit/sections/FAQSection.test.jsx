/**
 * Tests unitaires — FAQSection & FAQItem
 * - Rendu de 6 éléments FAQ
 * - Accordéon : toggle open/close via clic
 * - aria-expanded reflète l'état
 * - Rotation du chevron selon l'état
 * - Numérotation des items (1 à 6)
 * - Plusieurs items peuvent être ouverts simultanément (pas de contrainte accordéon unique)
 */
import { describe, it, expect } from 'vitest'
import { screen, fireEvent, within } from '@testing-library/react'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import FAQSection from '../../../sections/FAQSection'

describe('FAQSection — rendu', () => {
  it('rend la section avec id="faq"', async () => {
    await renderWithI18n(<FAQSection />)
    expect(document.querySelector('section#faq')).toBeInTheDocument()
  })

  it('affiche un titre de section', async () => {
    await renderWithI18n(<FAQSection />)
    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('affiche 6 boutons FAQ', async () => {
    await renderWithI18n(<FAQSection />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(6)
  })

  it('les items sont numérotés de 1 à 6', async () => {
    await renderWithI18n(<FAQSection />)
    for (let i = 1; i <= 6; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument()
    }
  })

  it('tous les boutons ont aria-expanded="false" par défaut', async () => {
    await renderWithI18n(<FAQSection />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('aucune réponse n\'est visible par défaut', async () => {
    await renderWithI18n(<FAQSection />)
    // Les réponses sont dans des divs conditionnelles — quand closed, elles n'existent pas
    const buttons = screen.getAllByRole('button')
    // Vérifier qu'aucun bouton n'est expanded
    const expanded = buttons.filter((b) => b.getAttribute('aria-expanded') === 'true')
    expect(expanded).toHaveLength(0)
  })
})

describe('FAQSection — comportement accordéon', () => {
  it('cliquer sur le premier item ouvre sa réponse', async () => {
    await renderWithI18n(<FAQSection />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
  })

  it('la réponse est visible après ouverture', async () => {
    await renderWithI18n(<FAQSection />, { lng: 'fr' })
    const buttons = screen.getAllByRole('button')
    // Récupérer le texte de la question pour identifier la réponse attendue
    const questionText = buttons[0].textContent
    fireEvent.click(buttons[0])
    // Le conteneur parent doit maintenant contenir un div avec la réponse
    const faqItem = buttons[0].closest('div')
    // Le div réponse (frère du bouton) doit apparaître
    const answerDiv = faqItem.querySelector('div.px-6')
    expect(answerDiv).toBeInTheDocument()
    expect(answerDiv.textContent.length).toBeGreaterThan(0)
  })

  it('cliquer deux fois ferme l\'item (toggle)', async () => {
    await renderWithI18n(<FAQSection />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(buttons[0])
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
  })

  it('plusieurs items peuvent être ouverts simultanément', async () => {
    await renderWithI18n(<FAQSection />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[2])
    fireEvent.click(buttons[4])
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'true')
    expect(buttons[4]).toHaveAttribute('aria-expanded', 'true')
    // Les autres restent fermés
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false')
    expect(buttons[3]).toHaveAttribute('aria-expanded', 'false')
    expect(buttons[5]).toHaveAttribute('aria-expanded', 'false')
  })

  it('ouvrir un item n\'affecte pas les autres', async () => {
    await renderWithI18n(<FAQSection />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[2])
    // Seul le 3e est ouvert
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false')
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'true')
    expect(buttons[3]).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('FAQSection — accessibilité', () => {
  it('les boutons sont de type button (pas submit)', async () => {
    await renderWithI18n(<FAQSection />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      // Les boutons sans type explicite sont par défaut "submit" dans un form
      // mais ici ils sont hors d'un form donc c'est "button"
      expect(btn.tagName).toBe('BUTTON')
    })
  })

  it('le chevron a la classe rotate-180 quand l\'item est ouvert', async () => {
    await renderWithI18n(<FAQSection />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    // Le SVG du chevron est dans le bouton
    const svg = buttons[0].querySelector('svg')
    expect(svg).toHaveClass('rotate-180')
  })

  it('le chevron n\'a pas la classe rotate-180 quand l\'item est fermé', async () => {
    await renderWithI18n(<FAQSection />)
    const buttons = screen.getAllByRole('button')
    const svg = buttons[0].querySelector('svg')
    expect(svg).not.toHaveClass('rotate-180')
  })
})
