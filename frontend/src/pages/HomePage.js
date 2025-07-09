import { useState } from "react";
import ProductGrid from "../components/ProductGrid";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-foreground mb-4 tracking-tight">
          Welcome to GreenMart
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Shop sustainably with our eco-friendly products. Every purchase makes a
          difference.
        </p>
      </div>
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-border rounded-md px-4 py-2 w-1/3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center space-x-4">
          <select
            className="border border-border rounded-md px-4 py-2"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Groceries">Groceries</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Apparel">Apparel</option>
            <option value="Kitchen">Kitchen</option>
          </select>
          <select
            className="border border-border rounded-md px-4 py-2"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <ProductGrid searchTerm={searchTerm} category={category} sortBy={sortBy} />
    </div>
  );
};

export default HomePage;
