"use client"
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SellerProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/seller/edit/${product._id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // You can implement actual delete logic here
      alert("Product deleted!");
      navigate("/seller/products");
    }
  };

  const handleDonate = () => {
    alert(`Donated "${product.name}" to NGOs!`);
  };

  const toggleDynamicPricing = () => {
    setProduct((prev) => ({
      ...prev,
      dynamicPricing: !prev.dynamicPricing,
    }));
  };

  const calculateDynamicPrice = (p) => {
    if (!p.dynamicPricing || p.timeToExpiry == null || p.reductionPerDay == null) {
      return p.price;
    }
    const daysPassed = Math.max(0, 10 - p.timeToExpiry);
    const discount = p.initialPrice * p.reductionPerDay * daysPassed;
    const discountedPrice = p.initialPrice - discount;
    const minPrice = p.initialPrice * 0.4;
    return Math.max(discountedPrice, minPrice);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-2xl text-red-600 font-bold">
        Product not found
      </div>
    );
  }

  const dynamicPrice = calculateDynamicPrice(product);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-4xl font-bold mb-4 text-center text-green-800">
        {product.name}
      </h1>
      <p className="text-gray-600 mb-6 text-center">{product.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-8">
        <div>
          <span className="text-gray-500 block text-sm">Current Price</span>
          <span className="text-xl font-bold text-green-600">
            ${dynamicPrice.toFixed(2)}
          </span>
          {product.dynamicPricing && (
            <p className="text-sm text-gray-500 mt-1">
              Dynamic (min: ${(product.initialPrice * 0.4).toFixed(2)})
            </p>
          )}
        </div>
        <div>
          <span className="text-gray-500 block text-sm">Shipping</span>
          <span className="text-md text-gray-800">{product.shipping}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-sm">Packaging</span>
          <span className="text-md text-gray-800">{product.packaging}</span>
        </div>
      </div>

      {/* Toggle for Dynamic Pricing */}
      <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-between mb-6 shadow-sm">
        <span className="text-lg font-medium text-gray-700">
          Enable Dynamic Pricing
        </span>
        <button
          onClick={toggleDynamicPricing}
          className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ease-in-out ${
            product.dynamicPricing ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow transform transition-transform duration-300 ${
              product.dynamicPricing ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-4 sm:space-y-0 mt-6">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          Delete
        </button>
        <button
          onClick={handleDonate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default SellerProduct;
