import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Card from './Card'
import { products } from '../data/products'
import { useShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

function PaginatedItems({ itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0)
  const { filterOpen, setFilterOpen } = useShopContext()
  const { criteria } = useShopContext()

  useEffect(() => {
    setItemOffset(0)
  }, [criteria])

  // Filterlogic
  let filteredProducts = products.filter((product) => {
    switch (true) {
      // Kleidungsstück, Größe, DressStyle, Price
      case criteria.kleidungsstueck.length > 0 &&
        criteria.size.length > 0 &&
        criteria.dressStyle.length > 0 &&
        criteria.price.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.kleidungsstueck.includes(product.kleidungsstueck) &&
            criteria.size.includes(product.sizes) &&
            criteria.dressStyle.includes(product.dressStyle) &&
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice
          )
        } else {
          return (
            criteria.kleidungsstueck.includes(product.kleidungsstueck) &&
            criteria.size.includes(product.sizes) &&
            criteria.dressStyle.includes(product.dressStyle) &&
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price
          )
        }
      // Kleidungsstück, Größe, DressStyle
      case criteria.kleidungsstueck.length > 0 &&
        criteria.size.length > 0 &&
        criteria.dressStyle.length > 0:
        return (
          criteria.kleidungsstueck.includes(product.kleidungsstueck) &&
          criteria.size.includes(product.sizes) &&
          criteria.dressStyle.includes(product.dressStyle)
        )
      // Kleidungsstück, Größe, Price
      case criteria.kleidungsstueck.length > 0 &&
        criteria.size.length > 0 &&
        criteria.price.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.kleidungsstueck.includes(product.kleidungsstueck) &&
            criteria.size.includes(product.sizes) &&
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice
          )
        } else {
          return (
            criteria.kleidungsstueck.includes(product.kleidungsstueck) &&
            criteria.size.includes(product.sizes) &&
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price
          )
        }
      // Größe, DressStyle, Price
      case criteria.size.length > 0 &&
        criteria.dressStyle.length > 0 &&
        criteria.price.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.size.includes(product.sizes) &&
            criteria.dressStyle.includes(product.dressStyle) &&
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice
          )
        } else {
          return (
            criteria.size.includes(product.sizes) &&
            criteria.dressStyle.includes(product.dressStyle) &&
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price
          )
        }
      // Kleidungsstück, DressStyle, Price
      case criteria.kleidungsstueck.length > 0 &&
        criteria.dressStyle.length > 0 &&
        criteria.price.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.kleidungsstueck.includes(product.kleidungsstueck) &&
            criteria.dressStyle.includes(product.dressStyle) &&
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice
          )
        } else {
          return (
            criteria.kleidungsstueck.includes(product.kleidungsstueck) &&
            criteria.dressStyle.includes(product.dressStyle) &&
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price
          )
        }
      // Kleidungsstück, Größe
      case criteria.kleidungsstueck.length > 0 && criteria.size.length > 0:
        return (
          criteria.kleidungsstueck.includes(product.kleidungsstueck) &&
          criteria.size.includes(product.sizes)
        )
      // Kleidungsstück, DressStyle
      case criteria.kleidungsstueck.length > 0 &&
        criteria.dressStyle.length > 0:
        return (
          criteria.kleidungsstueck.includes(product.kleidungsstueck) &&
          criteria.dressStyle.includes(product.dressStyle)
        )

      // Größe, DressStyle
      case criteria.size.length > 0 && criteria.dressStyle.length > 0:
        return (
          criteria.size.includes(product.sizes) &&
          criteria.dressStyle.includes(product.dressStyle)
        )
      // Price, DressStyle
      case criteria.price.length > 0 && criteria.dressStyle.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice &&
            criteria.dressStyle.includes(product.dressStyle)
          )
        } else {
          return (
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price &&
            criteria.dressStyle.includes(product.dressStyle)
          )
        }
      // Price, Kleidungsstück
      case criteria.price.length > 0 && criteria.kleidungsstueck.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice &&
            criteria.kleidungsstueck.includes(product.kleidungsstueck)
          )
        } else {
          return (
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price &&
            criteria.kleidungsstueck.includes(product.kleidungsstueck)
          )
        }

      // Price, Größe
      case criteria.price.length > 0 && criteria.size.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice &&
            criteria.size.includes(product.sizes)
          )
        } else {
          return (
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price &&
            criteria.size.includes(product.sizes)
          )
        }
      // Kleidungsstück
      case criteria.kleidungsstueck.length > 0:
        return criteria.kleidungsstueck.includes(product.kleidungsstueck)
      // Größe
      case criteria.size.length > 0:
        return criteria.size.includes(product.sizes)
      // DressStyle
      case criteria.dressStyle.length > 0:
        return criteria.dressStyle.includes(product.dressStyle)
      // Price
      case criteria.price.length > 0:
        if (product.isDiscounted) {
          return (
            criteria.price[0] <= product.discountedPrice &&
            criteria.price[1] >= product.discountedPrice
          )
        } else {
          return (
            criteria.price[0] <= product.price &&
            criteria.price[1] >= product.price
          )
        }
      // Default
      default:
        return product
    }
  })

  let items = filteredProducts
  console.log(items, criteria, products)
  function Items({ currentItems }) {
    return (
      <div className=" mb-32 flex  ">
        <ul className="product-container flex grow flex-wrap justify-center gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <li className="hover:pointer" key={index}>
                <Link to={`/product/${item.id}`}>
                  <Card product={item} />
                </Link>
              </li>
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
