const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Import routes
const greenScoreRoutes = require("./routes/greenScore")

// Routes
app.use("/api/green-score", greenScoreRoutes)

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Walmart Green E-commerce Backend API" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
