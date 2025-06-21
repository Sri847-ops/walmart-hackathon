"use client"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-4xl">📦</span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        </div>
      </Link>
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard

