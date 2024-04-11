import { createContext, useContext, useState } from 'react'

const ShopContext = createContext()

export const useShopContext = () => useContext(ShopContext)

function Provider({ children }) {
  const vorname = 'Max'
  const nachname = 'Mustermann'

  const [filterOpen, setFilterOpen] = useState('false')

  const valueToShare = {
    vorname,
    nachname,
    filterOpen,
    setFilterOpen,
  }

  return (
    <ShopContext.Provider value={valueToShare}>{children}</ShopContext.Provider>
  )
}
export default Provider
