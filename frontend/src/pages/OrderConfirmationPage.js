import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ShoppingCart, DollarSign, Calendar, User } from 'lucide-react';

const OrderConfirmationPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders/${orderId}`);
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <div className="text-center py-20">Loading order details...</div>;
    }

    if (!order) {
        return <div className="text-center py-20">Order not found.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12 bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-gray-800">Thank You, {order.userName}!</h1>
                    <p className="text-gray-600">Your order has been placed successfully.</p>
                </div>

                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700">Order ID: {order.orderId}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <ShoppingCart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="font-semibold text-blue-800">{order.products.length} items</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="font-semibold text-green-800">${order.totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <p className="font-semibold text-purple-800">{new Date(order.purchaseDate).toLocaleDateString()}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
                    <ul className="space-y-4">
                        {order.products.map((product, index) => (
                            <li key={index} className="flex justify-between items-center bg-white p-4 rounded-lg border">
                                <div>
                                    <p className="font-semibold text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                                </div>
                                <p className="font-semibold text-gray-800">${(product.price * product.quantity).toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 text-center">
                    <h3 className="text-xl font-bold mb-4">Scan for Digital Invoice</h3>
                    <img src={order.qrCodeDataUrl} alt="QR Code" className="mx-auto" />
                </div>

                <div className="text-center mt-10">
                    <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
