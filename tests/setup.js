import '@testing-library/jest-dom'
import { vi, afterEach } from 'vitest'

// ---------------------------------------------------------------------------
// IntersectionObserver — utilisé par react-intersection-observer
// ---------------------------------------------------------------------------
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// ---------------------------------------------------------------------------
// window.scrollY — utilisé par Navbar pour l'effet de scroll
// ---------------------------------------------------------------------------
Object.defineProperty(window, 'scrollY', { writable: true, value: 0 })

// ---------------------------------------------------------------------------
// localStorage — utilisé par i18next-browser-languagedetector
// ---------------------------------------------------------------------------
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, val) => { store[key] = String(val) }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// ---------------------------------------------------------------------------
// navigator.language — simulé en français par défaut
// ---------------------------------------------------------------------------
Object.defineProperty(navigator, 'language', { value: 'fr-FR', configurable: true })

// ---------------------------------------------------------------------------
// Nettoyage après chaque test
// ---------------------------------------------------------------------------
afterEach(() => {
  localStorageMock.clear()
  vi.clearAllTimers()
})
