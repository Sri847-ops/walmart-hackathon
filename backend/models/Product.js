import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  packaging: String,
  shipping: String,
  initialPrice: Number,
  timeToExpiry: Number,
  reductionPerDay: Number,
  dynamicPricing: Boolean,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller"
  }
})



export default mongoose.model("Product", productSchema)
