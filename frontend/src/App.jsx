import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import SellerPage from "./pages/SellerPage";
import Product from "./components/Product";
import SellerProduct from "./components/seller/SellerProduct";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./PrivateRoute";
import UserPrivateRoute from "./UserPrivateRoute";
import SellerPrivateRoute from "./SellerPrivateRoute";
import SellerEditProduct from "./components/seller/SellerEditProduct";
import SellerAddProduct from "./components/seller/SellerAddProduct";

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname === "/login";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.className = savedTheme;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* User-only routes */}
        <Route
          path="/"
          element={
            <UserPrivateRoute>
              <HomePage />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <UserPrivateRoute>
              <CartPage />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <UserPrivateRoute>
              <Product />
            </UserPrivateRoute>
          }
        />
        {/* Seller-only routes */}
        <Route
          path="/seller"
          element={
            <SellerPrivateRoute>
              <SellerPage />
            </SellerPrivateRoute>
          }
        />
        <Route
          path="/seller/product/:id"
          element={
            <SellerPrivateRoute>
              <SellerProduct />
            </SellerPrivateRoute>
          }
        />
        <Route
          path="/seller/edit/:id"
          element={
            <SellerPrivateRoute>
              <SellerEditProduct />
            </SellerPrivateRoute>
          }
        />
        <Route
          path="/seller/products/add"
          element={
            <SellerPrivateRoute>
              <SellerAddProduct />
            </SellerPrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
