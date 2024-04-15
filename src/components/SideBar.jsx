import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import Button from './Button'
import { useShopContext } from '../context/ShopContext'

// wählbare optionen
const sizes = [
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
const dressStyles = ['Casual', 'Formal', 'Party', 'Gym']
const kleidungsstuecke = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans']
const colors = [
  { color: 'Black', className: 'bg-black' },
  { color: 'Red', className: 'bg-red-600' },
  { color: 'Green', className: 'bg-green-500' },
  { color: 'Yellow', className: 'bg-yellow-400' },
  { color: 'Blue', className: 'bg-blue-600' },
]

function SideBar() {
  // open and close accordion
  const [priceAccordionIsOpen, setPriceAccordionIsOpen] = useState(true)
  // const [colorsAccordionIsOpen, setColorsAccordionIsOpen] = useState(false)
  const [sizeAccordionIsOpen, setSizeAccordionIsOpen] = useState(true)
  const [dressStyleAccordionIsOpen, setDressStyleAccordionIsOpen] =
    useState(true)

  // open filter
  const { filterOpen, setFilterOpen, setFilterAuswahl } = useShopContext()
  // save selected filter options
  const [selectedStrings, setSelectedStrings] = useState([])
  const [selectedSize, setSelectedSize] = useState([])
  const [selectedKleidungsstueck, setSelectedKleidungsstueck] = useState([])
  const [selectedPrice, setSelectedPrice] = useState([])

  console.log(selectedStrings, selectedSize, selectedPrice)

  // füge oder entferne filteroptionen onclick
  const handleClickDressStyle = (e) => {
    console.log(e)
    if (selectedStrings.includes(e.target.innerText)) {
      setSelectedStrings([
        ...selectedStrings.filter((string) => string !== e.target.innerText),
      ])
      e.target.classList.remove('text-black')
      e.target.classList.remove('font-bold')
      return
    }
    setSelectedStrings([...selectedStrings, e.target.innerText])
    e.target.classList.toggle('text-black')
    e.target.classList.toggle('font-bold')
  }

  const handleClickKleidungsstueck = (e) => {
    console.log(e)
    if (selectedKleidungsstueck.includes(e.target.innerText)) {
      setSelectedKleidungsstueck([
        ...selectedKleidungsstueck.filter(
          (string) => string !== e.target.innerText
        ),
      ])
      e.target.classList.remove('text-black')
      e.target.classList.remove('font-bold')
      return
    }
    setSelectedKleidungsstueck([...selectedKleidungsstueck, e.target.innerText])
    e.target.classList.toggle('text-black')
    e.target.classList.toggle('font-bold')
  }

  const handleClickSize = (e) => {
    console.log(e)
    if (selectedSize.includes(e.target.innerText)) {
      setSelectedSize([
        ...selectedSize.filter((string) => string !== e.target.innerText),
      ])
      e.target.classList.remove('bg-black')
      e.target.classList.remove('text-white')
      return
    }
    setSelectedSize([...selectedSize, e.target.innerText])
    e.target.classList.toggle('bg-black')
    e.target.classList.toggle('text-white')
  }

  return (
    // Sidebar desktop
    <>
      <div
        className={`left-0 top-0 z-30
       mr-4   h-fit w-full space-y-6 rounded-3xl border-2 bg-white p-6 md:static md:top-full md:block md:w-[18rem] md:min-w-[18rem] ${filterOpen ? 'hidden' : 'absolute'}`}
      >
        <div className="flex justify-between">
          <h4 className="font-satoshi_bold text-xl">Filters</h4>
          {/* Filter Icon */}
          <button
            className=" rounded-full md:pointer-events-none"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            {filterOpen ? (
              <img
                src="/images/icons/filter.svg"
                alt="filterItems"
                className="md:hidden"
              />
            ) : (
              <p className="font-satoshi_bold md:hidden">X</p>
            )}
          </button>
        </div>
        <div className="font-satoshi_regular text-base text-gray-400">
          {kleidungsstuecke.map((kleidungsstueck, index) => {
            return (
              <p
                onClick={handleClickKleidungsstueck}
                key={index}
                className="hover:cursor-pointer"
              >
                {kleidungsstueck}
              </p>
            )
          })}
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
        <div className={`${priceAccordionIsOpen ? 'flex' : 'hidden'} `}>
          <div className="flex w-[18rem] justify-between">
            <input
              type="number"
              placeholder="Min"
              name="minprice"
              id=""
              value={selectedPrice[0]}
              onChange={(e) => {
                if (e.target.value === '') {
                  return setSelectedPrice([])
                } else {
                  return setSelectedPrice([e.target.value, selectedPrice[1]])
                }
              }}
              className=" w-[4rem] "
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              name="maxprice"
              value={selectedPrice[1]}
              onChange={(e) => {
                if (e.target.value === '') {
                  return setSelectedPrice([])
                } else {
                  return setSelectedPrice([selectedPrice[0], e.target.value])
                }
              }}
              id=""
              className="w-[4rem] "
            />
          </div>
        </div>
        {/* colors accordion */}
        {/* <h4
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
          {colors.map((color, index) => {
            return (
              <div
                name={color.color}
                onClick={handleClickColor}
                key={index}
                className={`rounded-full ${color.className} p-4`}
              ></div>
            )
          })}
        </div> */}
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
          {sizes.map((size, index) => {
            return (
              <button
                onClick={handleClickSize}
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
          className={`${dressStyleAccordionIsOpen ? 'block' : 'hidden'} font-satoshi_regular text-base text-gray-400`}
        >
          {dressStyles.map((dressStyle, index) => {
            return (
              <p onClick={handleClickDressStyle} key={index}>
                {dressStyle}
              </p>
            )
          })}
        </div>
        <Button
          primary
          className="w-full"
          onClick={() => {
            setFilterAuswahl([
              selectedStrings,
              selectedSize,
              selectedKleidungsstueck,
              selectedPrice,
            ])
            setFilterOpen(!filterOpen)
            return window.scrollTo(0, 0)
          }}
        >
          Apply Filter
        </Button>
      </div>
    </>
  )
}

export default SideBar
