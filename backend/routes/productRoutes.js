import express from "express"
import Product from "../models/Product.js" // Adjust path if needed
import mongoose from "mongoose"
const router = express.Router()

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error })
  }
})

// GET /api/products/seller/:sellerId
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const products = await Product.find({ sellerId: new mongoose.Types.ObjectId(req.params.sellerId) });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seller's products", error });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

export default router
