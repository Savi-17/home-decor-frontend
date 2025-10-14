import React from "react";

export default function FiltersSidebar() {
  return (
    <div className="lg:w-64">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button className="text-sm text-lavender-600 hover:text-lavender-700">
            Reset All
          </button>
        </div>

        {/* Category */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {["All", "Candles", "Soaps", "Paintings", "Gypsum"].map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  className="w-4 h-4 text-lavender-600 border-gray-300 focus:ring-lavender-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Min Price: $0</label>
              <input
                type="range"
                min="0"
                max="500"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Max Price: $500</label>
              <input
                type="range"
                min="0"
                max="500"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Filters</h4>
          <div className="space-y-2">
            {["On Sale", "New Arrivals", "Free Shipping"].map((filter) => (
              <label key={filter} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-lavender-600 border-gray-300 focus:ring-lavender-500"
                />
                <span className="ml-2 text-sm text-gray-700">{filter}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
