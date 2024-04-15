import { PiTrashFill } from 'react-icons/pi'
import { formatCurrency } from '../utilities/formatCurrency'
import { useShopContext } from '../context/ShopContext'
import { products } from '../data/products'

function ShoppingCartItems() {
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeCartItem,
  } = useShopContext()

  return (
    <>
      <section className="cart-products rounded-[20px] border md:w-7/12">
        <ul className="divide-y px-3 md:px-6">
          { cartItems.length > 0 ? (
          cartItems.map((cartItem) =>
            products.map((product) => {
              if (product.id === cartItem.id) {
                return (
                  <li key={cartItem.id.toString()}>
                    <section className="my-3 flex w-full gap-3 md:my-6">
                      <div>
                        <img
                          className="w-28 md:w-32"
                          src={product.mainImage}
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
                                {cartItem.size}
                              </span>
                            </p>
                            <p className="font-satoshi_regular text-[12px] md:text-sm">
                              Color:{' '}
                              <span className="text-black text-opacity-60">
                                {cartItem.color}
                              </span>
                            </p>
                          </div>
                          <div>
                            <button>
                              <PiTrashFill
                                onClick={() => removeCartItem(product.id)}
                                className="h-5 w-5 text-[#FF3333]"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-satoshi_bold text-xl md:text-2xl">
                            {formatCurrency(product.price * cartItem.quantity)}
                          </p>
                          <div className="flex rounded-full bg-[#F0F0F0]">
                            <button
                              onClick={() => decreaseCartQuantity(product.id)}
                              className="rounded-l-full py-1 pl-3 pr-4 text-[1rem] outline-1 hover:outline"
                            >
                              -
                            </button>
                            <span
                              className="flex w-12 items-center justify-center bg-[#F0F0F0]"
                              id="quantity"
                            >
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => increaseCartQuantity(product.id)}
                              className="rounded-r-full py-1 pl-4 pr-3 text-[1rem] outline-1 hover:outline"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                  </li>
                )
              } else {
                return null
              }
            })
          )) : 
          (<div className="flex justify-center items-center m-3">Your cart is empty</div>)}
        </ul>
      </section>
    </>
  )
}
export default ShoppingCartItems
