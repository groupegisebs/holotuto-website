import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n.js'
import { CalendlyProvider } from '../../contexts/CalendlyContext'

/**
 * Rend un composant encapsulé dans le provider i18n et CalendlyProvider.
 * @param {JSX.Element} ui         - Composant à rendre
 * @param {object}      options
 * @param {string}      options.lng - Langue initiale ('fr' | 'en'), défaut 'fr'
 */
export async function renderWithI18n(ui, { lng = 'fr', ...renderOptions } = {}) {
  await i18n.changeLanguage(lng)
  return render(
    <CalendlyProvider>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </CalendlyProvider>,
    renderOptions,
  )
}

/**
 * Wrapper utilisable avec les options `wrapper` de React Testing Library.
 */
export function I18nWrapper({ children }) {
  return (
    <CalendlyProvider>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </CalendlyProvider>
  )
}
