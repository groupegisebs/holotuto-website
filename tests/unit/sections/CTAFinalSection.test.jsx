/**
 * Tests unitaires — CTAFinalSection
 * - Présence de la section avec id="try"
 * - Titre h2
 * - Deux CTA : essai gratuit (#) et démo (#demo)
 * - 3 badges de confiance (badge1, badge2, badge3)
 * - Fond en dégradé (gradient bleu→cyan)
 */
import { describe, it, expect } from 'vitest'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import CTAFinalSection from '../../../sections/CTAFinalSection'

describe('CTAFinalSection — structure', () => {
  it('rend la section avec id="try"', async () => {
    await renderWithI18n(<CTAFinalSection />)
    expect(document.querySelector('section#try')).toBeInTheDocument()
  })

  it('affiche un titre h2', async () => {
    await renderWithI18n(<CTAFinalSection />)
    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('affiche un sous-titre (p après h2)', async () => {
    await renderWithI18n(<CTAFinalSection />)
    expect(document.querySelector('p')).toBeInTheDocument()
  })
})

describe('CTAFinalSection — CTA', () => {
  it('contient un lien CTA d\'essai vers holotuto.com (btn-primary)', async () => {
    await renderWithI18n(<CTAFinalSection />)
    expect(document.querySelector('a[href="https://holotuto.com"].btn-primary')).toBeInTheDocument()
  })

  it('contient un bouton démo qui ouvre la modale Calendly', async () => {
    await renderWithI18n(<CTAFinalSection />)
    expect(document.querySelector('button.btn-outline-white')).toBeInTheDocument()
  })
})

describe('CTAFinalSection — badges de confiance', () => {
  it('rend 3 badges (✓ badge1, badge2, badge3)', async () => {
    await renderWithI18n(<CTAFinalSection />)
    // Les 3 badges sont dans des <span> avec la classe text-ht-green contenant ✓
    const checkmarks = Array.from(document.querySelectorAll('span.text-ht-green')).filter(
      (s) => s.textContent === '✓'
    )
    expect(checkmarks.length).toBe(3)
  })
})

describe('CTAFinalSection — fond et décoration', () => {
  it('la section a un fond en dégradé (linear-gradient)', async () => {
    await renderWithI18n(<CTAFinalSection />)
    const section = document.querySelector('section#try')
    expect(section.style.background).toContain('linear-gradient')
  })

  it('le badge logo affiche le logo de la marque (img)', async () => {
    await renderWithI18n(<CTAFinalSection />)
    expect(document.querySelector('img[src="/images/logo.svg"]')).toBeInTheDocument()
  })
})
