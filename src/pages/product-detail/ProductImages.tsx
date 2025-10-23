import React from "react";
import { useSelector } from "react-redux";

export default function ProductImages() {
  const { products } = useSelector((state: any) => state.product);
  if (!products.image) return <p>No image available.</p>;
  return (
    <div className="space-y-4">
      <img
        src={products.image[0]}
        alt={products.name}
        className="w-full h-auto rounded-lg border border-gray-200"
      />
      <div className="flex space-x-3 overflow-x-auto">
        {products.image.map((i) => (
          <img
            key={i}
            src={`https://via.placeholder.com/100?text=${i}`}
            alt={`Thumbnail ${i}`}
            className="w-20 h-20 rounded-md border border-gray-200 cursor-pointer hover:ring-2 hover:ring-gray-400"
          />
        ))}
      </div>
    </div>
  );
}
