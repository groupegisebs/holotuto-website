/**
 * Tests unitaires — HowItWorksSection & ProgressWidget
 *
 * Design de référence : public/design/PageWeb_Section_4.png
 *
 * Règles de mise en page :
 *  - Fond SVG (section4_img0.svg) EN AVANT-PLAN (z-10), couvre toute la section
 *  - Grille en z-0, décalée à gauche (lg:-translate-x-8), items-end
 *  - Toutes les cartes à hauteur uniforme (lg:h-[20rem])
 *  - 4 étapes numérotées avec badges colorés
 *  - Seule l'étape 4 affiche le ProgressWidget
 *  - Barres de progression : Maths 78%, Français 65%, Sciences 91%
 *  - Images lazy-loaded
 */
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import HowItWorksSection from '../../../sections/HowItWorksSection'

// ---------------------------------------------------------------------------
// Structure générale
// ---------------------------------------------------------------------------
describe('HowItWorksSection — structure générale', () => {
  it('rend la section avec id="how-it-works"', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(document.querySelector('section#how-it-works')).toBeInTheDocument()
  })

  it('affiche un titre h2', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('rend 4 étapes numérotées (badges 1 à 4)', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('chaque étape a un titre h3', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(document.querySelectorAll('h3').length).toBe(4)
  })

  it('chaque étape a une image lazy-loaded', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(document.querySelectorAll('img[loading="lazy"]').length).toBeGreaterThanOrEqual(4)
  })

  it('les étapes 1-3 n\'ont pas de ProgressWidget', async () => {
    await renderWithI18n(<HowItWorksSection />, { lng: 'fr' })
    // Le ProgressWidget est unique — uniquement sur l'étape 4 (titre FR)
    expect(screen.queryAllByText('Rapport de progression')).toHaveLength(1)
  })
})

