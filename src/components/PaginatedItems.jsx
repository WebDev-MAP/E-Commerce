import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Card from './Card'
import { products } from '../data/products'
import { useShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

function PaginatedItems({ itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0)
  const { filterAuswahl, filterOpen, setFilterOpen, selectedDressStyle } =
    useShopContext()
  let [filteredItems, setFilteredItems] = useState([])

  let allProducts = products

  let items = filteredItems

  function Items({ currentItems }) {
    return (
      <div className=" mb-32 flex  ">
        <div className="product-container flex grow flex-wrap justify-center gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div className="hover:pointer">
                <Link to={`/product/${item.id}`}>
                  <Card product={item} />
                </Link>
              </div>
            ))
          ) : (
            <p className="font-satoshi_regular">
              Keine zutreffenden Produkte gefunden.
            </p>
          )}
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (selectedDressStyle.length > 0) {
      const filteredItems = allProducts.filter((product) => {
        return selectedDressStyle.includes(product.dressStyle)
      })
      setFilteredItems(filteredItems)
    } else return
  }, [])

  useEffect(() => {
    // wenn filterauswahl leer ist, zeige alle produkte

    if (
      filterAuswahl
        .map((filter) => filter.length)
        .every((filter) => filter === 0)
    ) {
      setFilteredItems(allProducts)
      // wenn filterauswahl price nicht leer ist, filtere produkte nach preis
    } else if (filterAuswahl[3].length > 0) {
      const filteredItems = allProducts.filter((product) => {
        if (product.isDiscounted === true) {
          return (
            product.discountedPrice >= filterAuswahl[3][0] &&
            product.discountedPrice <= filterAuswahl[3][1]
          )
        } else {
          return (
            product.price >= filterAuswahl[3][0] &&
            product.price <= filterAuswahl[3][1]
          )
        }
      })
      setFilteredItems(filteredItems)
    }
    // wenn filterauswahl dressStyle nicht leer ist, filtere produkte
    else if (
      filterAuswahl[0].length > 0 ||
      filterAuswahl[1].length > 0 ||
      filterAuswahl[2].length > 0
    ) {
      const filteredItems = allProducts.filter((product) => {
        if (filterAuswahl[0].length > 0) {
          return filterAuswahl[0].includes(product.dressStyle)
        } else if (filterAuswahl[1].length > 0) {
          return filterAuswahl[1].includes(product.sizes)
        } else if (filterAuswahl[2].length > 0) {
          return filterAuswahl[2].includes(product.kleidungsstueck)
        }
      })
      setFilteredItems(filteredItems)
    } else if (filterAuswahl[1].length > 0) {
      const filteredItems = filteredItems.filter((product) => {
        return filterAuswahl[1] === product.size
      })
      setFilteredItems(filteredItems)
    }
  }, [filterAuswahl])

  const endOffset = itemOffset + itemsPerPage
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    setItemOffset(newOffset)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex w-full flex-col items-center ">
      <div className="flex items-center">
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
        activeLinkClassName="font-bold"
        className="flex justify-center gap-3 font-satoshi_regular"
        breakLabel="..."
        nextLabel="next ⟶"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="⟵ previous"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
export default PaginatedItems
