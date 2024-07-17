import { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import AdminDashboard from '../components/adminDashboard/AdminDashboard'
import AdminAddProduct from '../components/adminDashboard/AdminAddProduct'
import AdminProductList from '../components/adminDashboard/AdminProductList'
import AdminAllOrders from '../components/adminDashboard/AdminAllOrders'
import AdminAllCustomers from '../components/adminDashboard/AdminAllCustomers'
import AdminReviews from '../components/adminDashboard/AdminReviews'
import AdminEditProduct from '../components/adminDashboard/AdminEditProduct'

// Icons
import { FaBoxArchive } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'
import { BsChatLeftTextFill } from 'react-icons/bs'
import { IoMdSettings } from 'react-icons/io'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import { BiSolidDashboard } from 'react-icons/bi'

const PageAdminDashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(null)
  const [sidebarDropdown, setSidebarDropdown] = useState(null)
  const [sidebarCategory, setSidebarCategory] = useState(null)
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    if (isSidebarMinimized) {
      setSidebarDropdown(null)
    }
  }, [isSidebarMinimized])

  useEffect(() => {
    const checkResize = () => {
      if (window.innerWidth >= 760) {
        setIsSidebarMinimized(false)
      } else {
        setIsSidebarMinimized(true)
      }
    }
    window.addEventListener('resize', checkResize)

    return () => window.removeEventListener('resize', checkResize)
  }, [])

  return (
    <>
      <div>
        <div>
          <div className="flex flex-row">
            <div
              className={`relative flex h-[65.8rem] flex-col items-start justify-between rounded-r-md border-r-4 bg-gray-200/50 py-12 pl-5 pr-8 font-satoshi_regular md:pl-8 lg:pl-20 ${isSidebarMinimized ? 'w-[3.8rem] overflow-hidden' : 'w-[20rem]'}`}
            >
              {isSidebarMinimized ? (
                <button
                  className="absolute right-0 top-0 block p-3 text-xl text-gray-500 md:hidden"
                  onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
                >
                  <IoIosArrowForward />
                </button>
              ) : (
                <button
                  className="absolute right-0 top-0 block p-3 text-xl text-gray-500 md:hidden"
                  onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
                >
                  <IoIosArrowBack />
                </button>
              )}
              <div className="flex flex-col justify-between gap-8">
                <div
                  className="text flex items-center gap-3 text-2xl "
                  onClick={() => {
                    setSidebarActive('dashboard')
                    setSidebarDropdown(null)
                    setSidebarCategory(null)
                  }}
                >
                  <BiSolidDashboard className="text-3xl" />
                  <NavLink to="/admin">Dashboard</NavLink>
                </div>
                <div className="flex flex-col gap-4">
                  <div
                    className={`flex cursor-pointer items-center justify-between gap-4 text-xl`}
                    onClick={() => {
                      sidebarDropdown === 'products'
                        ? setSidebarDropdown(null)
                        : setSidebarDropdown('products')
                    }}
                  >
                    <div className="flex flex-row items-center gap-4">
                      <FaBoxArchive />
                      <p>Products</p>
                    </div>
                    <div className="text-gray-500">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  {sidebarDropdown === 'products' && (
                    <div className="flex flex-col gap-4 pb-2 pl-8">
                      <div
                        className="flex items-center gap-4 text-lg"
                        onClick={() => {
                          setSidebarActive(null),
                            setSidebarCategory('add-product')
                          setShowAddProduct(false)
                        }}
                      >
                        <NavLink to="/admin">Add Product</NavLink>
                      </div>
                      <div
                        className="flex items-center gap-4 text-lg"
                        onClick={() => {
                          setSidebarActive(null),
                            setSidebarCategory('product-list')
                          setShowAddProduct(false)
                        }}
                      >
                        <NavLink to="/admin">Product list</NavLink>
                      </div>
                      {/* <div className="flex items-center gap-4 text-lg">
                        <NavLink to="/admin">Categories</NavLink>
                      </div>
                      <div className="flex items-center gap-4 text-lg">
                        <NavLink to="/admin">Brands</NavLink>
                      </div> */}
                    </div>
                  )}
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
                        <NavLink to="/admin">All Orders</NavLink>
                      </div>
                      {/* <div className="flex items-center gap-4 text-lg">
                        <NavLink to="/admin">Shipments</NavLink>
                      </div>
                      <div className="flex items-center gap-4 text-lg">
                        <NavLink to="/admin">Invoices</NavLink>
                      </div> */}
                      <div className="flex items-center gap-4 text-lg">
                        <NavLink to="/admin">Refunds</NavLink>
                      </div>
                    </div>
                  )}
                  <div
                    className={`flex cursor-pointer items-center justify-between gap-4 text-xl`}
                    onClick={() => {
                      sidebarDropdown === 'customers'
                        ? setSidebarDropdown(null)
                        : setSidebarDropdown('customers')
                    }}
                  >
                    <div className="flex flex-row items-center gap-4">
                      <FaUsers />
                      <p>Customers</p>
                    </div>
                    <div className="text-gray-500">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  {sidebarDropdown === 'customers' && (
                    <div className={`flex flex-col gap-4 pb-2 pl-8`}>
                      <div
                        className="flex items-center gap-4 text-lg"
                        onClick={() => {
                          setSidebarActive(null),
                            setSidebarCategory('all-customers')
                        }}
                      >
                        <NavLink to="/admin">All Customers</NavLink>
                      </div>
                      {/* <div className="flex items-center gap-4 text-lg">
                        <NavLink to="/admin">x</NavLink>
                      </div>
                      <div className="flex items-center gap-4 text-lg">
                        <NavLink to="/admin">x</NavLink>
                      </div>
                      <div className="flex items-center gap-4 text-lg">
                        <NavLink to="/admin">x</NavLink>
                      </div> */}
                    </div>
                  )}
                  <div
                    className={`flex cursor-pointer items-center justify-between gap-4 text-xl`}
                    onClick={() => {
                      setSidebarActive('reviews')
                      setSidebarDropdown(null)
                      setSidebarCategory(null)
                    }}
                  >
                    <div className="flex flex-row items-center gap-4">
                      <BsChatLeftTextFill />

                      <NavLink to="/admin">Reviews</NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xl">
                <IoMdSettings />
                <NavLink to="/admin">Settings</NavLink>
              </div>
            </div>
            <div
              className={`${id ? `h-full` : `h-[65.8rem]`} w-full  px-3 py-5 sm:px-5 md:px-20`}
            >
              {sidebarActive === 'dashboard' && <AdminDashboard />}
              {sidebarCategory === 'add-product' && <AdminAddProduct />}
              {sidebarCategory === 'product-list' && !id && (
                <AdminProductList
                  showAddProduct={showAddProduct}
                  setShowAddProduct={setShowAddProduct}
                />
              )}
              {id && <AdminEditProduct />}
              {sidebarCategory === 'all-orders' && <AdminAllOrders />}
              {sidebarCategory === 'all-customers' && <AdminAllCustomers />}
              {sidebarActive === 'reviews' && <AdminReviews />}
              {!sidebarActive && !sidebarCategory && !id && <AdminDashboard />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageAdminDashboard
