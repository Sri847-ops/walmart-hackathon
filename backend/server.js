import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import greenScoreRoutes from "./routes/greenScore.js"
import productRoutes from "./routes/productRoutes.js" // Add this import
import authRoutes from "./routes/auth.js" // Import auth routes if needed
import orderRoutes from "./routes/orderRoutes.js"
import { OpenAI } from "openai"

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/green-score", greenScoreRoutes)
app.use("/api/products", productRoutes) // Add this line after your other app.use() routes
app.use("/api/auth", authRoutes)
app.use("/api/orders", orderRoutes)
// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Walmart Green E-commerce Backend API" })
})

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.NEBIUS_API_KEY,
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})
