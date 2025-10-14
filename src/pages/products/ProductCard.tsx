import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/base/Button";

export default function ProductCard() {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <Link to="#">
          <img
            src="https://via.placeholder.com/300"
            alt="Product"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            New
          </span>
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Sale
          </span>
        </div>

        <button className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-200">
          <i className="ri-heart-line"></i>
        </button>

        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-full whitespace-nowrap" size="sm">
            <i className="ri-shopping-cart-line mr-2"></i>
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">Category</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-lavender-600">
          Product Name
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`ri-star-${i < 4 ? "fill" : "line"} text-yellow-400 text-sm`}
            ></i>
          ))}
          <span className="text-sm text-gray-500">(24)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">$39</span>
            <span className="text-sm text-gray-500 line-through">$49</span>
          </div>
        </div>
      </div>
    </div>
  );
}
