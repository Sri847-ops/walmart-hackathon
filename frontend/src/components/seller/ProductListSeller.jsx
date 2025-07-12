// src/pages/ProductListSeller.jsx
import { useEffect, useState } from "react";
import ProductCardSeller from "./ProductCardSeller";
import AddProductCard from "./AddProductCard";
import { useNavigate } from "react-router-dom";

const PRODUCTS_PER_PAGE = 7;

const ProductListSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // <-- move here, before any early returns
  const navigate = useNavigate();

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

  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      console.log('Delete response:', res.status, data);
      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete product');
      }
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (products.length === 0) return <div>No products found for this seller.</div>;

  // Pagination logic
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginated = products.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Your Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AddProductCard onAddProduct={() => navigate('/seller/products/add')} />
        {paginated.map((product) => (
          <ProductCardSeller key={product._id} product={product} onDelete={() => handleDelete(product._id)} />
        ))}
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 transition disabled:opacity-40 disabled:cursor-not-allowed shadow"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <span className="text-2xl">&#60;</span>
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 transition disabled:opacity-40 disabled:cursor-not-allowed shadow"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <span className="text-2xl">&#62;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListSeller;
