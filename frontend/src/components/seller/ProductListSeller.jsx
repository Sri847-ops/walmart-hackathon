// src/pages/ProductListSeller.jsx
import { useEffect, useState } from "react";
import ProductCardSeller from "./ProductCardSeller";

const ProductListSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const sellerId = user?.id || user?._id;
    if (!sellerId) {
      setError("Seller ID not found. Please log in again.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/api/products/seller/${sellerId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (products.length === 0) return <div>No products found for this seller.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Your Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCardSeller key={product._id} product={product} onDelete={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default ProductListSeller;
