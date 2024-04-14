import { createContext, useContext } from 'react'
import { useState } from 'react'
import { products } from '../data/products'

const ShopContext = createContext()

export const useShopContext = () => useContext(ShopContext)

function Provider({ children }) {
  const vorname = 'Max'
  const nachname = 'Mustermann'

  const valueToShare = {
    vorname,
    nachname,
  }

  const [cartItems, setCartItems] = useState([
    { id: 9, quantity: 1 },
    { id: 10, quantity: 1 },
    { id: 11, quantity: 1 },
  ])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )
  console.log('TotalItems:', cartQuantity)

  // To Add a Product in the Cart or Increase Quantity of an Item in the Cart
  const increaseCartQuantity = (id) => {
    const cartItemsUpdate = () => {
      if (cartItems.find((item) => item.id === id) == null) {
        return [...cartItems, { id, quantity: 1 }]
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    }

    setCartItems(cartItemsUpdate)
  }

  // To Decrease Quantity of an Item in the Cart
  const decreaseCartQuantity = (id) => {
    const cartItemsUpdate = () => {
      if (cartItems.find((item) => item.id === id).quantity === 1) {
        return cartItems.filter((item) => item.id !== id)
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
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
  const removeCartItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
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
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}
export default Provider
