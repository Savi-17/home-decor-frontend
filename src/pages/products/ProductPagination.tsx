import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryListing } from "../../store/slice/categorySlice";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductPagination() {
  const dispatch = useDispatch<any>();
  const { slug } = useParams();
  const { products } = useSelector((state: any) => state.category);

  if (!products || !products.pagination) {
    return null;
  }

  const { totalPages, currentPage } = products.pagination;

  const handleClick = (page: number) => {
    // prevent refetching the same page
    if (slug && page !== currentPage) {
      dispatch(getCategoryListing({ slug, page }));
    }
  };

  const handlePrev = () => {
    if (currentPage > 1 && slug) {
      dispatch(getCategoryListing({ slug, page: currentPage - 1 }));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && slug) {
      dispatch(getCategoryListing({ slug, page: currentPage + 1 }));
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handleClick(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="flex justify-center items-center mt-12">
      <Pagination>
        <Pagination.First onClick={() => handleClick(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={handlePrev} disabled={currentPage === 1} />
        {pages}
        <Pagination.Next onClick={handleNext} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
}
