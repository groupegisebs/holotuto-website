import { createContext, useContext, useState } from 'react'

export const CalendlyContext = createContext(null)

export function CalendlyProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <CalendlyContext.Provider value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
    </CalendlyContext.Provider>
  )
}

export function useCalendly() {
  const ctx = useContext(CalendlyContext)
  if (!ctx) throw new Error('useCalendly must be used within CalendlyProvider')
  return ctx
}
