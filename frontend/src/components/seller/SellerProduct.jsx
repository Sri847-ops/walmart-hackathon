'use client';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SellerProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
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
    if (window.confirm('Are you sure you want to delete this product?')) {
      // You can implement actual delete logic here
      alert('Product deleted!');
      navigate('/seller/products');
    }
  };

  const handleDonate = () => {
    alert(`Donated "${product.name}" to NGOs!`);
  };

  const toggleDynamicPricing = async () => {
    const updatedDynamicPricing = !product.dynamicPricing;
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dynamicPricing: updatedDynamicPricing }),
      });

      if (!response.ok) {
        throw new Error('Failed to update dynamic pricing');
      }

      setProduct((prev) => ({
        ...prev,
        dynamicPricing: updatedDynamicPricing,
      }));
      alert('Dynamic pricing updated successfully!');
    } catch (error) {
      console.error('Error updating dynamic pricing:', error);
      alert('Failed to update dynamic pricing. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-2xl text-destructive font-bold">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-card rounded-xl shadow-lg mt-10">
      <h1 className="text-4xl font-bold mb-4 text-center text-card-foreground">
        {product.name}
      </h1>
      <p className="text-muted-foreground mb-6 text-center">
        {product.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-8">
        <div>
          <span className="text-muted-foreground block text-sm">
            Current Price
          </span>
          {product.discountPercentage > 0 && (
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-lg text-muted-foreground line-through">
                ${product.initialPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">
                {product.discountPercentage}% OFF
              </span>
            </div>
          )}
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block text-sm">Shipping</span>
          <span className="text-md text-card-foreground">
            {product.shipping}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block text-sm">Packaging</span>
          <span className="text-md text-card-foreground">
            {product.packaging}
          </span>
        </div>
      </div>

      {/* Toggle for Dynamic Pricing */}
      <div className="bg-background p-4 rounded-xl flex items-center justify-between mb-6 shadow-sm">
        <span className="text-lg font-medium text-card-foreground">
          Enable Dynamic Pricing
        </span>
        <button
          onClick={toggleDynamicPricing}
          className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ease-in-out ${
            product.dynamicPricing ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow transform transition-transform duration-300 ${
              product.dynamicPricing ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-4 sm:space-y-0 mt-6">
        <button
          onClick={handleEdit}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-2 px-6 rounded-lg transition-all"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold py-2 px-6 rounded-lg transition-all"
        >
          Delete
        </button>
        <button
          onClick={handleDonate}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-6 rounded-lg transition-all"
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default SellerProduct;

