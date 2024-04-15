import { useState } from 'react'
import { FaPlus, FaMinus, FaStar } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'

import { products } from '../data/products'

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(`${product.mainImage}`)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  function incrementQuantity() {
    let _quantity = quantity + 1
    setQuantity(_quantity)
  }

  function decrementQuantity() {
    if (quantity === 1) return
    let _quantity = quantity - 1
    setQuantity(_quantity)
  }
  return (
    <>
      <section className="mb-20">
        <div className="flex flex-col gap-5 md:flex-row md:gap-10">
          <div className="flex flex-col gap-2 md:w-1/2 lg:flex-row-reverse lg:gap-4">
            <div className="flex justify-center md:justify-normal">
              <img
                src={mainImage}
                alt="product image main"
                className="w-[438px] lg:max-h-[29rem] xl:max-h-none"
              />
            </div>
            <div className="flex flex-row justify-center gap-2 md:justify-normal md:gap-4 lg:flex-col">
              <img
                src="/images/products/product-12-1.png"
                alt="product image 1"
                className="min-h-28 min-w-[100px] cursor-pointer"
                onClick={() => setMainImage(`${product.images[0]}`)}
              />
              <img
                src="/images/products/product-12-2.png"
                alt="product image 2"
                className="min-h-28  min-w-[100px] cursor-pointer"
                onClick={() => setMainImage(`${product.images[1]}`)}
              />
              <img
                src="/images/products/product-12-3.png"
                alt="product image 3"
                className="min-h-28  min-w-[100px] cursor-pointer"
                onClick={() => setMainImage(`${product.images[2]}`)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 md:w-1/2 md:gap-3.5">
            <h2 className="font-integral_cf text-2xl font-bold md:text-4xl">
              {product.title}
            </h2>
            <p className="flex flex-row items-center font-satoshi_regular text-base md:text-lg">
              {[...Array(product.stars)].map((star, index) => {
                return <FaStar key={index} className="mr-1 text-yellow-400" />
              })}{' '}
              {product.stars}/5
            </p>
            {product.isDiscounted ? (
              <div className="flex flex-row items-center">
                <span className="font-satoshi_bold text-2xl md:text-3xl">
                  ${product.discountedPrice}
                </span>
                <span className="px-2 font-satoshi_bold text-2xl line-through opacity-40 md:text-3xl">
                  ${product.price}
                </span>
                <span className="rounded-xl bg-[#FF3333] bg-opacity-10 px-1 py-1 text-xs text-red-500 md:px-3 md:text-base">
                  -{product.discountPercentage}%
                </span>
              </div>
            ) : (
              <span className="font-satoshi_bold text-2xl md:text-3xl">
                ${product.price}
              </span>
            )}
            <p className="font-satoshi_regular text-sm leading-5 md:text-base md:leading-[22px]">
              {product.description}
            </p>
            <div className="my-2 w-full max-w-7xl border-b-[2px] border-gray-300/40"></div>
            <p className="font-satoshi_regular text-sm md:text-base">
              Select Colors
            </p>
            <div className="flex flex-row gap-4">
              <button
                className={`h-10 w-10 cursor-pointer rounded-full bg-[#4F4631] md:h-9 md:w-9`}
                onClick={() => setSelectedColor('#4F4631')}
              >
                {selectedColor === '#4F4631' ? (
                  <TiTick className="pl-1 text-3xl text-white" />
                ) : (
                  ''
                )}
              </button>
              <button
                className="h-10 w-10 cursor-pointer rounded-full bg-[#314F4A] md:h-9 md:w-9"
                onClick={() => setSelectedColor('#314F4A')}
              >
                {selectedColor === '#314F4A' ? (
                  <TiTick className="pl-1 text-3xl text-white" />
                ) : (
                  ''
                )}
              </button>
              <button
                className="h-10 w-10 cursor-pointer rounded-full bg-[#31344F] md:h-9 md:w-9"
                onClick={() => setSelectedColor('#31344F')}
              >
                {selectedColor === '#31344F' ? (
                  <TiTick className="pl-1 text-3xl text-white" />
                ) : (
                  ''
                )}
              </button>
            </div>
            <div className="my-2 w-full max-w-7xl border-b-[2px] border-gray-300/40"></div>
            <p className="font-satoshi_regular text-sm md:text-base">
              Choose Size
            </p>
            <div className="lg-gap-3 flex flex-row gap-1 sm:gap-2">
              <button
                className={`cursor-pointer rounded-3xl bg-[#F0F0F0] px-3 py-2.5 font-satoshi_regular text-sm sm:px-4 sm:py-2.5 md:text-base lg:px-6 lg:py-3 ${selectedSize === 'Small' ? 'bg-black text-white' : 'text-black'}`}
                onClick={() => setSelectedSize('Small')}
              >
                Small
              </button>
              <button
                className={`cursor-pointer rounded-3xl bg-[#F0F0F0] px-3 py-2.5 font-satoshi_regular text-sm sm:px-4 sm:py-2.5 md:text-base lg:px-6 lg:py-3 ${selectedSize === 'Medium' ? 'bg-black text-white' : 'text-black'}`}
                onClick={() => setSelectedSize('Medium')}
              >
                Medium
              </button>
              <button
                className={`cursor-pointer rounded-3xl bg-[#F0F0F0] px-3 py-2.5 font-satoshi_regular text-sm sm:px-4 sm:py-2.5 md:text-base lg:px-6 lg:py-3 ${selectedSize === 'Large' ? 'bg-black text-white' : 'text-black'}`}
                onClick={() => setSelectedSize('Large')}
              >
                Large
              </button>
              <button
                className={`cursor-pointer rounded-3xl bg-[#F0F0F0] px-3 py-2.5 font-satoshi_regular text-sm sm:px-4 sm:py-2.5 md:text-base lg:px-6 lg:py-3 ${selectedSize === 'X-Large' ? 'bg-black text-white' : 'text-black'}`}
                onClick={() => setSelectedSize('X-Large')}
              >
                X-Large
              </button>
            </div>
            <div className="my-2 w-full max-w-7xl border-b-[2px] border-gray-300/40"></div>
            <div className="flex flex-row gap-5">
              <div className="flex w-1/3 flex-row rounded-3xl bg-[#F0F0F0] px-3.5 py-2 md:px-5 md:py-3.5">
                <button onClick={decrementQuantity}>
                  <FaMinus className="text-sm md:text-xl" />
                </button>
                <input
                  type="number"
                  min={1}
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  className="w-full bg-[#F0F0F0] text-center font-satoshi_medium text-base"
                />
                <button onClick={incrementQuantity}>
                  <FaPlus className="text-sm md:text-xl" />
                </button>
              </div>
              <button className="w-2/3 rounded-3xl bg-black font-satoshi_medium text-sm text-white md:text-base">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetails
