import React from "react";
import { useSelector } from "react-redux";

export default function ProductDetailsList() {
  const { products } = useSelector((state: any) => state.product);
      if (!products) return <p>No product specifications available.</p>;
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Specifications</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {products.specification.material}
      </ul>
    </div>
  );
}
