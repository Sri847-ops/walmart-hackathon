import express from "express";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import { calculateDynamicPrice } from "../utils/priceCalculator.js";

const router = express.Router();

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithDynamicPrice = products.map((product) => {
      const { currentPrice, discountPercentage } = calculateDynamicPrice(product);
      return {
        ...product.toObject(),
        price: currentPrice,
        discountPercentage,
      };
    });
    res.json(productsWithDynamicPrice);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// GET /api/products/seller/:sellerId
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const products = await Product.find({
      sellerId: new mongoose.Types.ObjectId(req.params.sellerId),
    });
    const productsWithDynamicPrice = products.map((product) => {
      const { currentPrice, discountPercentage } = calculateDynamicPrice(product);
      return {
        ...product.toObject(),
        price: currentPrice,
        discountPercentage,
      };
    });
    res.json(productsWithDynamicPrice);
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
    const { currentPrice, discountPercentage } = calculateDynamicPrice(product);
    res.json({
      ...product.toObject(),
      price: currentPrice,
      discountPercentage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

// PUT /api/products/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

export default router;
