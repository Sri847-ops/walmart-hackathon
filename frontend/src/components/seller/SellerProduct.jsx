"use client"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const initialProducts = [
  {
    id: 1,
    name: "Organic Green Tea",
    price: 12.99,
    description: "Fresh organic green tea leaves, no preservatives.",
    packaging: "Compostable paper",
    shipping: "Local delivery",
    initialPrice: 12.99,
    timeToExpiry: 10,
    reductionPerDay: 0.05,
    dynamicPricing: false,
  },
  {
    id: 2,
    name: "Plastic Water Bottle",
    price: 1.99,
    description: "Single-use plastic bottle with mineral water.",
    packaging: "Plastic",
    shipping: "International",
    initialPrice: 12.99,
    timeToExpiry: 10,
    reductionPerDay: 0.05,
    dynamicPricing: false,
  },
  {
    id: 3,
    name: "Bamboo Toothbrush",
    price: 8.99,
    description: "Biodegradable bamboo handle with soft charcoal bristles.",
    packaging: "Recyclable cardboard",
    shipping: "Local",
    initialPrice: 12.99,
    timeToExpiry: 2,
    reductionPerDay: 0.05,
    dynamicPricing: false,
  },
  {
    id: 4,
    name: "LED Light Bulb",
    price: 15.99,
    description: "Energy-efficient LED bulb, 10-year lifespan.",
    packaging: "Recyclable cardboard",
    shipping: "Standard",
    initialPrice: 12.99,
    timeToExpiry: 10,
    reductionPerDay: 0.05,
    dynamicPricing: false,
  },
  {
    id: 5,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    description: "100% organic cotton, fair trade certified.",
    packaging: "Biodegradable bag",
    shipping: "Carbon-neutral",
    initialPrice: 12.99,
    timeToExpiry: 10,
    reductionPerDay: 0.05,
    dynamicPricing: false,
  },
  {
    id: 6,
    name: "Reusable Water Bottle",
    price: 19.99,
    description: "Stainless steel, BPA-free, keeps drinks cold for 24 hours.",
    packaging: "Minimal cardboard",
    shipping: "Local",
    initialPrice: 12.99,
    timeToExpiry: 10,
    reductionPerDay: 0.05,
    dynamicPricing: false,
  },
]

const SellerProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)

  useEffect(() => {
    const found = initialProducts.find((p) => p.id === parseInt(id))
    setProduct(found)
  }, [id])

  const handleEdit = () => {
    navigate(`/seller/edit/${product.id}`)
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      alert("Product deleted!")
      navigate("/seller/products")
    }
  }

  const handleDonate = () => {
    alert(`Donated "${product.name}" to NGOs!`)
  }

  const toggleDynamicPricing = () => {
    setProduct((prev) => ({
      ...prev,
      dynamicPricing: !prev.dynamicPricing,
    }))
  }

  const calculateDynamicPrice = (p) => {
    if (!p.dynamicPricing || p.timeToExpiry == null || p.reductionPerDay == null) {
      return p.price
    }

    const daysPassed = Math.max(0, 10 - p.timeToExpiry)
    const discount = p.initialPrice * p.reductionPerDay * daysPassed
    const discountedPrice = p.initialPrice - discount
    const minPrice = p.initialPrice * 0.4
    return Math.max(discountedPrice, minPrice)
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-2xl text-red-600 font-bold">
        Product not found
      </div>
    )
  }

  const dynamicPrice = calculateDynamicPrice(product)

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-4xl font-bold mb-4 text-center text-green-800">
        {product.name}
      </h1>
      <p className="text-gray-600 mb-6 text-center">{product.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-8">
        <div>
          <span className="text-gray-500 block text-sm">Current Price</span>
          <span className="text-xl font-bold text-green-600">
            ${dynamicPrice.toFixed(2)}
          </span>
          {product.dynamicPricing && (
            <p className="text-sm text-gray-500 mt-1">
              Dynamic (min: ${(product.initialPrice * 0.4).toFixed(2)})
            </p>
          )}
        </div>
        <div>
          <span className="text-gray-500 block text-sm">Shipping</span>
          <span className="text-md text-gray-800">{product.shipping}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-sm">Packaging</span>
          <span className="text-md text-gray-800">{product.packaging}</span>
        </div>
      </div>

      {/* Toggle for Dynamic Pricing */}
      <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-between mb-6 shadow-sm">
        <span className="text-lg font-medium text-gray-700">
          Enable Dynamic Pricing
        </span>
        <button
          onClick={toggleDynamicPricing}
          className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ease-in-out ${
            product.dynamicPricing ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow transform transition-transform duration-300 ${
              product.dynamicPricing ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-4 sm:space-y-0 mt-6">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          Delete
        </button>
        <button
          onClick={handleDonate}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          Donate to NGOs
        </button>
      </div>
    </div>
  )
}

export default SellerProduct
