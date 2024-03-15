import { NavLink, Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <nav>
        <ul className="content flex gap-4 bg-slate-500 px-4 py-2">
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
