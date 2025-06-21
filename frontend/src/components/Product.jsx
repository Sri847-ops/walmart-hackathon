import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Organic Green Tea",
    price: 12.99,
    description: "Fresh organic green tea leaves, no preservatives.",
    packaging: "Compostable paper",
    shipping: "Local delivery",
  },
  {
    id: 2,
    name: "Plastic Water Bottle",
    price: 1.99,
    description: "Single-use plastic bottle with mineral water.",
    packaging: "Plastic",
    shipping: "International",
  },
  {
    id: 3,
    name: "Bamboo Toothbrush",
    price: 8.99,
    description: "Biodegradable bamboo handle with soft charcoal bristles.",
    packaging: "Recyclable cardboard",
    shipping: "Local",
  },
  {
    id: 4,
    name: "LED Light Bulb",
    price: 15.99,
    description: "Energy-efficient LED bulb, 10-year lifespan.",
    packaging: "Recyclable cardboard",
    shipping: "Standard",
  },
  {
    id: 5,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    description: "100% organic cotton, fair trade certified.",
    packaging: "Biodegradable bag",
    shipping: "Carbon-neutral",
  },
  {
    id: 6,
    name: "Reusable Water Bottle",
    price: 19.99,
    description: "Stainless steel, BPA-free, keeps drinks cold for 24 hours.",
    packaging: "Minimal cardboard",
    shipping: "Local",
  },
]

const Product = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const found = DUMMY_PRODUCTS.find((p) => p.id === parseInt(id))
    setProduct(found)
  }, [id])

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl">
        Product not found.
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-6">
            <span className="text-6xl text-gray-400">📦</span>
          </div>
          <div className="md:w-2/3 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
            <p className="text-gray-600 text-lg mb-4">{product.description}</p>
            <div className="mb-3">
              <span className="text-gray-500 font-medium">Packaging:</span>{" "}
              <span className="text-gray-700">{product.packaging}</span>
            </div>
            <div className="mb-3">
              <span className="text-gray-500 font-medium">Shipping:</span>{" "}
              <span className="text-gray-700">{product.shipping}</span>
            </div>
            <div className="text-2xl font-semibold text-green-600 mt-6">
              ${product.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
