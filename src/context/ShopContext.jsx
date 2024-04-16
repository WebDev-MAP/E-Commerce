import { createContext, useContext, useState } from 'react'

import { products } from '../data/products'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ShopContext = createContext()

export const useShopContext = () => useContext(ShopContext)

function Provider({ children }) {
  const [filterAuswahl, setFilterAuswahl] = useState([])
  const [filterOpen, setFilterOpen] = useState('false')
  const [selectedDressStyle, setSelectedDressStyle] = useState([])

  const valueToShare = {
    filterAuswahl,
    setFilterAuswahl,
    filterOpen,
    setFilterOpen,
  }

  const [promoCode, setPromoCode] = useState('')
  const [discountRate, setDiscountRate] = useLocalStorage('discount-rate', 0)
  const [promoApplied, setPromoApplied] = useState(false)
  const [warnText, setWarnText] = useState('')
  const [cartItems, setCartItems] = useLocalStorage('shopping-cart', [])
  const [criteria, setCriteria] = useState({
    kleidungsstueck: [],
    size: [],
    price: [],
    dressStyle: [],
  })

  function applyPromoCode() {
    if (!promoCode) {
      setWarnText('Please enter a promo code')
      setTimeout(() => {
        setWarnText('')
        setPromoApplied(false)
      }, 3000)
      return
    }

    if (promoCode === 'WELCOME20') {
      if (discountRate > 0) {
        setWarnText('Promo code already applied')
        return
      }
      setDiscountRate(0.2)
      setPromoApplied(true)
      setWarnText('Promo code applied')
    } else {
      setPromoApplied(false)
      setWarnText('Invalid promo code')
    }
    setPromoCode('')
    setTimeout(() => {
      setWarnText('')
      setPromoApplied(false)
    }, 3000)
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  // To Add a Product in the Cart or Increase Quantity of an Item in the Cart
  const increaseCartQuantity = (id, size, color, quantity = 1) => {
    const cartItemsUpdate = () => {
      if (cartItems.find((item) => item.id === id && item.size === size && item.color === color) == null) {
        return [...cartItems, { id, quantity: quantity, size, color}]
      } else {
        return cartItems.map((item) => {
          if ((item.id == id && item.size == size && item.color == color)) {
            return { ...item, quantity: item.quantity + quantity }
          } else {
            return item
          }
        })
      }
    }

    setCartItems(cartItemsUpdate)
  }

  // To Decrease Quantity of an Item in the Cart
  const decreaseCartQuantity = (id, size, color) => {
    const cartItemsUpdate = () => {
      if (cartItems.find((item) => item.id == id && item.size == size && item.color == color).quantity === 1) {
        return cartItems.filter((item) => !(item.id == id && item.size == size && item.color == color))
      } else {
        return cartItems.map((item) => {
          if ((item.id == id && item.size == size && item.color == color)) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    }

    setCartItems(cartItemsUpdate)
  }

  // To Remove an Item from the Cart
  const removeCartItem = (id, size, color) => {
    console.log(id, size, color)
    console.log(cartItems.filter((item) => item.id !== id && item.size !== size && item.color !== color))
    setCartItems(cartItems.filter((item) => !(item.id == id && item.size == size && item.color == color)))
  }

  return (
    <ShopContext.Provider
      value={{
        valueToShare,
        cartItems,
        cartQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartItem,
        filterAuswahl,
        setFilterAuswahl,
        filterOpen,
        setFilterOpen,
        selectedDressStyle,
        setSelectedDressStyle,
        criteria,
        setCriteria,
        promoCode,
        discountRate,
        promoApplied,
        warnText,
        applyPromoCode,
        setPromoCode,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}
export default Provider
