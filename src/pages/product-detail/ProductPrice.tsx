import React from "react";
import { useSelector } from "react-redux";

export default function ProductPrice() {
   const { products } = useSelector((state: any) => state.product);
      if (!products.price) return <p>No price available.</p>;
  return (
    <div className="flex items-center space-x-3">
      <p className="text-2xl font-semibold text-gray-900">*{products.price-200}</p>
      <p className="text-gray-400 line-through">{products.price}</p>
      <span className="text-green-600 font-medium">*38% off</span>
    </div>
  );
}
