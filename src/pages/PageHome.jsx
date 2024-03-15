import { useShopContext } from '../context/ShopContext'

function PageHome() {
  const { vorname, nachname } = useShopContext()
  return (
    <div>
      PageHome {vorname} {nachname}
    </div>
  )
}
export default PageHome
