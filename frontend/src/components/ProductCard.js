'use client';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({ ...product, id: product._id });
  };

  return (
    <div className="bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
      <Link to={`/product/${product._id}`} className="block">
        <div className="h-48 bg-secondary flex items-center justify-center overflow-hidden">
          <span className="text-5xl text-muted-foreground group-hover:scale-110 transition-transform duration-300">
            📦
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 text-card-foreground">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-3">
            {product.description}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4 flex items-center justify-between">
        <div>
          {product.discountPercentage > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xl text-muted-foreground line-through">
                ${product.initialPrice.toFixed(2)}
              </span>
              <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">
                {product.discountPercentage}% OFF
              </span>
            </div>
          )}
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
