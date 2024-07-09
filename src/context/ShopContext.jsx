import { createContext, useContext, useEffect, useState } from 'react'
import CartProvider from './CartContext'
import Cookies from 'js-cookie'

const ShopContext = createContext()

export const useShopContext = () => useContext(ShopContext)

function ShopProvider({ children }) {
  const [filterAuswahl, setFilterAuswahl] = useState([])
  const [filterOpen, setFilterOpen] = useState('false')
  const [selectedDressStyle, setSelectedDressStyle] = useState([])
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [userData, setUserData] = useState({})
  const [criteria, setCriteria] = useState({
    type: [],
    size: [],
    price: [],
    style: [],
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <ShopContext.Provider
      value={{
        filterAuswahl,
        setFilterAuswahl,
        filterOpen,
        setFilterOpen,
        selectedDressStyle,
        setSelectedDressStyle,
        criteria,
        setCriteria,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        products,
        loading,
      }}
    >
      <CartProvider userData={userData}>{children}</CartProvider>
    </ShopContext.Provider>
  )
}
export default ShopProvider
