import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

const Header = () => {
  const { getCartItemsCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("role")
    navigate("/login")
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            🛒 GreenMart
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
            <Link to="/cart" className="flex items-center hover:text-blue-200 transition-colors">
              Cart ({getCartItemsCount()})
            </Link>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
