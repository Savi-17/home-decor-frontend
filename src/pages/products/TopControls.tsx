import React from "react";

export default function TopControls() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex items-center gap-4">
        <button className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <i className="ri-filter-line"></i>
          Filters
        </button>
        <p className="text-gray-600">Showing 1–12 of 48 products</p>
      </div>

      <div className="flex items-center gap-4">
        {/* View Toggle */}
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <button className="px-3 py-2 bg-lavender-600 text-white">
            <i className="ri-grid-line"></i>
          </button>
          <button className="px-3 py-2 text-gray-600 hover:bg-gray-50">
            <i className="ri-list-check"></i>
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button className="flex items-center justify-between min-w-48 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white hover:bg-gray-50">
            <span>Featured</span>
            <i className="ri-arrow-down-s-line ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
