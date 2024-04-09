import { useState } from 'react'
import { PiTrashFill } from 'react-icons/pi'

function ShoppingCartItems({ product }) {
  const [quantity, setQuantity] = useState(1)

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
    <div>
      <section className="my-3 md:my-6 flex w-full gap-3">
        <div>
          <img
            className="w-28 md:w-32"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="flex w-full flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <h3 className="font-satoshi_bold text-sm md:text-xl">
                {product.title}
              </h3>
              <p className="font-satoshi_regular text-[12px] md:text-sm">
                Size:{' '}
                <span className="text-black text-opacity-60">
                  {product.size}
                </span>
              </p>
              <p className="font-satoshi_regular text-[12px] md:text-sm">
                Color:{' '}
                <span className="text-black text-opacity-60">
                  {product.color}
                </span>
              </p>
            </div>
            <div>
              <button>
                <PiTrashFill className="h-5 w-5 text-[#FF3333]" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-satoshi_bold text-xl md:text-2xl">
              ${product.price}
            </p>
            <div className="flex rounded-full bg-[#F0F0F0]">
              <button
                onClick={decrementQuantity}
                className="rounded-l-full py-1 pl-3 pr-4 text-[1rem] outline-1 hover:outline"
              >
                -
              </button>
              <input
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-[#F0F0F0] text-center"
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                min="1"
                max={50}
              />
              <button
                onClick={incrementQuantity}
                className="rounded-r-full py-1 pl-4 pr-3 text-[1rem] outline-1 hover:outline"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default ShoppingCartItems
