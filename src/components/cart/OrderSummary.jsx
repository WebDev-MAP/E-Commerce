// import { products } from '../data/products'
import { MdOutlineDiscount } from 'react-icons/md'
import { IoMdArrowForward } from 'react-icons/io'
import { formatCurrency } from '../../utilities/formatCurrency'
import { useCartContext } from '../../context/CartContext'
import { useShopContext } from '../../context/ShopContext'

function OrderSummary() {
  const {
    cartItems,
    promoCode,
    discountRate,
    promoApplied,
    warnText,
    applyPromoCode,
    setPromoCode,
  } = useCartContext()

  const { products, loading } = useShopContext()

  if (loading) {
    return <p>Products loading...</p>
  }

  if (!products) {
    return <p>Product not found.</p>
  }

  let subTotal = cartItems.reduce(
    (total, item) =>
      total +
      products.find((product) => product._id === item.productId).price *
        item.quantity,
    0
  )
  let deliveryFee = 15
  let discount = subTotal * discountRate
  let total = subTotal + deliveryFee - discount

  return (
    <>
      {subTotal > 0 && (
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
                <span className="font-satoshi_bold">
                  {formatCurrency(subTotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="font-satoshi_regular text-black text-opacity-60 ">
                  Discount (-{discountRate * 100}%)
                </p>
                <span className="font-satoshi_bold text-[#FF3333]">
                  -{formatCurrency(discount)}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="font-satoshi_regular text-black text-opacity-60">
                  Delivery Fee
                </p>
                <span className="font-satoshi_bold">
                  {formatCurrency(deliveryFee)}
                </span>
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
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="h-12 w-full rounded-full bg-[#F0F0F0] pl-10 placeholder:text-black placeholder:text-opacity-40 md:text-lg"
                type="text"
                placeholder="Add promo code"
              />
            </div>
            <button
              onClick={applyPromoCode}
              className="rounded-full bg-black px-4 py-2 font-satoshi_medium text-sm text-white md:text-lg"
            >
              Apply
            </button>
          </div>
          <div className="mb-3 ml-3">
            {warnText && (
              <p className={promoApplied ? 'text-green-500' : 'text-red-500'}>
                {warnText}
              </p>
            )}
          </div>
          <button className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-white md:text-lg">
            Go to Checkout <IoMdArrowForward />
          </button>
        </section>
      )}
    </>
  )
}
export default OrderSummary
