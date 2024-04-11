import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import Card from './Card'
import { products } from '../data/products'
import { useShopContext } from '../context/ShopContext'

// Example items, to simulate fetching from another resources.
const items = products

function Items({ currentItems }) {
  return (
    <div className=" mb-32 flex  ">
      <div className="product-container flex grow flex-wrap justify-center gap-4">
        {currentItems &&
          currentItems.map((item) => (
            <div className="">
              <Card product={item} />
            </div>
          ))}
      </div>
    </div>
  )
}

function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)

  const { filterOpen, setFilterOpen } = useShopContext()

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`)
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // )
    setItemOffset(newOffset)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className=" ">
      <div className="flex items-center">
        <h4 className="mb-4 font-satoshi_bold text-2xl sm:text-3xl">Casual</h4>
        <button
          className="ml-auto pb-3 md:hidden"
          onClick={() => {
            setFilterOpen(!filterOpen)
          }}
        >
          <img src="/images/icons/filter.svg" alt="filterItems" />
        </button>
      </div>
      <Items currentItems={currentItems} />
      <ReactPaginate
        activeLinkClassName="text-red-500"
        className="flex justify-center gap-3"
        breakLabel="..."
        nextLabel="next ->"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<- previous"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
export default PaginatedItems
