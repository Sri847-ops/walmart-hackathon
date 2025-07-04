import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-600 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600 text-xl">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-20 text-gray-600 text-xl">Product not found.</div>;
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
              ${product.price?.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
