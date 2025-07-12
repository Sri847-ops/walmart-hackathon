import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const PRODUCTS_PER_PAGE = 8;

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const ProductGrid = ({ searchTerm, category, sortBy }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/api/products").then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  }, []);

  // Debounced filter
  useEffect(() => {
    setLoading(true);
    const debounced = debounce(() => {
      let result = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (category === "All" || product.category === category)
        );
      });
      result = result.sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "price-asc") {
          return a.price - b.price;
        } else if (sortBy === "price-desc") {
          return b.price - a.price;
        }
        return 0;
      });
      setFiltered(result);
      setPage(1); // Reset to first page on filter change
      setLoading(false);
    }, 300);
    debounced();
    return () => {};
    // eslint-disable-next-line
  }, [searchTerm, category, sortBy, products]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE),
    [filtered, page]
  );

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading products...</div>;
  }

  if (filtered.length === 0) {
    return <div className="text-center py-12 text-gray-500">No products found.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginated.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
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

export default ProductGrid;

