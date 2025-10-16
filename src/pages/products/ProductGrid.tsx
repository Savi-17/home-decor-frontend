import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

export default function ProductGrid() {
  const { categories } = useSelector((state: any) => state.category);
  const { category, products } = categories;
  if (!categories || !products) return <p>No products available.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {category?.name && (
        <h2 className="col-span-full text-xl font-semibold mb-2">
          {category.name}
        </h2>
      )}
      {categories.products.map((e: any) => (
        <ProductCard key={e.id} product={e} />
      ))}
    </div>
  );
}
