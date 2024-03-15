import { useShopContext } from '../context/ShopContext'

function App() {
  const { vorname, nachname } = useShopContext()

  return (
    <h1 className="m-2 text-2xl">
      Template {vorname} {nachname}
    </h1>
  )
}

export default App
