/**
 * Tests unitaires — HeroSection
 * - Présence de la section et de son id
 * - Titre principal (h1) avec parties colorées
 * - Boutons CTA (#try, #demo)
 * - Badges de confiance
 * - Mockup (3/4, progression 75%)
 */
import { describe, it, expect } from 'vitest'
import { renderWithI18n } from '../../helpers/renderWithI18n'

import HeroSection from '../../../sections/HeroSection'

describe('HeroSection — structure', () => {
  it('rend la section avec id="hero"', async () => {
    await renderWithI18n(<HeroSection />)
    expect(document.querySelector('section#hero')).toBeInTheDocument()
  })

  it('affiche un titre h1', async () => {
    await renderWithI18n(<HeroSection />)
    expect(document.querySelector('h1')).toBeInTheDocument()
  })

  it('contient le lien CTA principal (myholo.holotuto.com)', async () => {
    await renderWithI18n(<HeroSection />)
    expect(document.querySelector('a[href="https://www.myholo.holotuto.com/"]')).toBeInTheDocument()
  })

  it('contient le bouton démo (ouvre la modale Calendly)', async () => {
    await renderWithI18n(<HeroSection />)
    const demoBtn = document.querySelector('button.btn-secondary')
    expect(demoBtn).toBeInTheDocument()
  })
})

describe('HeroSection — mockup pédagogique', () => {
  it('affiche la fraction "3/4" dans le mockup', async () => {
    await renderWithI18n(<HeroSection />)
    expect(document.body.textContent).toContain('3/4')
  })

  it('affiche "75%" dans la barre de progression du mockup', async () => {
    await renderWithI18n(<HeroSection />)
    expect(document.body.textContent).toContain('75%')
  })

  it('affiche le badge XP (animate-float)', async () => {
    await renderWithI18n(<HeroSection />)
    expect(document.querySelector('.animate-float')).toBeInTheDocument()
  })
})

describe('HeroSection — fond et décoration', () => {
  it('la section a une image de fond (backgroundImage)', async () => {
    await renderWithI18n(<HeroSection />)
    const section = document.querySelector('section#hero')
    expect(section.style.backgroundImage).toContain('section1_img0.svg')
  })
})
