/**
 * Tests unitaires — Footer
 * - Affichage de l'année dynamique dans le copyright
 * - Colonnes de navigation (3 colonnes)
 * - Liens externes (contact, site web)
 * - Liens légaux
 */
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import Footer from '../../../components/Footer'

describe('Footer — structure générale', () => {
  it('rend un élément <footer> avec id="contact"', async () => {
    await renderWithI18n(<Footer />)
    expect(document.querySelector('footer#contact')).toBeInTheDocument()
  })

  it('affiche "HOLO" et "TUTO" dans le branding', async () => {
    await renderWithI18n(<Footer />)
    expect(screen.getAllByText('HOLO')[0]).toBeInTheDocument()
    // ' TUTO' contient un espace initial — on cherche par regex
    expect(screen.getAllByText(/TUTO/)[0]).toBeInTheDocument()
  })

  it('affiche www.holotuto.com', async () => {
    await renderWithI18n(<Footer />)
    expect(screen.getByText('www.holotuto.com')).toBeInTheDocument()
  })
})

describe('Footer — copyright dynamique', () => {
  it('contient l\'année courante dans le texte de copyright', async () => {
    await renderWithI18n(<Footer />)
    const year = String(new Date().getFullYear())
    // Le texte complet peut varier selon la traduction, mais l'année doit apparaître
    const footer = document.querySelector('footer')
    expect(footer.textContent).toContain(year)
  })
})

describe('Footer — liens de navigation', () => {
  it('contient le lien #how-it-works', async () => {
    await renderWithI18n(<Footer />)
    expect(document.querySelector('a[href="#how-it-works"]')).toBeInTheDocument()
  })

  it('contient le lien #ai (fonctionnalités IA)', async () => {
    await renderWithI18n(<Footer />)
    expect(document.querySelector('a[href="#ai"]')).toBeInTheDocument()
  })

  it('contient le lien #gamification', async () => {
    await renderWithI18n(<Footer />)
    expect(document.querySelector('a[href="#gamification"]')).toBeInTheDocument()
  })

  it('contient le lien #results', async () => {
    await renderWithI18n(<Footer />)
    expect(document.querySelector('a[href="#results"]')).toBeInTheDocument()
  })

  it('contient le lien #parents', async () => {
    await renderWithI18n(<Footer />)
    expect(document.querySelector('a[href="#parents"]')).toBeInTheDocument()
  })

  it('contient le lien #schools', async () => {
    await renderWithI18n(<Footer />)
    expect(document.querySelector('a[href="#schools"]')).toBeInTheDocument()
  })

  it('contient le lien #faq', async () => {
    await renderWithI18n(<Footer />)
    expect(document.querySelector('a[href="#faq"]')).toBeInTheDocument()
  })
})

describe('Footer — liens externes', () => {
  it('contient un lien mailto:contact@holotuto.com', async () => {
    await renderWithI18n(<Footer />)
    expect(document.querySelector('a[href="mailto:contact@holotuto.com"]')).toBeInTheDocument()
  })

  it('contient un lien vers https://holotuto.com', async () => {
    await renderWithI18n(<Footer />)
    expect(document.querySelector('a[href="https://holotuto.com"]')).toBeInTheDocument()
  })
})

describe('Footer — liens légaux', () => {
  it('rend 3 liens légaux (Mentions légales, Confidentialité, RGPD)', async () => {
    await renderWithI18n(<Footer />, { lng: 'fr' })
    const footer = document.querySelector('footer')
    // Les 3 liens légaux pointent tous vers "#"
    const legalLinks = footer.querySelectorAll('a[href="#"]')
    expect(legalLinks.length).toBe(3)
  })
})

describe('Footer — internationalisation', () => {
  it('les titres des colonnes changent en anglais', async () => {
    const { unmount } = await renderWithI18n(<Footer />, { lng: 'fr' })
    const frText = document.querySelector('footer').textContent
    unmount()
    await renderWithI18n(<Footer />, { lng: 'en' })
    const enText = document.querySelector('footer').textContent
    // Le contenu doit être différent entre les deux langues
    expect(frText).not.toBe(enText)
  })
})
