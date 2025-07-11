'use client';
import { useNavigate } from 'react-router-dom';

const ProductCardSeller = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/seller/edit/${product._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product._id);
    }
  };

  const handleCardClick = () => {
    navigate(`/seller/product/${product._id}`);
  };

  return (
    <div
      className="relative bg-white rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 ease-out border border-gray-200 hover:border-transparent hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      {/* Gradient glow on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition duration-500 -z-10"></div>

      <div className="relative z-10">
        {/* Product image / icon */}
        <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-full rounded-xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 drop-shadow"
              onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
            />
          ) : (
            <span className="text-6xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 drop-shadow">
              📦
            </span>
          )}
          {/* Decorative particles */}
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
            <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
            <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-150" />
            <div className="absolute bottom-6 left-8 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-300" />
          </div>
        </div>

        {/* Product details */}
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            {product.name}
          </h3>
          <p className="text-sm mb-3 text-gray-500 group-hover:text-gray-600 transition-colors">
            {product.description}
          </p>
          <span className="text-2xl font-bold block mb-4 text-green-600 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600">
            ${product.price.toFixed(2)}
          </span>

          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="px-5 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 bg-blue-600 text-white hover:bg-blue-500 shadow"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 bg-red-600 text-white hover:bg-red-500 shadow"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSeller;
