import { createPortal } from 'react-dom'
import { useEffect } from 'react'

function Modal({ onClose, children, actionbar }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-gray-300 opacity-80"
      ></div>
      <div className="fixed  inset-20 z-50 rounded-3xl bg-white  p-10 md:inset-40">
        <div className="flex h-full flex-col justify-between">
          {children}
          <div className="flex justify-center">{actionbar}</div>
        </div>
      </div>
    </div>,

    document.querySelector('.modal-container')
  )
}
export default Modal
