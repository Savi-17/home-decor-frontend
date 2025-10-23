import React from "react";
import { useSelector } from "react-redux";

export default function ProductSizes() {
  const { products } = useSelector((state: any) => state.product);
      if (!products) return <p>No size available.</p>;
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Size</h3>
      <div className="flex space-x-3">
        {["Small", "Medium", "Large"].map((size) => (
          <button
            key={size}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
