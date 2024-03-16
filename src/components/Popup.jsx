import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

function Popup() {
  const [isOpen, setOpen] = useState(true)

  return (
    isOpen && (
      <div className=" flex h-10 items-center justify-center bg-black p-4  font-satoshi_regular text-[10px] text-white sm:px-20 sm:text-sm">
        <p>
          Sign up and get 20% off to your first order.{' '}
          <span className=" cursor-pointer font-satoshi_bold underline underline-offset-2">
            Sign Up Now
          </span>
        </p>
        <IoClose
          className="ml-2 inline cursor-pointer text-xl hover:bg-white hover:text-black sm:ml-10"
          onClick={() => setOpen(false)}
        />
      </div>
    )
  )
}
export default Popup
