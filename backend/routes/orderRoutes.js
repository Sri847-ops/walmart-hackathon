import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import qrcode from 'qrcode';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
    const { userId, products, totalAmount } = req.body;

    try {
        const order = new Order({
            userId,
            products,
            totalAmount
        });

        await order.save();

        // Clear user's cart
        const user = await User.findById(userId);
        user.cart = [];
        await user.save();

        res.status(201).json({ orderId: order._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});

// Get order details and generate QR code
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('products.productId').populate('userId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const orderDetails = {
            orderId: order._id,
            userName: order.userId ? order.userId.name : 'Guest',
            totalAmount: order.totalAmount,
            purchaseDate: order.purchaseDate,
            products: order.products.map(p => ({
                name: p.productId.name,
                quantity: p.quantity,
                price: p.price
            }))
        };

        const orderUrl = `http://localhost:3000/order-confirmation/${order._id}`;
        const qrCodeDataUrl = await qrcode.toDataURL(orderUrl);

        res.json({ ...orderDetails, qrCodeDataUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details', error });
    }
});

export default router;
