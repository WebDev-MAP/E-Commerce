import { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Cookies from 'js-cookie'

const ShopContext = createContext()

export const useShopContext = () => useContext(ShopContext)

function Provider({ children }) {
  const [filterAuswahl, setFilterAuswahl] = useState([])
  const [filterOpen, setFilterOpen] = useState('false')
  const [selectedDressStyle, setSelectedDressStyle] = useState([])
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [userData, setUserData] = useState({})

  const valueToShare = {
    filterAuswahl,
    setFilterAuswahl,
    filterOpen,
    setFilterOpen,
  }

  // cookies
  useEffect(() => {
    const authToken = Cookies.get('authToken')
    if (authToken) {
      fetch('http://localhost:3002/user/tokenLogin', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        method: 'POST',
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data)
          setIsLoggedin(true)
        })
    }
  }, [])

  const [promoCode, setPromoCode] = useState('')
  const [discountRate, setDiscountRate] = useLocalStorage('discount-rate', 0)
  const [promoApplied, setPromoApplied] = useState(false)
  const [warnText, setWarnText] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [localCartItems, setLocalCartItems] = useLocalStorage(
    'shopping-cart',
    []
  )
  const [criteria, setCriteria] = useState({
    type: [],
    size: [],
    price: [],
    style: [],
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetching Products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3002/products/')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products', error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])

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

  const updateCartAPI = async (cartItems) => {
    try {
      const response = await fetch(
        `http://localhost:3002/user/${userData._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart: cartItems }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update the cart')
      }

      const data = await response.json()
      setUserData(data)
    } catch (error) {
      console.error('Failed to update the cart', error.message)
    }
  }

  function useMergeCarts() {
    useEffect(() => {
      const localCartItems =
        JSON.parse(localStorage.getItem('shopping-cart')) || []
      if (userData.token && localCartItems.length > 0) {
        const mergedCart = mergeCarts(localCartItems, userData.cart)
        setCartItems(mergedCart)
        localStorage.removeItem('shopping-cart')
        updateCartAPI(mergedCart)
      } else if (userData.token) {
        setCartItems(userData.cart)
      } else {
        setCartItems(localCartItems)
      }
    }, [userData, localCartItems])
  }

  function mergeCarts(localCartItems, userCartItems) {
    const mergedCart = [...userCartItems]
    localCartItems.forEach((localItem) => {
      const existingItem = mergedCart.find(
        (item) => item.productId === localItem.productId
      )
      if (existingItem) {
        existingItem.quantity += localItem.quantity
      } else {
        mergedCart.push(localItem)
      }
    })
    return mergedCart
  }

  useMergeCarts()

  const increaseCartQuantity = async (productId, size, color, quantity = 1) => {
    // Add the product to the cart using fetch API

    const productToAdd = {
      productId,
      size,
      color,
      quantity,
    }
    if (userData && userData.token) {
      productToAdd.userId = userData._id
      const response = await fetch('http://localhost:3002/cart/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToAdd),
      })

      if (!response.ok) {
        throw new Error('Failed to add the product to the cart')
      }

      const data = await response.json()
      console.log({ data, userData })
      // Update the cart items
      setCartItems(data.cartOfTheUser)
    } else {
      // Update the local cart items
      const cartItemsUpdate = () => {
        if (
          cartItems.find(
            (item) =>
              item.productId === productId &&
              item.size === size &&
              item.color === color
          ) == null
        ) {
          return [...cartItems, { productId, quantity: quantity, size, color }]
        } else {
          return cartItems.map((item) => {
            if (
              item.productId == productId &&
              item.size == size &&
              item.color == color
            ) {
              return { ...item, quantity: item.quantity + quantity }
            } else {
              return item
            }
          })
        }
      }

      setLocalCartItems(cartItemsUpdate)
    }
  }

  // To Decrease Quantity of an Item in the Cart
  const decreaseCartQuantity = (productId, size, color) => {
    const item = cartItems.find(
      (item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
    )
  
    if (item.quantity > 1) {
      const updatedCart = cartItems.map((item) => {
        if (
          item.productId === productId &&
          item.size === size &&
          item.color === color
        ) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
      setCartItems(updatedCart)
      if (userData.token && userData._id) {
        updateCartAPI(updatedCart)
      } else {
        setLocalCartItems(updatedCart)
      }
    } else {
      const updatedCart = cartItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.color === color
          )
      )
      setCartItems(updatedCart)
      if (userData.token && userData._id) {
        updateCartAPI(updatedCart)
      } else {
        setLocalCartItems(updatedCart)
        if (!updatedCart.length) {
          localStorage.removeItem('shopping-cart')
        }
      }
    }
  }  

  // To Remove an Item from the Cart
  const removeCartItem = async (productId, size, color) => {
    const updatedCart = cartItems.filter(
      (item) =>
        !(
          item.productId === productId &&
          item.size === size &&
          item.color === color
        )
    )
    setCartItems(updatedCart)
  
    if (userData.token && userData._id) {
      updateCartAPI(updatedCart)
    } else {
      setLocalCartItems(updatedCart)
      if (!updatedCart.length) {
        localStorage.removeItem('shopping-cart')
      }
    }
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
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        products,
        loading,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}
export default Provider
