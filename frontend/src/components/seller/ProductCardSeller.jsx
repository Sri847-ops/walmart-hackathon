'use client';
import { useNavigate } from 'react-router-dom';

const ProductCardSeller = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/seller/edit/${product._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent card click
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product._id);
    }
  };

  const handleCardClick = () => {
    navigate(`/seller/product/${product._id}`);
  };

  return (
    <div
      className="bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
      onClick={handleCardClick}
    >
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
        <span className="text-2xl font-bold text-primary block mb-4">
          ${product.price.toFixed(2)}
        </span>
        <div className="flex space-x-4">
          <button
            onClick={handleEdit}
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSeller;
