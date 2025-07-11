import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleThemeChange = (theme) => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  };

  return (
    <header className="bg-card text-card-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={role === "seller" ? "/seller" : "/"} className="text-2xl font-bold text-primary">
            🛒 GreenMart
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              to={role === "seller" ? "/seller" : "/"}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            {role !== "seller" && (
              <Link
                to="/cart"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                Cart ({getCartItemsCount()})
              </Link>
            )}
            <div className="flex items-center space-x-2">
              <button onClick={() => handleThemeChange('light')} className="w-4 h-4 rounded-full bg-gray-200"></button>
              <button onClick={() => handleThemeChange('dark')} className="w-4 h-4 rounded-full bg-gray-800"></button>
              <button onClick={() => handleThemeChange('green')} className="w-4 h-4 rounded-full bg-green-500"></button>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-md transition-colors"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
