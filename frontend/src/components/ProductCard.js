'use client';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({ ...product, id: product._id, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all duration-500 ease-out hover:border-transparent hover:scale-[1.02] cursor-pointer group shadow-sm hover:shadow-md">
      {/* Gradient hover border effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition duration-500 -z-10"></div>

      <Link to={`/product/${product._id}`} className="block">
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

          {/* Floating particles for decoration */}
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
            <div className="absolute top-3 left-5 w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
            <div className="absolute top-8 right-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-150" />
            <div className="absolute bottom-6 left-7 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-300" />
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            {product.name}
          </h3>
          <p className="text-sm mb-3 text-gray-500 group-hover:text-gray-600 transition-colors">
            {product.description}
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5 flex items-center justify-between">
        <div>
          {product.discountPercentage > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 line-through">
                ${product.initialPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {product.discountPercentage}% OFF
              </span>
            </div>
          )}
          <span className="text-2xl font-bold text-green-600 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-16 border-gray-300 border rounded-md p-2 text-center"
          />
          <button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 shadow"
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
