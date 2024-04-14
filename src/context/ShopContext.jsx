import { createContext, useContext, useState } from 'react'

const ShopContext = createContext()

export const useShopContext = () => useContext(ShopContext)

function Provider({ children }) {
  const [filterAuswahl, setFilterAuswahl] = useState([])
  const [filterOpen, setFilterOpen] = useState('false')

  const valueToShare = {
    filterAuswahl,
    setFilterAuswahl,
    filterOpen,
    setFilterOpen,
  }

  return (
    <ShopContext.Provider value={valueToShare}>{children}</ShopContext.Provider>
  )
}
export default Provider
