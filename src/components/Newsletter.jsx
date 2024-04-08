import { SlEnvolope } from 'react-icons/sl'

const Newsletter = () => {
  return (
    <div className="mx-4 flex justify-center lg:mx-24">
      <div className="flex w-[1289px] flex-col items-center rounded-[20px] bg-black px-6 lg:flex-row lg:justify-center lg:px-16">
        <h1 className="my-8 w-full font-integral_cf text-3xl font-bold text-white lg:my-11 lg:w-auto xl:text-[40px]">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h1>

        <form className="w-full lg:my-9 lg:flex lg:w-auto lg:flex-col lg:items-center">
          <div className="relative mb-3 flex items-center lg:w-96">
            <SlEnvolope className="pointer-events-none absolute ml-4 h-5 w-5 text-black text-opacity-40" />

            <input
              type="email"
              placeholder="Enter your email address"
              className="h-11 w-full rounded-[62px] pl-12 font-satoshi_regular text-sm text-black placeholder-black placeholder-opacity-40 lg:h-12 lg:text-lg"
            />
          </div>

          <div className="lg:w-96">
            <button
              className="mb-7 h-11 w-full rounded-[62px] bg-white font-satoshi_medium text-sm text-black lg:m-auto lg:h-12 lg:text-lg"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Newsletter
