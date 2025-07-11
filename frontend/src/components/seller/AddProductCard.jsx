"use client"
import { useState } from "react"
import { Plus, Upload, Package } from "lucide-react"

const AddProductCard = ({ onAddProduct }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    if (onAddProduct) {
      onAddProduct()
    } else {
      console.log("Add new product clicked")
    }
  }

  return (
    <div
      className="relative bg-white rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 ease-out hover:scale-[1.02] border-2 border-dashed border-gray-300 hover:border-transparent"
      style={{
        background: isHovered
          ? "linear-gradient(white, white) padding-box, linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%) border-box"
          : "white",
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.1)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
    >
      {/* Gradient border effect */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        <div className="absolute inset-[2px] bg-white rounded-2xl" />
      </div>

      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
      />

      {/* Ripple effect on click */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 rounded-2xl transition-all duration-300 ${isPressed ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Main content area - matches ProductCard height */}
        <div className="relative h-48 flex items-center justify-center overflow-hidden">
          {/* Animated background pattern */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${isHovered ? "scale-110 rotate-1" : "scale-100 rotate-0"}`}
          >
            {/* Dotted pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 gap-4 h-full p-4">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      isHovered ? "bg-gradient-to-r from-green-400 to-blue-400 animate-pulse" : "bg-gray-300"
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Central icon with enhanced animation */}
          <div className="relative flex flex-col items-center">
            <div
              className={`relative p-6 rounded-full transition-all duration-500 ${
                isHovered
                  ? "bg-gradient-to-r from-green-500 to-blue-500 shadow-2xl"
                  : "bg-gray-100 border-2 border-dashed border-gray-300"
              } ${isPressed ? "scale-95" : "scale-100"}`}
            >
              {/* Rotating background */}
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 transition-all duration-1000 ${
                  isHovered ? "animate-spin opacity-20" : "opacity-0"
                }`}
                style={{ animationDuration: "3s" }}
              />

              <Plus
                className={`w-8 h-8 transition-all duration-500 relative z-10 ${
                  isHovered ? "text-white rotate-90 scale-110" : "text-gray-400 rotate-0 scale-100"
                }`}
              />
            </div>

            {/* Floating icons */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
            >
              <Upload
                className={`absolute -top-2 -left-2 w-4 h-4 text-green-500 transition-all duration-700 ${
                  isHovered ? "animate-bounce" : ""
                }`}
                style={{ animationDelay: "0s" }}
              />
              <Package
                className={`absolute -top-2 -right-2 w-4 h-4 text-blue-500 transition-all duration-700 ${
                  isHovered ? "animate-bounce" : ""
                }`}
                style={{ animationDelay: "0.3s" }}
              />
            </div>
          </div>

          {/* Pulsing rings */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute w-32 h-32 border-2 border-green-400/30 rounded-full animate-ping" />
            <div
              className="absolute w-40 h-40 border-2 border-blue-400/20 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>

        {/* Content section - matches ProductCard structure */}
        <div className="p-5 flex-1 flex flex-col justify-center">
          <h3
            className={`text-lg font-bold mb-2 text-center transition-all duration-300 ${
              isHovered ? "text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600" : "text-gray-600"
            }`}
          >
            Add New Product
          </h3>
          <p
            className={`text-sm text-center transition-all duration-300 ${
              isHovered ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Click to create a new product listing
          </p>
        </div>

        {/* Action section - matches ProductCard structure */}
        <div className="px-5 pb-5 flex items-center justify-center">
          <button
            className={`relative overflow-hidden px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isHovered
                ? "bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-dashed border-gray-300"
            }`}
          >
            {/* Button shine effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ${
                isHovered ? "translate-x-full" : "-translate-x-full"
              }`}
            />

            <div className="relative flex items-center gap-2">
              <Plus className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "rotate-90" : "rotate-0"}`} />
              <span>Create Product</span>
            </div>
          </button>
        </div>
      </div>

      {/* Glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-2xl blur-lg transition-opacity duration-500 -z-10 ${
          isHovered ? "opacity-20" : "opacity-0"
        }`}
      />

      {/* Corner decorations */}
      <div
        className={`absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 transition-all duration-500 ${
          isHovered ? "border-green-400 scale-110" : "border-gray-300 scale-100"
        }`}
      />
      <div
        className={`absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 transition-all duration-500 ${
          isHovered ? "border-blue-400 scale-110" : "border-gray-300 scale-100"
        }`}
      />
      <div
        className={`absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 transition-all duration-500 ${
          isHovered ? "border-purple-400 scale-110" : "border-gray-300 scale-100"
        }`}
      />
      <div
        className={`absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 transition-all duration-500 ${
          isHovered ? "border-pink-400 scale-110" : "border-gray-300 scale-100"
        }`}
      />
    </div>
  )
}

export default AddProductCard 