import React from "react";
import { useSelector } from "react-redux";

export default function ProductInfo() {
  const { products } = useSelector((state: any) => state.product);
    if (!products) return <p>No products available.</p>;
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900">{products.name}</h1>
      <p className="text-gray-500 mt-2">{products.description}</p>
    </div>
  );
}
