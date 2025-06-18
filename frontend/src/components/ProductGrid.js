import ProductCard from "./ProductCard"

const products = [
  {
    id: 1,
    name: "Organic Green Tea",
    price: 12.99,
    description: "Fresh organic green tea leaves, no preservatives.",
    packaging: "Compostable paper",
    shipping: "Local delivery",
  },
  {
    id: 2,
    name: "Plastic Water Bottle",
    price: 1.99,
    description: "Single-use plastic bottle with mineral water.",
    packaging: "Plastic",
    shipping: "International",
  },
  {
    id: 3,
    name: "Bamboo Toothbrush",
    price: 8.99,
    description: "Biodegradable bamboo handle with soft charcoal bristles.",
    packaging: "Recyclable cardboard",
    shipping: "Local",
  },
  {
    id: 4,
    name: "LED Light Bulb",
    price: 15.99,
    description: "Energy-efficient LED bulb, 10-year lifespan.",
    packaging: "Recyclable cardboard",
    shipping: "Standard",
  },
  {
    id: 5,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    description: "100% organic cotton, fair trade certified.",
    packaging: "Biodegradable bag",
    shipping: "Carbon-neutral",
  },
  {
    id: 6,
    name: "Reusable Water Bottle",
    price: 19.99,
    description: "Stainless steel, BPA-free, keeps drinks cold for 24 hours.",
    packaging: "Minimal cardboard",
    shipping: "Local",
  },
]

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
