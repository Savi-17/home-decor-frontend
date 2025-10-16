import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import FiltersSidebar from "./FiltersSidebar";
import TopControls from "./TopControls";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryListing } from "../../store/slice/categorySlice";

export default function Products() {

  const { slug } = useParams();
  const dispatch = useDispatch<any>();
  const { categoryLoad, categories, error } = useSelector((state: any) => state.category);

  useEffect(() => {
    if (slug) {
      dispatch(getCategoryListing(slug));
    }
  }, [slug, dispatch]);

  if (categoryLoad) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!categories) return null;

  const selectedCategory = Array.isArray(categories)
    ? (slug ? categories.find((c: any) => c.slug === slug) || categories[0] : categories[0])
    : categories;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FiltersSidebar />

          <div className="flex-1">
            <TopControls />
            <ProductGrid category={selectedCategory} />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
