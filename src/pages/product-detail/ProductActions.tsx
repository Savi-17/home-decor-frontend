import React from "react";

export default function ProductActions() {
  return (
    <div className="flex space-x-4">
      <button className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800">
        Add to Cart
      </button>
      <button className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100">
        Buy Now
      </button>
    </div>
  );
}
