import React, { useState } from 'react'
import AdminAddProduct from './AdminAddProduct'
import { useShopContext } from '../../context/ShopContext'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

// Icons
import { IoIosArrowDown } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'

const AdminProductList = ({ showAddProduct, setShowAddProduct }) => {
  const [query, setQuery] = useState('')
  const [categoryOpen, setCategoryOpen] = useState(false)
  const { products } = useShopContext()
  const [itemOffset, setItemOffset] = useState(0)

  const filteredProducts = products
    .filter((product) => {
      return product.title.toLowerCase().includes(query.toLowerCase())
    })
    .map((product) => ({
      _id: product._id,
      title: product.title,
      price: product.price,
      mainImage: product.mainImage,
    }))

  const itemsPerPage = 10
  function Items({ currentItems }) {
    return (
      <div className=" mb-10 flex">
        <ul className="product-container flex grow flex-wrap justify-center gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div
                className="mx-2 mt-5 flex max-w-[15rem]  flex-col items-center justify-between rounded-xl border-2 border-gray-200 p-4"
                key={item._id}
              >
                <img
                  src={item.mainImage}
                  alt={item.title}
                  className="w-50 h-50 rounded-lg object-cover"
                />
                <div className="mt-2">
                  <h4 className="font-satoshi_regular text-lg">{item.title}</h4>
                </div>
                <p className="font-satoshi_regular text-lg font-bold">
                  ${item.price}
                </p>
                <div className="my-2 flex flex-row items-center">
                  <div className="ml-5 flex flex-row items-center gap-4">
                    <Link to={`/admin/${item._id}`}>
                      <button className="flex items-center gap-1 rounded-lg bg-black px-3 py-1 font-satoshi_regular text-base text-white">
                        <span>
                          <MdEdit />
                        </span>
                        Edit
                      </button>
                    </Link>
                    <Link>
                      <button className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1 font-satoshi_regular text-base text-white">
                        <span>
                          <MdDelete />
                        </span>
                        Delete
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="font-satoshi_regular">
              Keine zutreffenden Produkte gefunden.
            </p>
          )}
        </ul>
      </div>
    )
  }

  const endOffset = itemOffset + itemsPerPage
  const currentItems = products.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(products.length / itemsPerPage)
  const filteredPageCount = Math.ceil(filteredProducts.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length
    setItemOffset(newOffset)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {showAddProduct ? (
        <AdminAddProduct />
      ) : (
        <div>
          <div className="flex flex-row items-center justify-between">
            <h3 className="font-satoshi_regular text-2xl font-bold">
              Product List
            </h3>
            <button
              className="rounded-xl bg-black px-4 py-3 font-satoshi_regular text-white"
              onClick={() => setShowAddProduct(true)}
            >
              Create new Product
            </button>
          </div>
          <div className="mt-10 rounded-lg bg-slate-200/50 px-10 py-5">
            <div className="flex w-full flex-row justify-between">
              <form className="w-1/3">
                <input
                  type="text"
                  placeholder="Search Product"
                  className="w-full rounded-xl border-2 border-slate-500/40 px-4 py-2"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                  }}
                />
              </form>
              <div>
                <div
                  className="relative flex w-full cursor-pointer items-center gap-2 rounded-xl border-2 border-slate-500/30 px-3 py-2"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  onBlur={() => setTimeout(() => setCategoryOpen(false), 300)}
                  tabIndex="0"
                >
                  Category <IoIosArrowDown />
                  <div
                    className={`absolute left-0 top-10 z-50 mt-2 flex flex-col  items-center justify-start font-satoshi_regular ${categoryOpen ? ' block h-full w-full' : 'hidden h-0 w-0'}`}
                  >
                    <ul
                      className={`flex w-full flex-col items-start justify-center rounded-md bg-white hover:cursor-pointer`}
                    >
                      <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                        T-shirts
                      </li>
                      <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                        Shorts
                      </li>
                      <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                        Shirts
                      </li>
                      <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                        Hoodies
                      </li>
                      <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                        Jeans
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 w-full rounded-lg border-t-4 border-white"></div>
            <div className="h-full">
              <div className="flex flex-wrap justify-around">
                <Items currentItems={query ? filteredProducts : currentItems} />
              </div>
              <ReactPaginate
                activeLinkClassName="font-bold"
                className="flex justify-center gap-3 font-satoshi_regular"
                breakLabel="..."
                nextLabel="next ⟶"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={query ? filteredPageCount : pageCount}
                previousLabel="⟵ previous"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminProductList
