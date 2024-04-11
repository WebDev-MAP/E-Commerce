import Breadcrumbs from '../components/Breadcrumbs'
import ShoppingCartItems from '../components/ShoppingCartItems'
import { products } from '../data/products'
import { MdOutlineDiscount } from 'react-icons/md'
import { IoMdArrowForward } from 'react-icons/io'
import { formatCurrency } from '../utilities/formatCurrency'

let cart = [products[8], products[9], products[10]]
let subTotal = cart.reduce((total, product) => {
  return total + product.price
}, 0)
let deliveryFee = 15
let discount = subTotal * 0.2
let total = subTotal + deliveryFee - discount

function PageCart() {
  return (
    <>
      <div className="m-auto max-w-7xl">
        <div className="mx-4 flex justify-center">
          <div className="w-full max-w-7xl border-b-[1px] border-gray-300"></div>
        </div>
        <div className="mx-4">
          <div className="my-5">
            <Breadcrumbs />
          </div>
          <h2 className="mb-5 font-integral_cf text-3xl">Your Cart</h2>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-center">
            <section className="cart-products rounded-[20px] border md:w-7/12">
              <ul className="divide-y px-3 md:px-6">
                <li>
                  <ShoppingCartItems product={cart[0]} />
                </li>
                <li>
                  <ShoppingCartItems product={cart[1]} />
                </li>
                <li>
                  <ShoppingCartItems product={cart[2]} />
                </li>
              </ul>
            </section>
            <section className="order-summary mt-5 rounded-[20px] border p-5 md:mt-0 md:w-5/12">
              <h2 className="mb-4 font-satoshi_bold text-xl md:text-2xl">
                Order Summary
              </h2>
              <div className="divide-y">
                <div className="*:my-4 *:text-lg *:md:text-xl">
                  <div className="flex justify-between">
                    <p className="font-satoshi_regular text-black text-opacity-60 ">
                      Subtotal
                    </p>
                    <span className="font-satoshi_bold">{formatCurrency(subTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-satoshi_regular text-black text-opacity-60 ">
                      Discount (-20%)
                    </p>
                    <span className="font-satoshi_bold text-[#FF3333]">
                      -{formatCurrency(discount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-satoshi_regular text-black text-opacity-60">
                      Delivery Fee
                    </p>
                    <span className="font-satoshi_bold">{formatCurrency(deliveryFee)}</span>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <p className="font-satoshi_regular text-lg text-black md:text-xl">
                    Total
                  </p>
                  <span className="font-satoshi_bold text-xl md:text-2xl">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
              <div className="promo-code flex justify-between gap-3 *:my-4">
                <div className="relative mb-3 flex w-full items-center">
                  <MdOutlineDiscount className="pointer-events-none absolute ml-4 h-5 w-5 text-black text-opacity-40" />
                  <input
                    className="h-12 w-full rounded-full bg-[#F0F0F0] pl-10 placeholder:text-black placeholder:text-opacity-40 md:text-lg"
                    type="text"
                    placeholder="Add promo code"
                  />
                </div>
                <button className="rounded-full bg-black px-4 py-2 font-satoshi_medium text-sm text-white md:text-lg">
                  Apply
                </button>
              </div>
              <button className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-white md:text-lg">
                Go to Checkout <IoMdArrowForward />
              </button>
            </section>
          </div>
        </div>
        <div className="mx-4 mb-52 "></div>
      </div>
    </>
  )
}
export default PageCart
