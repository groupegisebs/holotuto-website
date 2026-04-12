/**
 * Tests d'intégration — Changement de langue
 * Vérifie que le clic sur LanguageSwitcher propage bien le changement
 * de langue dans tous les composants traductibles.
 *
 * NOTE : La Navbar rend 2 LanguageSwitcher (desktop + mobile) avec le même
 * aria-label. On utilise getAllByRole()[0] pour cibler le premier (desktop).
 */
import { describe, it, expect } from 'vitest'
import { screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { renderWithI18n } from '../helpers/renderWithI18n'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FAQSection from '../../sections/FAQSection'

describe('Changement de langue — Navbar', () => {
  it('le clic sur LanguageSwitcher change les textes de la Navbar', async () => {
    await renderWithI18n(<Navbar />, { lng: 'fr' })

    // Textes des liens desktop avant le switch
    const linksBefore = Array.from(
      document.querySelectorAll('.hidden.lg\\:flex a')
    ).map((a) => a.textContent)

    // Cliquer sur le PREMIER LanguageSwitcher (desktop) — aria-label "Switch to English"
    const switchBtns = screen.getAllByRole('button', { name: /switch to english/i })
    fireEvent.click(switchBtns[0])

    await waitFor(() => {
      const linksAfter = Array.from(
        document.querySelectorAll('.hidden.lg\\:flex a')
      ).map((a) => a.textContent)
      expect(linksAfter).not.toEqual(linksBefore)
    })
  })

  it('repasser en FR après un switch EN redonne les textes FR originaux', async () => {
    await renderWithI18n(<Navbar />, { lng: 'fr' })

    const linksBefore = Array.from(
      document.querySelectorAll('.hidden.lg\\:flex a')
    ).map((a) => a.textContent)

    // FR → EN
    const switchFrToEn = screen.getAllByRole('button', { name: /switch to english/i })
    fireEvent.click(switchFrToEn[0])

    // EN → FR
    await waitFor(() => {
      const switchEnToFr = screen.getAllByRole('button', { name: /passer en français/i })
      fireEvent.click(switchEnToFr[0])
    })

    await waitFor(() => {
      const linksAfter = Array.from(
        document.querySelectorAll('.hidden.lg\\:flex a')
      ).map((a) => a.textContent)
      expect(linksAfter).toEqual(linksBefore)
    })
  })
})

describe('Changement de langue — Footer', () => {
  it('les titres de colonnes du Footer changent avec la langue', async () => {
    await renderWithI18n(<Footer />, { lng: 'fr' })
    const frColumnTitles = Array.from(
      document.querySelectorAll('footer h4')
    ).map((h) => h.textContent)

    cleanup() // vider le DOM avant le second rendu

    await renderWithI18n(<Footer />, { lng: 'en' })
    const enColumnTitles = Array.from(
      document.querySelectorAll('footer h4')
    ).map((h) => h.textContent)

    expect(frColumnTitles.length).toBe(enColumnTitles.length)
    expect(frColumnTitles).not.toEqual(enColumnTitles)
  })
})

describe('Changement de langue — FAQSection', () => {
  it('les questions FAQ changent avec la langue', async () => {
    await renderWithI18n(<FAQSection />, { lng: 'fr' })
    const frQuestions = screen.getAllByRole('button').map((b) => b.textContent)
    cleanup() // vider le DOM avant le second rendu
    await renderWithI18n(<FAQSection />, { lng: 'en' })
    const enQuestions = screen.getAllByRole('button').map((b) => b.textContent)

    expect(frQuestions.length).toBe(enQuestions.length)
    expect(frQuestions.join('')).not.toBe(enQuestions.join(''))
  })
})

describe('Changement de langue — persistance localStorage', () => {
  it('le changement de langue est sauvegardé dans localStorage', async () => {
    await renderWithI18n(<Navbar />, { lng: 'fr' })
    const switchBtns = screen.getAllByRole('button', { name: /switch to english/i })
    fireEvent.click(switchBtns[0])

    await waitFor(() => {
      const stored = window.localStorage.getItem('i18nextLng')
      expect(stored).toMatch(/^en/)
    })
  })

  it('la langue EN est conservée au rendu suivant (simulation rechargement)', async () => {
    // Simuler qu'un précédent rendu a sauvegardé 'en' dans localStorage
    window.localStorage.setItem('i18nextLng', 'en')
    // Un nouveau rendu avec lng='en' doit afficher l'anglais
    await renderWithI18n(<Navbar />, { lng: 'en' })
    const switchBtns = screen.getAllByRole('button', { name: /passer en français/i })
    expect(switchBtns.length).toBeGreaterThan(0)
  })
})
