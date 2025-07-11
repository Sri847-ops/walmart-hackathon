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
    // Only allow updating specific fields
    const updateFields = {};
    const allowedFields = ["name", "description", "packaging", "shipping", "initialPrice", "dynamicPricing"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });
    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
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

// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

// POST /api/products
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      packaging,
      shipping,
      initialPrice,
      timeToExpiry,
      reductionPerDay,
      imageUrl,
      sellerId
    } = req.body;
    if (!name || !description || !packaging || !shipping || !initialPrice || !timeToExpiry || !reductionPerDay || !imageUrl || !sellerId) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const product = new Product({
      name,
      description,
      packaging,
      shipping,
      initialPrice,
      price: initialPrice, // Always set price
      timeToExpiry,
      reductionPerDay,
      imageUrl,
      sellerId, // Store as 'sellerId' in the model
      dynamicPricing: false
    });
    await product.save();
    // Prepare response object
    const productObj = product.toObject();
    productObj.price = productObj.initialPrice; // Ensure price is present and correct
    delete productObj.__v;
    if (productObj.sellerId === undefined && productObj.seller !== undefined) {
      productObj.sellerId = productObj.seller;
      delete productObj.seller;
    }
    res.status(201).json(productObj);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

export default router;
