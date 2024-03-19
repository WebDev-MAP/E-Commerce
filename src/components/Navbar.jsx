import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import Popup from './Popup'
// Icons
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoSearch } from 'react-icons/io5'
import { LuShoppingCart } from 'react-icons/lu'
import { CgProfile } from 'react-icons/cg'
import { FaAngleDown } from 'react-icons/fa6'

function Navbar() {
  return (
    <>
      <Popup />

      {/* Navbar */}
      <nav>
        <div className=" mx-auto flex min-h-16 max-w-[1440px] items-center px-4 lg:px-0 ">
          {/* Burgermenu */}
          <div onClick={() => setIsOpen(!isOpen)}>
            <RxHamburgerMenu className=" mr-4 cursor-pointer text-2xl lg:hidden" />
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
        {/* dropdown mobile*/}
      </nav>

      <Outlet />
    </>
  )
}
export default Navbar
