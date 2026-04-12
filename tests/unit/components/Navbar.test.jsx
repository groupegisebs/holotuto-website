/**
 * Tests unitaires — Navbar
 * State : scrolled (effect de fond au scroll), open (menu mobile)
 * Hooks : useEffect (scroll listener), useTranslation
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { screen, fireEvent, act } from '@testing-library/react'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import Navbar from '../../../components/Navbar'

// Liens attendus (basés sur les hrefs — invariants entre FR/EN)
const NAV_HREFS = ['#how-it-works', '#parents', '#schools', '#ai', '#faq', '#contact']

describe('Navbar — structure de base', () => {
  beforeEach(async () => {
    window.scrollY = 0
  })

  it('rend un élément <header>', async () => {
    await renderWithI18n(<Navbar />)
    expect(document.querySelector('header')).toBeInTheDocument()
  })

  it('contient le logo avec le lien #hero', async () => {
    await renderWithI18n(<Navbar />)
    const logoLink = document.querySelector('a[href="#hero"]')
    expect(logoLink).toBeInTheDocument()
  })

  it('affiche HOLO et TUTO dans le logo', async () => {
    await renderWithI18n(<Navbar />)
    expect(screen.getByText('HOLO')).toBeInTheDocument()
    // ' TUTO' contient un espace initial — on cherche sans exact match
    expect(screen.getByText(/TUTO/)).toBeInTheDocument()
  })

  it('rend les 6 liens de navigation desktop', async () => {
    await renderWithI18n(<Navbar />)
    NAV_HREFS.forEach((href) => {
      const links = document.querySelectorAll(`a[href="${href}"]`)
      expect(links.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('les CTA "Voir une démo" (bouton) et "Essayer gratuitement" (lien) sont présents', async () => {
    await renderWithI18n(<Navbar />, { lng: 'fr' })
    // Demo → bouton qui ouvre la modale Calendly
    expect(document.querySelector('button.btn-secondary')).toBeInTheDocument()
    // Essai gratuit → lien externe vers holotuto.com
    expect(document.querySelector('a[href="https://holotuto.com"].btn-primary')).toBeInTheDocument()
  })
})

describe('Navbar — menu mobile', () => {
  it('le menu mobile est fermé par défaut', async () => {
    await renderWithI18n(<Navbar />)
    // Le drawer mobile n'est visible que quand open=true
    const mobileLinks = document.querySelectorAll('nav + div a[href="#faq"]')
    // La div de dropdown ne doit pas exister (open=false)
    expect(mobileLinks.length).toBe(0)
  })

  it('cliquer sur le hamburger ouvre le menu mobile', async () => {
    await renderWithI18n(<Navbar />)
    const hamburger = screen.getByRole('button', { name: /ouvrir le menu/i })
    fireEvent.click(hamburger)
    // Après le clic, les liens du drawer mobile apparaissent
    const drawerLinks = document.querySelectorAll('div.lg\\:hidden a')
    expect(drawerLinks.length).toBeGreaterThan(0)
  })

  it('le bouton hamburger a un aria-label "Ouvrir le menu" par défaut', async () => {
    await renderWithI18n(<Navbar />)
    const hamburger = screen.getByRole('button', { name: /ouvrir le menu/i })
    expect(hamburger).toBeInTheDocument()
  })

  it('quand le menu est ouvert, le aria-label du bouton devient "Fermer le menu"', async () => {
    await renderWithI18n(<Navbar />)
    const hamburger = screen.getByRole('button', { name: /ouvrir le menu/i })
    fireEvent.click(hamburger)
    expect(screen.getByRole('button', { name: /fermer le menu/i })).toBeInTheDocument()
  })

  it('cliquer à nouveau sur le hamburger ferme le menu', async () => {
    await renderWithI18n(<Navbar />)
    const hamburger = screen.getByRole('button', { name: /ouvrir le menu/i })
    fireEvent.click(hamburger)
    const closeBtn = screen.getByRole('button', { name: /fermer le menu/i })
    fireEvent.click(closeBtn)
    expect(screen.getByRole('button', { name: /ouvrir le menu/i })).toBeInTheDocument()
  })

  it('cliquer sur un lien du menu mobile ferme le drawer', async () => {
    await renderWithI18n(<Navbar />)
    const hamburger = screen.getByRole('button', { name: /ouvrir le menu/i })
    fireEvent.click(hamburger)
    // Trouver un lien dans le drawer (il y en a maintenant plusieurs avec le même href)
    const allFaqLinks = document.querySelectorAll('a[href="#faq"]')
    // Cliquer sur le deuxième (celui du drawer)
    fireEvent.click(allFaqLinks[allFaqLinks.length - 1])
    // Le menu doit être fermé à nouveau
    expect(screen.queryByRole('button', { name: /fermer le menu/i })).not.toBeInTheDocument()
  })
})

describe('Navbar — comportement au scroll', () => {
  it('sans scroll, la navbar n\'a pas de classe de fond blur', async () => {
    window.scrollY = 0
    const { container } = await renderWithI18n(<Navbar />)
    const header = container.querySelector('header')
    expect(header.className).not.toContain('backdrop-blur')
  })

  it('après un scroll > 16px, la navbar adopte le style "scrolled"', async () => {
    const { container } = await renderWithI18n(<Navbar />)
    act(() => {
      window.scrollY = 20
      window.dispatchEvent(new Event('scroll'))
    })
    const header = container.querySelector('header')
    expect(header.className).toContain('backdrop-blur')
  })

  it('le scroll listener est retiré au démontage du composant (pas de fuite mémoire)', async () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = await renderWithI18n(<Navbar />)
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
