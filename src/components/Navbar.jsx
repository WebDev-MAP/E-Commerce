import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import Popup from './Popup'
import Footer from './Footer'
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

function Navbar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  // useEffect(() => {
  //   if (menuIsOpen) {
  //     document.body.classList.add('overflow-hidden')
  //   } else {
  //     document.body.classList.remove('overflow-hidden')
  //   }
  // }, [menuIsOpen])

  return (
    <>
      <Popup />

      {/* Navbar */}
      <nav
        className={`z-10 bg-white transition-all duration-500 ease-out ${menuIsOpen ? '  h-64 ' : 'h-16 '}`}
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
              className={` flex flex-col items-center justify-center space-y-2 font-satoshi_regular transition-opacity duration-300 ease-in-out ${menuIsOpen ? 'opacity-100' : 'opacity-0'}`}
            >
              <NavLink to="/" onClick={() => setMenuIsOpen(!menuIsOpen)}>
                <li>Home</li>
              </NavLink>
              <NavLink to="/cart" onClick={() => setMenuIsOpen(!menuIsOpen)}>
                <li>Cart</li>
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
            <NavLink className="font-integral_cf text-2xl sm:block sm:text-3xl lg:ml-24 ">
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
            {/* TODO: Dropdown  */}

            <div
              className={`absolute inset-y-16  left-0  z-10   flex w-full  cursor-default  justify-center   font-satoshi_regular transition-all  duration-500 ease-in-out  ${menuIsOpen ? '  h-52 ' : 'h-0 '}`}
            >
              <div
                className={`flex gap-10 font-satoshi_regular transition-opacity duration-300 ease-in-out ${menuIsOpen ? 'opacity-100' : 'opacity-0'}`}
              >
                <ul className="flex flex-col items-start hover:cursor-pointer">
                  <li>Damen</li>
                  <li>Kleider</li>
                  <li>Shirts & Tops</li>
                  <li>Jacken & Blazer</li>
                  <li>Hosen</li>
                  <li>Jeans</li>
                  <li>Alles entdecken</li>
                </ul>
                <ul className="flex flex-col justify-start hover:cursor-pointer">
                  <li>Herren</li>
                  <li>T-Shirts & Polos</li>
                  <li>Sweatshirts & Hoodies</li>
                  <li>Jacken</li>
                  <li>Hosen</li>
                  <li>Jeans</li>
                  <li>Alles entdecken</li>
                </ul>
                <ul className="flex flex-col justify-start ">
                  <li>Kinder</li>
                  <li>Mädchen</li>
                  <li>Babys</li>
                </ul>
              </div>
            </div>
            <li>OnSale</li>
            <li>New Arrivals</li>
            <li>Brands</li>
          </ul>

          {/* Searchbar */}
          <form className="mt-2 flex  w-screen">
            <button className="ml-4 hidden rounded-l-full bg-background px-2 lg:inline-block">
              <IoSearch />
            </button>
            <input
              type="text"
              placeholder="Search for products..."
              className="mr-4 hidden  h-8 w-full max-w-96 rounded-r-full bg-background pl-4 lg:flex"
            />
          </form>

          {/* Icons */}
          <div className="ml-auto mr-0 flex gap-2 text-xl lg:mr-24">
            <div className="lg:hidden">
              <IoSearch />
            </div>
            <div>
              <NavLink to="/cart">
                <LuShoppingCart />
              </NavLink>
            </div>
            <div>
              <CgProfile />
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
      <Footer />
    </>
  )
}
export default Navbar
