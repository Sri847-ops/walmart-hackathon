"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import GreenScoreResults from "../components/GreenScoreResults"

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const [greenScore, setGreenScore] = useState(null)
  const [loading, setLoading] = useState(false)

  const calculateGreenScore = async () => {
  setLoading(true)
  try {
    const products = items.map((item) => ({
      name: item.name,
      description: item.description,
      packaging: item.packaging || "Standard retail packaging",
      shipping: item.shipping || "Standard shipping",
      ingredients: item.ingredients || "Generic materials",
      quantity: item.quantity || 1,
    }))

    const response = await fetch("/api/green-score/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    })

    const data = await response.json()
    setGreenScore(data)
  } catch (error) {
    console.error("Error calculating green score:", error)
    alert("Failed to calculate green score. Please try again.")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 mb-4 last:border-b-0 last:mb-0"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-lg font-bold text-green-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-gray-100 rounded">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Total:</span>
              <span className="text-2xl font-bold text-green-600">${getCartTotal().toFixed(2)}</span>
            </div>

            <button
              onClick={calculateGreenScore}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg mb-4 disabled:opacity-50"
            >
              {loading ? "Calculating..." : "Calculate Green Score"}
            </button>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {greenScore && <GreenScoreResults data={greenScore} />}
    </div>
  )
}

export default CartPage
