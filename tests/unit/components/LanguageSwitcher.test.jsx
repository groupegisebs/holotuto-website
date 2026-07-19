/**
 * Tests unitaires — LanguageSwitcher
 * Affiche la langue courante (FR / EN), bascule au clic
 */
import { describe, it, expect } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithI18n } from '../../helpers/renderWithI18n'
import LanguageSwitcher from '../../../components/LanguageSwitcher'

describe('LanguageSwitcher — affichage en français', () => {
  it('affiche "FR" quand la langue est FR', async () => {
    await renderWithI18n(<LanguageSwitcher />, { lng: 'fr' })
    expect(screen.getByRole('button')).toHaveTextContent('FR')
  })

  it('aria-label propose "Switch to English" quand la langue est FR', async () => {
    await renderWithI18n(<LanguageSwitcher />, { lng: 'fr' })
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to English')
  })
})

describe('LanguageSwitcher — affichage en anglais', () => {
  it('affiche "EN" quand la langue est EN', async () => {
    await renderWithI18n(<LanguageSwitcher />, { lng: 'en' })
    expect(screen.getByRole('button')).toHaveTextContent('EN')
  })

  it('aria-label propose "Passer en français" quand la langue est EN', async () => {
    await renderWithI18n(<LanguageSwitcher />, { lng: 'en' })
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Passer en français')
  })
})

describe('LanguageSwitcher — comportement au clic', () => {
  it('basculer de FR → EN affiche EN', async () => {
    await renderWithI18n(<LanguageSwitcher />, { lng: 'fr' })
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveTextContent('EN')
  })

  it('basculer de EN → FR affiche FR', async () => {
    await renderWithI18n(<LanguageSwitcher />, { lng: 'en' })
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveTextContent('FR')
  })

  it('deux clics successifs reviennent à la langue d\'origine', async () => {
    await renderWithI18n(<LanguageSwitcher />, { lng: 'fr' })
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(btn).toHaveTextContent('FR')
  })
})

describe('LanguageSwitcher — prop className', () => {
  it('accepte une className personnalisée', async () => {
    await renderWithI18n(<LanguageSwitcher className="my-custom-class" />, { lng: 'fr' })
    expect(screen.getByRole('button')).toHaveClass('my-custom-class')
  })

  it('sans className, utilise les classes par défaut', async () => {
    await renderWithI18n(<LanguageSwitcher />, { lng: 'fr' })
    expect(screen.getByRole('button')).toHaveClass('rounded-full')
  })
})
