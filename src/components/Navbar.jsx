import { Link, NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import Popup from './Popup'
import Newsletter from '../components/Newsletter'
import Footer from './Footer'
import { products } from '../data/products'

// Icons
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoSearch } from 'react-icons/io5'
import { LuShoppingCart } from 'react-icons/lu'
import { CgProfile } from 'react-icons/cg'
import { FaAngleDown } from 'react-icons/fa6'
import { FaTwitter } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { useShopContext } from '../context/ShopContext'

function Navbar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [mobileQuery, setMobileQuery] = useState('')
  const [searchbarIsOpen, setSearchbarIsOpen] = useState(false)
  const [mobileSearchIsOpen, setMobileSearchIsOpen] = useState(false)
  const { cartQuantity } = useShopContext()

  const filteredProducts = products
    .filter((product) => {
      return product.title.toLowerCase().includes(query.toLowerCase())
    })
    .map((product) => ({ id: product.id, title: product.title }))

  const mobileFilteredProducts = products
    .filter((product) => {
      return product.title.toLowerCase().includes(mobileQuery.toLowerCase())
    })
    .map((product) => ({ id: product.id, title: product.title }))

  return (
    <>
      <Popup />

      {/* Navbar */}
      <nav
        className={` z-10 bg-white transition-all duration-500 ease-out ${menuIsOpen ? '  h-64 ' : 'h-16 '}`}
      >
        <div className="relative mx-auto flex min-h-16 max-w-[1440px] items-center px-4  lg:px-0 ">
          {/* Burgermenu */}

          <div onClick={() => setMenuIsOpen(!menuIsOpen)}>
            <RxHamburgerMenu className="mr-4 cursor-pointer text-2xl lg:hidden" />
          </div>
          {/* Dropdown */}
          <div
            className={` absolute inset-y-16 left-0 z-10 flex   w-screen justify-center  bg-white font-satoshi_regular transition-all  duration-500 ease-in-out lg:hidden ${menuIsOpen ? '  border-b-gray h-48 border-b-2' : 'h-0 '}`}
          >
            <ul
              className={` flex flex-col items-center justify-center space-y-2 font-satoshi_regular transition-opacity duration-300 ease-in-out ${menuIsOpen ? 'opacity-100' : 'hidden'}`}
            >
              <NavLink
                to="/category"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                <li>Shop</li>
              </NavLink>

              <NavLink
                to="/category"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                <li>OnSale</li>
              </NavLink>
              <NavLink
                to="/category"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                <li>New Arrivals</li>
              </NavLink>
              <NavLink
                to="/category"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                <li>Brands</li>
              </NavLink>
              <div className="flex space-x-3 pt-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="rounded-full border-[1px] bg-white px-2 py-2"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="rounded-full border-[1px] bg-white px-2 py-2"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="rounded-full border-[1px] bg-white px-2 py-2"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  className="rounded-full border-[1px] bg-white px-2 py-2"
                >
                  <FaGithub />
                </a>
              </div>
            </ul>
          </div>

          <div className="">
            <NavLink
              className="font-integral_cf text-2xl sm:block sm:text-3xl lg:ml-24 "
              onClick={() => setMenuIsOpen(false)}
            >
              SHOP.CO
            </NavLink>
          </div>
          {/* Navigation Desktop */}
          <ul className="  ml-4 mt-2 hidden  items-center gap-4 text-nowrap font-satoshi_regular  text-base hover:cursor-pointer lg:flex">
            {/* Dropdown Shop  */}
            <li onClick={() => setMenuIsOpen(!menuIsOpen)}>
              Shop{' '}
              {menuIsOpen ? (
                <FaAngleDown className="inline   transition-transform duration-500" />
              ) : (
                <FaAngleDown className="inline rotate-90  transition-transform duration-500" />
              )}
            </li>
            {/* Dropdown  */}

            <div
              className={`left-30 absolute  inset-y-16  z-10   flex w-full  cursor-default  justify-start   font-satoshi_regular transition-all  duration-500 ease-in-out  ${menuIsOpen ? '  h-52 ' : 'h-0 '}`}
            >
              <div
                className={`flex gap-10 font-satoshi_regular transition-opacity duration-300 ease-in-out ${menuIsOpen ? 'opacity-100' : 'hidden'}`}
              >
                <ul className="flex flex-col items-start hover:cursor-pointer">
                  <li className="font-integral_cf">Damen</li>
                  <li>Kleider</li>
                  <li>Shirts & Tops</li>
                  <li>Jacken & Blazer</li>
                  <li>Hosen</li>
                  <li>Jeans</li>
                  <li>Alles entdecken</li>
                </ul>
                <ul className="flex flex-col justify-start hover:cursor-pointer">
                  <li className="font-integral_cf">Herren</li>
                  <li>T-Shirts & Polos</li>
                  <li>Sweatshirts & Hoodies</li>
                  <li>Jacken</li>
                  <li>Hosen</li>
                  <li>Jeans</li>
                  <li>Alles entdecken</li>
                </ul>
                <ul className="flex flex-col justify-start hover:cursor-pointer ">
                  <li className="font-integral_cf">Kinder</li>
                  <li>Mädchen</li>
                  <li>Babys</li>
                </ul>
                <ul className="relative">
                  <Link
                    to="/category"
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
                  >
                    <img
                      src="/images/navbar/mode.png"
                      alt=""
                      className="h-[10rem] pt-2"
                    />
                    <p className="absolute top-32 w-full bg-black p-2 font-integral_cf text-white">
                      All Products
                    </p>
                  </Link>
                </ul>
              </div>
            </div>
            <NavLink to="/category">
              <li>OnSale</li>
            </NavLink>
            <NavLink to="/category">
              <li>New Arrivals</li>
            </NavLink>
            <NavLink to="/category">
              <li>Brands</li>
            </NavLink>
          </ul>

          {/* Searchbar */}
          <form
            className="mt-2 flex w-screen"
            onClick={() => setSearchbarIsOpen(true)}
          >
            <button className="ml-4 hidden rounded-l-full bg-background px-2  lg:inline-block">
              <IoSearch />
            </button>
            <input
              type="text"
              placeholder="Search for products..."
              className="mr-4 hidden h-8 w-full max-w-96 rounded-r-full bg-background pl-4 lg:flex"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
              onBlur={() => {
                setTimeout(() => {
                  setSearchbarIsOpen(false), setQuery('')
                }, 300)
              }}
            />
            {searchbarIsOpen && query && (
              <ul className=" absolute z-20 ml-[3rem] mt-8 w-full max-w-96 rounded-md bg-white shadow-lg">
                {filteredProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <li className="p-2 hover:bg-gray-200">{product.title}</li>
                  </Link>
                ))}
              </ul>
            )}
          </form>

          {/* Icons */}
          <div className="ml-auto mr-0 flex items-center gap-2 text-xl lg:mr-24">
            <div className="hover:cursor-pointer lg:hidden">
              <IoSearch
                onClick={() => setMobileSearchIsOpen(!mobileSearchIsOpen)}
              />
              {mobileSearchIsOpen && (
                <div className="absolute left-0 z-20 mt-5 flex w-screen flex-col  items-center rounded-md bg-white  p-4 shadow-lg sm:w-full">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className=" h-8 w-full max-w-96  rounded-md border border-black pl-4"
                    value={mobileQuery}
                    onChange={(e) => {
                      setMobileQuery(e.target.value)
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setMobileSearchIsOpen(false), setMobileQuery('')
                      }, 200)
                    }}
                  />
                  {mobileSearchIsOpen && mobileQuery && (
                    <ul className="sm:mr-12">
                      {mobileFilteredProducts.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id}>
                          <li className=" w-[20rem] p-2 hover:bg-gray-200">
                            {product.title}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div>
              <NavLink to="/cart">
                <button className="relative flex">
                  <LuShoppingCart />
                  {cartQuantity > 0 && (
                    <div className="absolute bottom-0 right-0 flex h-4 w-4 -translate-y-1/2 translate-x-1/4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                      {cartQuantity > 9 ? '9+' : cartQuantity}
                    </div>
                  )}
                </button>
              </NavLink>
            </div>
            <div className="mt-[1px]">
              <NavLink to="/login">
                <CgProfile />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
      <Newsletter />
      <Footer />
    </>
  )
}
export default Navbar
