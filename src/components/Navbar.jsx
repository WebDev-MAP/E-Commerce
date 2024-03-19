import { NavLink, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
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

  return (
    <>
      <Popup />

      {/* Navbar */}
      <nav>
        <div className="relative mx-auto flex min-h-16 max-w-[1440px] items-center px-4  lg:px-0 ">
          {/* Burgermenu */}

          <div onClick={() => setMenuIsOpen(!menuIsOpen)}>
            <RxHamburgerMenu className="mr-4 cursor-pointer text-2xl lg:hidden" />
          </div>
          {/* Dropdown */}
          <div
            className={`fixed inset-y-16 left-0 z-10 flex w-screen   justify-center bg-white  font-satoshi_regular transition-all duration-500 ease-in-out lg:hidden ${menuIsOpen ? '  h-screen' : 'h-0 '}`}
          >
            <ul
              className={`mt-10 flex flex-col items-center justify-center space-y-2 font-satoshi_regular transition-all duration-500 ease-in-out ${menuIsOpen ? 'opacity-100' : 'opacity-0'}`}
            >
              <NavLink to="/" onClick={() => setMenuIsOpen(!menuIsOpen)}>
                <li>Home</li>
              </NavLink>
              <NavLink to="/cart" onClick={() => setMenuIsOpen(!menuIsOpen)}>
                <li>Cart</li>
              </NavLink>
              <div className="flex space-x-3 pt-10">
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

          <div>
            <NavLink className="font-integral_cf text-2xl sm:block sm:text-3xl lg:ml-24 ">
              SHOP.CO
            </NavLink>
          </div>
          {/* Navigation Desktop */}
          <ul className="ml-4 mt-2 hidden items-center  gap-4 text-nowrap font-satoshi_regular text-base  lg:flex">
            <li>
              Shop <FaAngleDown className="inline cursor-pointer" />
            </li>
            <li>OnSale</li>
            <li>New Arrivals</li>
            <li>Brands</li>
          </ul>

          {/* Searchbar */}
          <form className="mt-2 flex  w-full">
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
