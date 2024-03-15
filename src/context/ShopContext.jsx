import { createContext, useContext } from 'react'

const ShopContext = createContext()

export const useShopContext = () => useContext(ShopContext)

function Provider({ children }) {
  const vorname = 'Max'
  const nachname = 'Mustermann'

  const valueToShare = {
    vorname,
    nachname,
  }

  return (
    <ShopContext.Provider value={valueToShare}>{children}</ShopContext.Provider>
  )
}
export default Provider
