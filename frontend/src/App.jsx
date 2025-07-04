import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import SellerPage from "./pages/SellerPage"
import Product from "./components/Product"
import SellerProduct from "./components/seller/SellerProduct"
import LoginPage from "./pages/LoginPage"
import PrivateRoutes from "./PrivateRoute"
import UserPrivateRoute from "./UserPrivateRoute"
import SellerPrivateRoute from "./SellerPrivateRoute"

function AppContent() {
  const location = useLocation()
  const hideHeader = location.pathname === "/login"

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* User-only routes */}
        <Route path="/" element={
          <UserPrivateRoute>
            <HomePage />
          </UserPrivateRoute>
        } />
        <Route path="/cart" element={
          <UserPrivateRoute>
            <CartPage />
          </UserPrivateRoute>
        } />
        <Route path="/product/:id" element={
          <UserPrivateRoute>
            <Product />
          </UserPrivateRoute>
        } />
        {/* Seller-only routes */}
        <Route path="/seller" element={
          <SellerPrivateRoute>
            <SellerPage />
          </SellerPrivateRoute>
        } />
        <Route path="/seller/product/:id" element={
          <SellerPrivateRoute>
            <SellerProduct />
          </SellerPrivateRoute>
        } />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  )
}

export default App
