// src/pages/ProductListSeller.jsx
import products from "../../data/products"
import ProductCardSeller from "./ProductCardSeller"
import { useState } from "react"
const initialProducts = products


const ProductListSeller = () => {
  const [products, setProducts] = useState(initialProducts)

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Your Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCardSeller key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

export default ProductListSeller
