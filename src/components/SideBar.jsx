import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import Button from './Button'

const sideBarSizes = [
  'XX-Small',
  'X-Small',
  'Small',
  'Medium',
  'Large',
  'X-Large',
  'XX-Large',
  '3X-Large',
  '4X-Large',
]

function SideBar() {
  const [priceAccordionIsOpen, setPriceAccordionIsOpen] = useState(false)
  const [colorsAccordionIsOpen, setColorsAccordionIsOpen] = useState(false)
  const [sizeAccordionIsOpen, setSizeAccordionIsOpen] = useState(false)
  const [dressStyleAccordionIsOpen, setDressStyleAccordionIsOpen] =
    useState(false)

  return (
    // Sidebar desktop
    <>
      <div
        className="absolute left-0 top-20
       z-30  mr-4 h-fit w-full space-y-6 rounded-3xl border-2 bg-white p-6 md:relative md:top-full md:block md:w-[18rem] md:min-w-[18rem] "
      >
        <div className="flex justify-between">
          <h4 className="font-satoshi_bold text-xl">Filters</h4>
          {/* Filter Icon */}
          <button className="rounded-full">
            <img src="/images/icons/filter.svg" alt="filterItems" />
          </button>
        </div>
        <div className="font-satoshi_regular text-base opacity-60">
          <p>T-shirts</p>
          <p>Shorts</p>
          <p>Shirts</p>
          <p>Hoodie</p>
          <p>Jeans</p>
        </div>
        {/* Price Accordion */}
        <h4
          className=" flex font-satoshi_bold text-xl"
          onClick={() => setPriceAccordionIsOpen(!priceAccordionIsOpen)}
        >
          <span className="">Price </span>
          <div className="ml-auto inline-block">
            {priceAccordionIsOpen ? (
              <FaAngleDown className=" inline   transition-transform duration-500 hover:cursor-pointer" />
            ) : (
              <FaAngleDown className=" inline rotate-90  transition-transform duration-500 hover:cursor-pointer" />
            )}
          </div>
        </h4>
        <div className={`${priceAccordionIsOpen ? 'flex' : 'hidden'}`}>
          <input
            type="range"
            min={50}
            max={300}
            name=""
            id=""
            className="bg-black"
          />
        </div>
        {/* colors accordion */}
        <h4
          className="flex font-satoshi_bold text-xl"
          onClick={() => setColorsAccordionIsOpen(!colorsAccordionIsOpen)}
        >
          <p className="mr-auto inline-block">Colors </p>
          <div>
            {colorsAccordionIsOpen ? (
              <FaAngleDown className="inline   transition-transform duration-500 hover:cursor-pointer" />
            ) : (
              <FaAngleDown className="inline rotate-90  transition-transform duration-500 hover:cursor-pointer" />
            )}
          </div>
        </h4>
        <div
          className={`${colorsAccordionIsOpen ? 'flex' : 'hidden'} flex justify-between hover:cursor-pointer`}
        >
          <div className="rounded-full bg-black p-4"></div>
          <div className="rounded-full bg-red-600 p-4"></div>
          <div className="rounded-full bg-green-500 p-4"></div>
          <div className="rounded-full bg-yellow-400 p-4"></div>
          <div className="rounded-full bg-blue-600 p-4"></div>
        </div>
        {/* size accordion */}
        <div
          className="flex font-satoshi_bold text-xl"
          onClick={() => setSizeAccordionIsOpen(!sizeAccordionIsOpen)}
        >
          <h4 className="mr-auto inline-block">Size </h4>

          <div>
            {sizeAccordionIsOpen ? (
              <FaAngleDown className="inline   transition-transform duration-500 hover:cursor-pointer" />
            ) : (
              <FaAngleDown className="inline rotate-90  transition-transform duration-500 hover:cursor-pointer" />
            )}
          </div>
        </div>{' '}
        <div
          className={`${sizeAccordionIsOpen ? 'flex' : 'hidden'} flex-wrap `}
        >
          {sideBarSizes.map((size, index) => {
            return (
              <button
                key={index}
                className="m-1 rounded-full border border-black px-4 py-2 font-satoshi_regular text-sm"
              >
                {size}
              </button>
            )
          })}
        </div>
        {/* dressstyle accordion */}
        <h4
          className="flex font-satoshi_bold text-xl"
          onClick={() =>
            setDressStyleAccordionIsOpen(!dressStyleAccordionIsOpen)
          }
        >
          <p className="mr-auto inline-block">DressStyle </p>
          <div>
            {dressStyleAccordionIsOpen ? (
              <FaAngleDown className="inline   transition-transform duration-500 hover:cursor-pointer" />
            ) : (
              <FaAngleDown className="inline rotate-90  transition-transform duration-500 hover:cursor-pointer" />
            )}
          </div>
        </h4>{' '}
        <div
          className={`${dressStyleAccordionIsOpen ? 'block' : 'hidden'} font-satoshi_regular text-base opacity-60`}
        >
          <p>Casual</p>
          <p>Formal</p>
          <p>Party</p>
          <p>Gym</p>
        </div>
        <Button primary className="w-full">
          Apply Filter
        </Button>
      </div>
    </>
  )
}

export default SideBar
