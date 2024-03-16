import { NavLink, Outlet } from 'react-router-dom'
import Popup from './Popup'

function Navbar() {
  return (
    <>
      <Popup />
      <nav>
        <ul className="content flex gap-4  px-4 py-2">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
export default Navbar
