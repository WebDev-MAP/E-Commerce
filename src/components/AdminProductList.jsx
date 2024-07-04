import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import AdminAddProduct from './AdminAddProduct'

const AdminProductList = ({ showAddProduct, setShowAddProduct }) => {
  const [query, setQuery] = useState('')
  const [categoryOpen, setCategoryOpen] = useState(false)
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
                  className="relative flex cursor-pointer items-center gap-2 rounded-xl border-2 border-slate-500/30 px-3 py-2"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                >
                  Category <IoIosArrowDown />
                </div>
                <div
                  className={`r-0 absolute z-50 ml-6 mt-2 flex flex-col  items-center justify-start font-satoshi_regular ${categoryOpen ? ' block h-full' : 'hidden h-0'}`}
                >
                  <ul
                    className={`flex flex-col items-start hover:cursor-pointer`}
                  >
                    <li>T-shirts</li>
                    <li>Shorts</li>
                    <li>Shirts</li>
                    <li>Hoodies</li>
                    <li>Jeans</li>
                  </ul>
                </div>
              </div>
            </div>
			 <div className='w-full border-t-2 border-white rounded-lg mt-8'></div>
			 <div className='h-[34.5rem]'>

			 </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminProductList
