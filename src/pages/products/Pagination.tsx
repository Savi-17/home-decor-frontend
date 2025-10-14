import React from "react";

export default function Pagination() {
  return (
    <div className="flex justify-center items-center mt-12">
      <nav className="flex items-center gap-2">
        <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          <i className="ri-arrow-left-s-line"></i> Previous
        </button>

        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? "bg-lavender-600 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Next <i className="ri-arrow-right-s-line"></i>
        </button>
      </nav>
    </div>
  );
}
