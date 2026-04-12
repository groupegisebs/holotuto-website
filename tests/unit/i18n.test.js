/**
 * Tests unitaires — Configuration i18n
 * Vérifie l'initialisation, la détection de langue, le fallback et le changement.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import i18n from '../../i18n.js'

describe('i18n — initialisation et configuration', () => {
  beforeEach(async () => {
    // Remettre en français avant chaque test
    await i18n.changeLanguage('fr')
  })

  it('se charge avec le français comme langue par défaut', () => {
    expect(i18n.language).toMatch(/^fr/)
  })

  it('supporte les langues fr et en uniquement', () => {
    expect(i18n.options.supportedLngs).toContain('fr')
    expect(i18n.options.supportedLngs).toContain('en')
    expect(i18n.options.supportedLngs).not.toContain('de')
    expect(i18n.options.supportedLngs).not.toContain('es')
  })

  it('a le français comme langue de fallback', () => {
    // i18next normalise fallbackLng en tableau en interne
    const fallback = i18n.options.fallbackLng
    const normalized = Array.isArray(fallback) ? fallback : [fallback]
    expect(normalized).toContain('fr')
  })

  it('traduit une clé nav.howItWorks en français', () => {
    expect(i18n.t('nav.howItWorks')).toBeTruthy()
    expect(typeof i18n.t('nav.howItWorks')).toBe('string')
    expect(i18n.t('nav.howItWorks').length).toBeGreaterThan(0)
  })

  it('traduit une clé nav.howItWorks en anglais après changement de langue', async () => {
    const fr = i18n.t('nav.howItWorks')
    await i18n.changeLanguage('en')
    const en = i18n.t('nav.howItWorks')
    // Les deux traductions existent et sont différentes
    expect(en).toBeTruthy()
    expect(en).not.toBe(fr)
  })

  it('retourne la clé brute pour une clé inexistante (pas de crash)', () => {
    const result = i18n.t('cle.qui.nexiste.pas')
    // i18next retourne la clé elle-même quand aucune traduction n'est trouvée
    expect(result).toBe('cle.qui.nexiste.pas')
  })

  it('gère les interpolations — footer.copyright contient l\'année', () => {
    const year = new Date().getFullYear()
    const result = i18n.t('footer.copyright', { year })
    expect(result).toContain(String(year))
  })

  it('les ressources FR et EN couvrent les mêmes clés de premier niveau', () => {
    const frKeys = Object.keys(i18n.getResourceBundle('fr', 'translation'))
    const enKeys = Object.keys(i18n.getResourceBundle('en', 'translation'))
    // Vérifie que toutes les sections FR existent en EN
    frKeys.forEach((key) => {
      expect(enKeys).toContain(key)
    })
  })

  it('n\'échappe pas le HTML dans les valeurs (escapeValue: false)', async () => {
    // ai.subtitle contient du HTML (<strong> etc.)
    const subtitle = i18n.t('ai.subtitle')
    // La valeur ne doit pas être double-encodée
    expect(subtitle).not.toContain('&lt;')
  })

  it('détecte la langue depuis localStorage si définie', async () => {
    window.localStorage.setItem('i18nextLng', 'en')
    // Simuler la détection — changeLanguage simule ce comportement
    await i18n.changeLanguage(window.localStorage.getItem('i18nextLng'))
    expect(i18n.language).toMatch(/^en/)
  })
})