// ---------------------------------------------------------------------------
// Layout conforme à la maquette PageWeb_Section_4.png
// ---------------------------------------------------------------------------
describe('HowItWorksSection — layout (conformité maquette)', () => {
  it('le fond SVG est positionné en avant-plan des cartes (z-index > 0)', async () => {
    await renderWithI18n(<HowItWorksSection />)
    // Le div de fond a une classe z-* et contient l'url du SVG
    const bgDiv = Array.from(document.querySelectorAll('div.absolute')).find(
      (el) =>
        el.style.backgroundImage &&
        el.style.backgroundImage.includes('section4_img0.svg') &&
        el.className.match(/\bz-\d+\b/)
    )
    expect(bgDiv).toBeInTheDocument()
  })

  it('le fond SVG couvre toute la section (absolute inset-0)', async () => {
    await renderWithI18n(<HowItWorksSection />)
    const bgDiv = Array.from(document.querySelectorAll('div.absolute.inset-0')).find(
      (el) => el.style.backgroundImage && el.style.backgroundImage.includes('section4_img0.svg')
    )
    expect(bgDiv).toBeInTheDocument()
  })

  it('le fond SVG a pointer-events-none (n\'intercepte pas les clics)', async () => {
    await renderWithI18n(<HowItWorksSection />)
    const bgDiv = Array.from(document.querySelectorAll('div.pointer-events-none')).find(
      (el) => el.style.backgroundImage && el.style.backgroundImage.includes('section4_img0.svg')
    )
    expect(bgDiv).toBeInTheDocument()
  })

  it('la grille est décalée à gauche (lg:-translate-x-8)', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(document.querySelector('.lg\\:-translate-x-8')).toBeInTheDocument()
  })

  it('la grille utilise items-end (cartes alignées en bas)', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(document.querySelector('.items-end')).toBeInTheDocument()
  })

  it('toutes les cartes ont la même hauteur uniforme (lg:h-[20rem])', async () => {
    await renderWithI18n(<HowItWorksSection />)
    const allCards = document.querySelectorAll('.card.overflow-hidden')
    expect(allCards.length).toBe(4)
    const uniformCards = Array.from(allCards).filter(
      (c) => c.className.includes('lg:h-[20rem]')
    )
    expect(uniformCards.length).toBe(4)
  })

  it('la grille est en 4 colonnes sur large écran (lg:grid-cols-4)', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(document.querySelector('.lg\\:grid-cols-4')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// ProgressWidget (étape 4)
// ---------------------------------------------------------------------------
describe('HowItWorksSection — ProgressWidget (étape 4)', () => {
  it('l\'étape 4 affiche le titre du ProgressWidget (traduit en FR)', async () => {
    await renderWithI18n(<HowItWorksSection />, { lng: 'fr' })
    expect(screen.getByText('Rapport de progression')).toBeInTheDocument()
  })

  it('le titre du ProgressWidget est traduit en anglais', async () => {
    await renderWithI18n(<HowItWorksSection />, { lng: 'en' })
    expect(screen.getByText('Progress report')).toBeInTheDocument()
  })

  it('le ProgressWidget contient les 3 matières traduites en FR', async () => {
    await renderWithI18n(<HowItWorksSection />, { lng: 'fr' })
    expect(screen.getByText('Maths')).toBeInTheDocument()
    expect(screen.getByText('Français')).toBeInTheDocument()
    expect(screen.getByText('Sciences')).toBeInTheDocument()
  })

  it('le ProgressWidget contient les 3 matières traduites en EN', async () => {
    await renderWithI18n(<HowItWorksSection />, { lng: 'en' })
    expect(screen.getByText('Maths')).toBeInTheDocument()
    expect(screen.getByText('French')).toBeInTheDocument()
    expect(screen.getByText('Sciences')).toBeInTheDocument()
  })

  it('affiche les pourcentages corrects (78%, 65%, 91%)', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(screen.getByText('78%')).toBeInTheDocument()
    expect(screen.getByText('65%')).toBeInTheDocument()
    expect(screen.getByText('91%')).toBeInTheDocument()
  })

  it('la barre Maths a une largeur de 78%', async () => {
    await renderWithI18n(<HowItWorksSection />)
    const bars = document.querySelectorAll('.h-full.rounded-full')
    expect(Array.from(bars).find((b) => b.style.width === '78%')).toBeInTheDocument()
  })

  it('la barre Français a une largeur de 65%', async () => {
    await renderWithI18n(<HowItWorksSection />)
    const bars = document.querySelectorAll('.h-full.rounded-full')
    expect(Array.from(bars).find((b) => b.style.width === '65%')).toBeInTheDocument()
  })

  it('la barre Sciences a une largeur de 91%', async () => {
    await renderWithI18n(<HowItWorksSection />)
    const bars = document.querySelectorAll('.h-full.rounded-full')
    expect(Array.from(bars).find((b) => b.style.width === '91%')).toBeInTheDocument()
  })

  it('le ProgressWidget est positionné en absolute sur l\'étape 4', async () => {
    await renderWithI18n(<HowItWorksSection />, { lng: 'fr' })
    // En FR, le titre du widget est "Rapport de progression"
    const widget = screen.getByText('Rapport de progression').closest('div.absolute')
    expect(widget).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Couleurs des badges numérotés
// ---------------------------------------------------------------------------
describe('HowItWorksSection — couleurs des badges', () => {
  it('le badge de l\'étape 1 a la classe bg-ht-blue', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(screen.getByText('1').closest('div')).toHaveClass('bg-ht-blue')
  })

  it('le badge de l\'étape 2 a la classe bg-ht-cyan', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(screen.getByText('2').closest('div')).toHaveClass('bg-ht-cyan')
  })

  it('le badge de l\'étape 3 a la classe bg-ht-green', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(screen.getByText('3').closest('div')).toHaveClass('bg-ht-green')
  })

  it('le badge de l\'étape 4 a la classe bg-purple-500', async () => {
    await renderWithI18n(<HowItWorksSection />)
    expect(screen.getByText('4').closest('div')).toHaveClass('bg-purple-500')
  })
})
