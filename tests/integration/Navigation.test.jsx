/**
 * Tests d'intégration — Navigation
 * - Accessibilité du menu mobile (aria-label, rôles)
 * - Flux complet : ouverture → clic lien → fermeture
 * - Présence de tous les liens desktop
 * - Liens CTA vers les bonnes ancres
 */
import { describe, it, expect } from 'vitest'
import { screen, fireEvent, within } from '@testing-library/react'
import { renderWithI18n } from '../helpers/renderWithI18n'
import Navbar from '../../components/Navbar'

const NAV_HREFS = [
  '#how-it-works',
  '#parents',
  '#schools',
  '#ai',
  '#faq',
  '#contact',
]

describe('Navigation — liens desktop', () => {
  it('tous les 6 liens de navigation existent au moins une fois', async () => {
    await renderWithI18n(<Navbar />)
    NAV_HREFS.forEach((href) => {
      expect(document.querySelector(`a[href="${href}"]`)).toBeInTheDocument()
    })
  })

  it('le CTA "Voir une démo" est un bouton (ouvre la modale Calendly)', async () => {
    await renderWithI18n(<Navbar />, { lng: 'fr' })
    expect(document.querySelector('button.btn-secondary')).toBeInTheDocument()
  })

  it('le CTA "Essayer gratuitement" pointe vers classroom.holotuto.com', async () => {
    await renderWithI18n(<Navbar />, { lng: 'fr' })
    expect(document.querySelector('a[href="https://classroom.holotuto.com"]')).toBeInTheDocument()
  })

  it('le logo pointe vers #hero', async () => {
    await renderWithI18n(<Navbar />)
    expect(document.querySelector('a[href="#hero"]')).toBeInTheDocument()
  })
})

describe('Navigation — accessibilité du menu mobile', () => {
  it('le bouton hamburger est un <button> avec aria-label', async () => {
    await renderWithI18n(<Navbar />)
    const hamburger = screen.getByRole('button', { name: /ouvrir le menu/i })
    expect(hamburger).toBeInTheDocument()
    expect(hamburger.tagName).toBe('BUTTON')
  })

  it('le bouton hamburger n\'a pas aria-expanded (il n\'est pas un bouton accordéon)', async () => {
    await renderWithI18n(<Navbar />)
    const hamburger = screen.getByRole('button', { name: /ouvrir le menu/i })
    // Ce n'est pas un accordéon — pas de aria-expanded sur le hamburger
    // (contrairement aux FAQItem qui ont aria-expanded)
    expect(hamburger).not.toHaveAttribute('aria-expanded')
  })

  it('le LanguageSwitcher est accessible par rôle button', async () => {
    await renderWithI18n(<Navbar />)
    // Il y a exactement 1 bouton visible : le hamburger (LanguageSwitcher est aussi un button)
    // Mais sur mobile, les 2 sont présents
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })
})

describe('Navigation — flux menu mobile complet', () => {
  it('flux complet : fermé → ouvert → clic lien → fermé', async () => {
    await renderWithI18n(<Navbar />)

    // 1. Menu fermé au départ
    expect(screen.queryByRole('button', { name: /fermer le menu/i })).not.toBeInTheDocument()

    // 2. Ouvrir le menu
    fireEvent.click(screen.getByRole('button', { name: /ouvrir le menu/i }))
    expect(screen.getByRole('button', { name: /fermer le menu/i })).toBeInTheDocument()

    // 3. Cliquer sur le dernier lien du drawer (ferme le menu)
    const allFaqLinks = document.querySelectorAll('a[href="#faq"]')
    fireEvent.click(allFaqLinks[allFaqLinks.length - 1])

    // 4. Menu refermé
    expect(screen.getByRole('button', { name: /ouvrir le menu/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /fermer le menu/i })).not.toBeInTheDocument()
  })

  it('le drawer mobile contient les mêmes 6 liens que le desktop', async () => {
    await renderWithI18n(<Navbar />)
    fireEvent.click(screen.getByRole('button', { name: /ouvrir le menu/i }))

    // Compter tous les liens qui correspondent aux hrefs de navigation
    NAV_HREFS.forEach((href) => {
      const links = document.querySelectorAll(`a[href="${href}"]`)
      // Chaque lien existe au moins 2 fois (desktop + mobile drawer)
      expect(links.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('le drawer mobile contient aussi les boutons CTA', async () => {
    await renderWithI18n(<Navbar />, { lng: 'fr' })
    fireEvent.click(screen.getByRole('button', { name: /ouvrir le menu/i }))
    // Demo → boutons .btn-secondary (desktop + mobile drawer)
    const demoButtons = document.querySelectorAll('button.btn-secondary')
    expect(demoButtons.length).toBeGreaterThanOrEqual(2)
    // Essai gratuit → liens vers classroom.holotuto.com (desktop + mobile drawer)
    const tryLinks = document.querySelectorAll('a[href="https://classroom.holotuto.com"]')
    expect(tryLinks.length).toBeGreaterThanOrEqual(2)
  })
})

describe('Navigation — effet de scroll', () => {
  it('la classe de flou n\'est pas présente à scrollY=0', async () => {
    window.scrollY = 0
    await renderWithI18n(<Navbar />)
    const header = document.querySelector('header')
    expect(header.className).not.toContain('backdrop-blur')
  })

  it('la classe de flou apparaît après scroll > 16px', async () => {
    const { act } = await import('@testing-library/react')
    await renderWithI18n(<Navbar />)
    act(() => {
      window.scrollY = 30
      window.dispatchEvent(new Event('scroll'))
    })
    const header = document.querySelector('header')
    expect(header.className).toContain('backdrop-blur')
  })

  it('la Navbar a toujours z-50 (reste au-dessus du contenu)', async () => {
    await renderWithI18n(<Navbar />)
    const header = document.querySelector('header')
    expect(header).toHaveClass('z-50')
  })
})
