// src/pages/ProductListSeller.jsx
import products from "../../data/products"
import ProductCardSeller from "./ProductCardSeller"
import { useState } from "react"
const initialProducts = products

// const initialProducts = [
//   {
//     id: 1,
//     name: "Organic Green Tea",
//     price: 12.99,
//     description: "Fresh organic green tea leaves, no preservatives.",
//     packaging: "Compostable paper",
//     shipping: "Local delivery",
//     initialPrice: 12.99,
//     timeToExpiry: 10,
//     reductionPerDay: 0.05,
//     dynamicPricing: false,
//   },
//   {
//     id: 2,
//     name: "Plastic Water Bottle",
//     price: 1.99,
//     description: "Single-use plastic bottle with mineral water.",
//     packaging: "Plastic",
//     shipping: "International",
//     initialPrice: 12.99,
//     timeToExpiry: 10,
//     reductionPerDay: 0.05,
//     dynamicPricing: false,
//   },
//   {
//     id: 3,
//     name: "Bamboo Toothbrush",
//     price: 8.99,
//     description: "Biodegradable bamboo handle with soft charcoal bristles.",
//     packaging: "Recyclable cardboard",
//     shipping: "Local",
//     initialPrice: 12.99,
//     timeToExpiry: 10,
//     reductionPerDay: 0.05,
//     dynamicPricing: false,
//   },
//   {
//     id: 4,
//     name: "LED Light Bulb",
//     price: 15.99,
//     description: "Energy-efficient LED bulb, 10-year lifespan.",
//     packaging: "Recyclable cardboard",
//     shipping: "Standard",
//     initialPrice: 12.99,
//     timeToExpiry: 10,
//     reductionPerDay: 0.05,
//     dynamicPricing: false,
//   },
//   {
//     id: 5,
//     name: "Organic Cotton T-Shirt",
//     price: 24.99,
//     description: "100% organic cotton, fair trade certified.",
//     packaging: "Biodegradable bag",
//     shipping: "Carbon-neutral",
//     initialPrice: 12.99,
//     timeToExpiry: 10,
//     reductionPerDay: 0.05,
//     dynamicPricing: false,
//   },
//   {
//     id: 6,
//     name: "Reusable Water Bottle",
//     price: 19.99,
//     description: "Stainless steel, BPA-free, keeps drinks cold for 24 hours.",
//     packaging: "Minimal cardboard",
//     shipping: "Local",
//     initialPrice: 12.99,
//     timeToExpiry: 10,
//     reductionPerDay: 0.05,
//     dynamicPricing: false,
//   },
// ]

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
