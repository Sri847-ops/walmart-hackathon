import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

const Header = () => {
  const { getCartItemsCount } = useCart()

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
            <Link
              to="/"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300 shadow hover:shadow-md"
            >
              User
            </Link>
            <Link
              to="/seller"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300 shadow hover:shadow-md"
            >
              Seller
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
