import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import FiltersSidebar from "./FiltersSidebar";
import TopControls from "./TopControls";
import ProductGrid from "./ProductGrid";
import ProductPagination from "./ProductPagination";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryListing } from "../../store/slice/categorySlice";
export default function Products() {

  const { slug } = useParams();
  const { parentId } = useParams();
  const dispatch = useDispatch<any>();
  const { category, products, categoryLoad, error: categoryError } = useSelector((state: any) => state.category);

  useEffect(() => {
    if (slug) {
      dispatch(getCategoryListing({ slug }));
    }
  }, [slug, dispatch]);

  if (categoryLoad) return <p>Loading...</p>;
  if (categoryError)
    return (
      <p>
        Error: {categoryError}
      </p>
    );
  if (!products) return null;
  
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FiltersSidebar />

          <div className="flex-1">
             <TopControls />
            <ProductGrid />
            <ProductPagination />
          </div>
        </div>
      </div>
    </div>
  );
}
