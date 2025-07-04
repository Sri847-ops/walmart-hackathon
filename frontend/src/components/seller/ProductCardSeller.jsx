"use client"
import { useNavigate } from "react-router-dom"

const ProductCardSeller = ({ product, onDelete }) => {
  const navigate = useNavigate()

  const handleEdit = (e) => {
    e.stopPropagation() // Prevent card click
    navigate(`/seller/edit/${product._id}`)
  }

  const handleDelete = (e) => {
    e.stopPropagation() // Prevent card click
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete(product._id)
    }
  }

  const handleCardClick = () => {
    navigate(`/seller/product/${product._id}`)
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-4xl">📦</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <span className="text-2xl font-bold text-green-600 block mb-4">
          ${product.price.toFixed(2)}
        </span>
        <div className="flex space-x-4">
          <button
            onClick={handleEdit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCardSeller
