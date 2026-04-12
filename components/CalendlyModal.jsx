import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { X } from 'lucide-react'
import { useCalendly } from '../contexts/CalendlyContext'

const CALENDLY_URL = 'https://calendly.com/admin-holotuto/30min'

export default function CalendlyModal() {
  const { isOpen, closeModal } = useCalendly()

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-[100]">
      <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative w-full max-w-3xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

          <button
            onClick={closeModal}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Fermer"
          >
            <X size={18} className="text-gray-600" />
          </button>

          <iframe
            src={CALENDLY_URL}
            title="Planifier une présentation"
            className="w-full flex-1 border-0"
            loading="lazy"
          />
        </DialogPanel>
      </div>
    </Dialog>
  )
}
