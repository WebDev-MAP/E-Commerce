import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import UserDashboard from '../components/userDashboard/UserDashboard'

import UserOrders from '../components/userDashboard/UserOrders'
import UserReviews from '../components/userDashboard/UserReviews'
import UserSettings from '../components/userDashboard/UserSettings'

// Icons
import { FaShoppingCart } from 'react-icons/fa'
import { BsChatLeftTextFill } from 'react-icons/bs'
import { IoMdSettings } from 'react-icons/io'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import { BiSolidDashboard } from 'react-icons/bi'

const PageUserDashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(null)
  const [sidebarDropdown, setSidebarDropdown] = useState(null)
  const [sidebarCategory, setSidebarCategory] = useState(null)
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)

  return (
    <>
      <div>
        <div>
          <div className="flex flex-row">
            <div
              className={`relative flex h-[50rem] flex-col items-start justify-between rounded-r-md border-r-4 bg-gray-200/50 py-12 pl-5 pr-8 font-satoshi_regular md:pl-8 lg:pl-20 ${isSidebarMinimized ? 'w-[3.8rem] overflow-hidden' : 'w-[20rem]'}`}
            >
              {isSidebarMinimized ? (
                <button
                  className="absolute right-0 top-0 block p-3 text-xl text-gray-500 "
                  onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
                >
                  <IoIosArrowForward />
                </button>
              ) : (
                <button
                  className="absolute right-0 top-0 block p-3 text-xl text-gray-500 "
                  onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
                >
                  <IoIosArrowBack />
                </button>
              )}
              <div className="flex flex-col justify-between gap-8">
                {/* Dashboard */}
                <div
                  className="text flex items-center gap-3 text-2xl "
                  onClick={() => {
                    setSidebarActive('dashboard')
                    // setSidebarDropdown(null)
                    setSidebarCategory(null)
                  }}
                >
                  <BiSolidDashboard className="text-3xl" />
                  <NavLink to="/user">Dashboard</NavLink>
                </div>
                <div className="flex flex-col gap-4">
                  <div
                    className={`flex cursor-pointer items-center justify-between gap-4 text-xl`}
                    onClick={() => {
                      sidebarDropdown === 'orders'
                        ? setSidebarDropdown(null)
                        : setSidebarDropdown('orders')
                    }}
                  >
                    <div className="flex flex-row items-center gap-4">
                      <FaShoppingCart />
                      <p>Orders</p>
                    </div>
                    <div className="text-gray-500">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  {sidebarDropdown === 'orders' && (
                    <div className={`flex flex-col gap-4 pb-2 pl-8`}>
                      <div
                        className="flex items-center gap-4 text-lg"
                        onClick={() => {
                          setSidebarActive(null),
                            setSidebarCategory('all-orders')
                        }}
                      >
                        <NavLink to="/user">My Orders</NavLink>
                      </div>
                      <div className="flex items-center gap-4 text-lg">
                        <NavLink to="/user">Shipments</NavLink>
                      </div>
                    </div>
                  )}
                  <div
                    className={`flex cursor-pointer items-center justify-between gap-4 text-xl`}
                    onClick={() => {
                      setSidebarActive('reviews')
                      // setSidebarDropdown(null)
                      setSidebarCategory(null)
                    }}
                  >
                    <div className="flex flex-row items-center gap-4">
                      <BsChatLeftTextFill />
                      <NavLink to="/user">Reviews</NavLink>
                    </div>
                  </div>
                  <div
                    className={`flex cursor-pointer items-center justify-between gap-4 text-xl`}
                    onClick={() => {
                      setSidebarActive('settings')
                      // setSidebarDropdown(null)
                      setSidebarCategory(null)
                    }}
                  >
                    <div className="flex flex-row items-center gap-4 text-xl">
                      <IoMdSettings />
                      <NavLink to="/user">Settings</NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[50rem] w-full px-5 py-10 md:px-20">
              {sidebarActive === 'dashboard' && <UserDashboard />}
              {sidebarActive === 'reviews' && <UserReviews />}
              {sidebarActive === 'settings' && <UserSettings />}
              {sidebarCategory === 'all-orders' && <UserOrders />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageUserDashboard
