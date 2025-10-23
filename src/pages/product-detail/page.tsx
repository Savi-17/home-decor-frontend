import React, { useEffect, useState } from "react";
import ProductImages from "../product-detail/ProductImages";
import ProductInfo from "../product-detail/ProductInfo";
import ProductPrice from "../product-detail/ProductPrice";
import ProductSizes from "../product-detail/ProductSizes";
import ProductActions from "../product-detail/ProductActions";
import ProductDetailsList from "../product-detail/ProductDetailsList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductListing } from "../../store/slice/productSlice";

export default function ProductDetail() {

  const { slug } = useParams();
  const dispatch = useDispatch<any>();
  const { products, productLoad, error: productError } = useSelector((state: any) => state.product);

  useEffect(() => {
    if (slug) {
      dispatch(getProductListing({ slug }));
    }
  }, [slug, dispatch]);

  if (productLoad) return <p>Loading...</p>;
  if (productError)
    return (
      <p>
        Error: {productError}
      </p>
    );
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImages />

        <div className="space-y-6">
          <ProductInfo />
          <ProductPrice />
          <ProductSizes />
          <ProductActions />
          <ProductDetailsList />
        </div>
      </div>
    </div>
  );
}
