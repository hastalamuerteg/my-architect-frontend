import { useState, useEffect, ReactNode } from 'react'
import { X } from 'phosphor-react'

interface IModalProps {
  children: ReactNode
  open: boolean
  onClose: () => void
}

export const Modal = ({ children, open, onClose }: IModalProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleCloseModal = () => {
    setModalOpen(false)
    onClose()
  }

  useEffect(() => {
    if (open) {
      setModalOpen(true)
    } else {
      setModalOpen(false)
    }
  }, [open])

  return modalOpen ? (
    <div
      className="bg-gray-900 bg-opacity-70 h-screen w-screen backdrop-blur-sm fixed inset-0 z-50 flex justify-center items-end md:items-center"
      onClick={handleCloseModal}
      role="dialog"
      aria-labelledby="create-content-modal"
      aria-hidden="true"
    >
      <div
        className="p-4 rounded-t-2xl md:rounded-2xl bg-white w-full md:h-5/6 md:w-8/12 xl:h-4/6 xl:w-4/12 flex flex-col justify-center items-center relative"
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="bg-orange-500 bg-opacity-40 text-orange-600 hover:bg-orange-600 hover:bg-opacity-70 hover:text-orange-200 p-2 absolute top-4 right-4 rounded-full"
          onClick={handleCloseModal}
        >
          <span>
            <X size={20} />
          </span>
        </button>
        <div className="flex flex-col justify-center items-center h-full w-8/12 py-4">
          {children}
        </div>
      </div>
    </div>
  ) : null
}
