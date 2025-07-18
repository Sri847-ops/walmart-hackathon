'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import GreenScoreResults from '../components/GreenScoreResults';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [greenScore, setGreenScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const calculateGreenScore = async () => {
    setLoading(true);
    try {
      const products = items.map((item) => ({
        name: item.name,
        description: item.description,
        packaging: item.packaging || 'Standard retail packaging',
        shipping: item.shipping || 'Standard shipping',
        ingredients: item.ingredients || 'Generic materials',
        quantity: item.quantity || 1,
      }));

      const response = await fetch('/api/green-score/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products }),
      });

      const data = await response.json();
      setGreenScore(data);
    } catch (error) {
      console.error('Error calculating green score:', error);
      alert('Failed to calculate green score. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You must be logged in to check out.');
        return;
    }

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.id,
                products: items.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
                totalAmount: getCartTotal(),
            }),
        });

        const data = await response.json();
        if (response.ok) {
            clearCart();
            navigate(`/order-confirmation/${data.orderId}`);
        } else {
            alert(data.message || 'Checkout failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during checkout:', error);
        alert('An error occurred during checkout. Please try again.');
    }
};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl shadow-sm p-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-border pb-4 mb-4 last:border-b-0 last:mb-0"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  <p className="text-lg font-bold text-primary">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-2 py-1 rounded-md"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-background rounded-md">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-2 py-1 rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-card-foreground">
              Order Summary
            </h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-muted-foreground">Total:</span>
              <span className="text-2xl font-bold text-primary">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

            <button
              onClick={calculateGreenScore}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg mb-4 disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Calculate Green Score'}
            </button>

            <button onClick={handleCheckout} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {greenScore && <GreenScoreResults data={greenScore} />}
    </div>
  );
};

export default CartPage;

