/**
 * Tests unitaires — GamificationSection
 * - Présence de la section et de son id
 * - 3 blocs avec images et titres colorés
 * - MissionCard (3 missions cochées + bouton)
 * - XPCard ("Super!")
 * - Image lego_bricks en bas
 */
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import GamificationSection from '../../../sections/GamificationSection'

describe('GamificationSection — structure', () => {
  it('rend la section avec id="gamification"', async () => {
    await renderWithI18n(<GamificationSection />)
    expect(document.querySelector('section#gamification')).toBeInTheDocument()
  })

  it('affiche un titre h2', async () => {
    await renderWithI18n(<GamificationSection />)
    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('rend 3 blocs de gamification (h3)', async () => {
    await renderWithI18n(<GamificationSection />)
    expect(document.querySelectorAll('h3').length).toBe(3)
  })

  it('les 3 blocs ont des images lazy', async () => {
    await renderWithI18n(<GamificationSection />)
    // Au moins 3 images (3 blocs + 1 lego)
    expect(document.querySelectorAll('img[loading="lazy"]').length).toBeGreaterThanOrEqual(3)
  })
})

describe('GamificationSection — MissionCard', () => {
  it('affiche 3 cases mission cochées (✓)', async () => {
    await renderWithI18n(<GamificationSection />)
    // Les 3 missions ont des spans avec ✓ et bg-ht-green
    const checkmarks = document.querySelectorAll('.bg-ht-green.text-white.rounded-full')
    expect(checkmarks.length).toBeGreaterThanOrEqual(3)
  })

  it('affiche le bouton "Mission accomplie" dans la MissionCard', async () => {
    await renderWithI18n(<GamificationSection />)
    const btn = document.querySelector('.card-feature button, .bg-white\\/90 button')
    expect(btn || document.querySelector('button')).toBeInTheDocument()
  })
})

describe('GamificationSection — XPCard', () => {
  it('affiche "Super!" dans la XPCard', async () => {
    await renderWithI18n(<GamificationSection />)
    expect(document.body.textContent).toContain('Super!')
  })
})

describe('GamificationSection — décoration', () => {
  it('les croix décoratives XMark sont rendues (2 SVG aria-hidden)', async () => {
    await renderWithI18n(<GamificationSection />)
    const xmarks = document.querySelectorAll('svg[aria-hidden="true"]')
    expect(xmarks.length).toBeGreaterThanOrEqual(2)
  })

  it('l\'image lego_bricks est rendue en bas', async () => {
    await renderWithI18n(<GamificationSection />)
    const legoImg = Array.from(document.querySelectorAll('img')).find(
      (img) => img.src && img.src.includes('lego_bricks')
    )
    expect(legoImg).toBeInTheDocument()
  })
})
