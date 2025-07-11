"use client";

import { useState } from "react";
import { Search, Filter, SortAsc, Sparkles, Leaf, ShoppingBag } from "lucide-react";
import ProductGrid from "../components/ProductGrid";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-emerald-100" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),\n                             radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            {/* Floating icons */}
            <div className="relative inline-block">
              <div className="absolute -top-8 -left-8 animate-bounce">
                <Leaf className="w-6 h-6 text-green-500 opacity-60" />
              </div>
              <div className="absolute -top-6 -right-6 animate-bounce" style={{ animationDelay: "0.5s" }}>
                <Sparkles className="w-5 h-5 text-blue-500 opacity-60" />
              </div>
              <div className="absolute -bottom-4 -left-4 animate-bounce" style={{ animationDelay: "1s" }}>
                <ShoppingBag className="w-4 h-4 text-emerald-500 opacity-60" />
              </div>

              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
                  Welcome to{" "}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-green-700">
                  GreenMart
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Shop sustainably with our <span className="font-semibold text-green-600">eco-friendly products</span>.
              Every purchase makes a difference for our planet.
            </p>

            {/* Stats or badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-green-600 font-semibold">🌱 100% Eco-Friendly</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-blue-600 font-semibold">🚚 Free Shipping</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-emerald-600 font-semibold">♻️ Carbon Neutral</span>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filter Section */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 mb-12">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative max-w-2xl mx-auto">
                  <div
                    className={`relative transition-all duration-300 ${isSearchFocused ? "transform scale-105" : ""}`}
                  >
                    <Search
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${isSearchFocused ? "text-green-500 w-6 h-6" : "text-gray-400 w-5 h-5"}`}
                    />
                    <input
                      type="text"
                      placeholder="Search for eco-friendly products..."
                      className={`w-full pl-12 pr-6 py-4 text-lg rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                        isSearchFocused
                          ? "border-green-400 bg-white shadow-lg ring-4 ring-green-100"
                          : "border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300"
                      }`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                    {/* Search suggestions indicator */}
                    {searchTerm && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
                {/* Category Filter */}
                <div className="relative group">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-hover:text-blue-500 transition-colors duration-300" />
                  <select
                    className="appearance-none bg-white border-2 border-gray-200 rounded-xl pl-10 pr-10 py-3 text-gray-700 hover:border-blue-300 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 cursor-pointer min-w-[200px]"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    <option value="Groceries">🥬 Groceries</option>
                    <option value="Personal Care">🧴 Personal Care</option>
                    <option value="Home Goods">🏠 Home Goods</option>
                    <option value="Apparel">👕 Apparel</option>
                    <option value="Kitchen">🍳 Kitchen</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Sort Filter */}
                <div className="relative group">
                  <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-hover:text-purple-500 transition-colors duration-300" />
                  <select
                    className="appearance-none bg-white border-2 border-gray-200 rounded-xl pl-10 pr-10 py-3 text-gray-700 hover:border-purple-300 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-300 cursor-pointer min-w-[200px]"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">📝 Sort by Name</option>
                    <option value="price-asc">💰 Price: Low to High</option>
                    <option value="price-desc">💎 Price: High to Low</option>
                    <option value="rating">⭐ Highest Rated</option>
                    <option value="newest">🆕 Newest First</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Active filters indicator */}
                {(category !== "All" || sortBy !== "name" || searchTerm) && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 font-medium">
                      {
                        [
                          category !== "All" && `Category: ${category}`,
                          sortBy !== "name" && "Sorted",
                          searchTerm && "Searching",
                        ].filter(Boolean).length
                      }{" "}
                      filter(s) active
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Product Grid Section */}
      <div className="container mx-auto px-4 pb-16">
        <ProductGrid searchTerm={searchTerm} category={category} sortBy={sortBy} />
      </div>

      {/* Bottom decoration */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent h-32"></div>
      </div>
    </div>
  );
};

export default HomePage;
