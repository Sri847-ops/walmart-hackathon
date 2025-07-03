import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import SellerPage from "./pages/SellerPage"
import Product from "./components/Product"
import SellerProduct from "./components/seller/SellerProduct"
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/seller" element={<SellerPage />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/seller/product/:id" element={<SellerProduct />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
