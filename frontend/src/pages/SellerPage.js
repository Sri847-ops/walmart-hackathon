"use client";

import { useState } from "react";
import { Search, Filter, SortAsc, Sparkles, Leaf, ShoppingBag } from "lucide-react";
import ProductListSeller from "../components/seller/ProductListSeller";

const SellerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Optionally, you can pass searchTerm/category/sortBy to ProductListSeller if it supports filtering

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
                  Seller Dashboard
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Manage your <span className="font-semibold text-green-600">eco-friendly products</span> and donations.
            </p>

            {/* Stats or badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-green-600 font-semibold">🌱 Eco Seller</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-blue-600 font-semibold">📦 Manage Inventory</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-emerald-600 font-semibold">🤝 Donate Products</span>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filter Section */}
          <div className="max-w-6xl mx-auto">
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

      {/* Seller Product List Section */}
      <div className="container mx-auto px-4 pb-16">
        <ProductListSeller />
      </div>

      {/* Bottom decoration */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent h-32"></div>
      </div>
    </div>
  );
};

export default SellerPage;
