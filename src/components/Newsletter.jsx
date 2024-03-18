import { SlEnvolope } from 'react-icons/sl'

const Newsletter = () => {
  return (
    <div className="max-w-[1440px] mx-auto flex h-auto w-[90%] flex-col items-center lg:justify-between gap-5 rounded-2xl bg-black px-12 py-8 text-center text-white lg:flex-row">
      <h1 className="text-center font-integral_cf text-xl font-bold lg:text-left lg:text-4xl w-full">
        STAY UPTO DATE ABOUT <br /> OUR LATEST OFFERS
      </h1>

        <form className='w-full lg:w-[90%]'>
          <div className="relative flex items-center  text-gray-400 focus-within:text-gray-600 lg:w-[90%]">
            <SlEnvolope className="pointer-events-none absolute ml-3 h-7 w-6 pb-2" />

            <input
              type="email"
              placeholder="Enter your email address"
              className="lg:text-2xl text-xl font-satoshi_medium mb-2 w-full rounded-full border border-gray-400 py-2 lg:py-3 pl-10 pr-3 text-black"
            />
          </div>

          <div className='w-full lg:w-[90%]'>
            <button
              type="submit"
              className="lg:h-14 rounded-full bg-white px-5 py-2 text-black text-xl lg:text-2xl font-satoshi_medium hover:bg-blue-600 w-full lg:px-10"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </form>

    </div>
  )
}
export default Newsletter
