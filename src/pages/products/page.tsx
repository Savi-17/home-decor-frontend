import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import Button from "../../components/base/Button";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { allProducts } from "../../mocks/products";

export default function Products() {
  const { user, isLoggedIn, logout } = useAuth();
  const { addItem: addToCart, itemCount } = useCart();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlist();

  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const productsPerPage = 12;

  const categories = ["all", "Candles", "Soaps", "Paintings", "Gypsum"];
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
  ];

  useEffect(() => {
    let filtered = allProducts;

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Keep original order for featured
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePriceChange = (type: "min" | "max", value: number) => {
    setPriceRange((prev) => ({ ...prev, [type]: value }));
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange({ min: 0, max: 500 });
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onLoginClick={() => {}}
        onCartClick={() => {}}
        cartCount={itemCount}
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        user={user}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-lavender-50 to-lavender-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Product Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover premium home decor items crafted with love and attention
              to detail
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Fixed for mobile */}
          <div
            className={`lg:w-64 ${showFilters ? "block" : "hidden"} lg:block`}
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6 lg:sticky lg:top-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetFilters}
                    className="text-sm text-lavender-600 hover:text-lavender-700 cursor-pointer"
                  >
                    Reset All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Category
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-lavender-600 border-gray-300 focus:ring-lavender-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {category === "all" ? "All Categories" : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Price Range
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Min Price: ${priceRange.min}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange.min}
                      onChange={(e) =>
                        handlePriceChange("min", Number(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Max Price: ${priceRange.max}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange.max}
                      onChange={(e) =>
                        handlePriceChange("max", Number(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Quick Filters
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-lavender-600 border-gray-300 focus:ring-lavender-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">On Sale</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-lavender-600 border-gray-300 focus:ring-lavender-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      New Arrivals
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-lavender-600 border-gray-300 focus:ring-lavender-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Free Shipping
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <i className="ri-filter-line"></i>
                  Filters
                </button>
                <p className="text-gray-600">
                  Showing {startIndex + 1}-
                  {Math.min(
                    startIndex + productsPerPage,
                    filteredProducts.length
                  )}{" "}
                  of {filteredProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-lavender-600 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <i className="ri-grid-line"></i>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 cursor-pointer ${
                      viewMode === "list"
                        ? "bg-lavender-600 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <i className="ri-list-check"></i>
                  </button>
                </div>

                {/* Custom Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center justify-between min-w-48 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span>
                      {
                        sortOptions.find((option) => option.value === sortBy)
                          ?.label
                      }
                    </span>
                    <i
                      className={`ri-arrow-down-s-line ml-2 transition-transform ${
                        showSortDropdown ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>

                  {showSortDropdown && (
                    <div className="absolute right-0 top-full mt-1 min-w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-lavender-50 cursor-pointer transition-colors first:rounded-t-lg last:rounded-b-lg ${
                            sortBy === option.value
                              ? "bg-lavender-100 text-lavender-700 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            New
                          </span>
                        )}
                        {product.onSale && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Wishlist button */}
                      <button
                        onClick={() =>
                          toggleWishlist({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            category: product.category,
                          })
                        }
                        className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                          isInWishlist(product.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                        }`}
                      >
                        <i
                          className={
                            isInWishlist(product.id)
                              ? "ri-heart-fill"
                              : "ri-heart-line"
                          }
                        ></i>
                      </button>

                      {/* Quick add to cart */}
                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                            })
                          }
                          className="w-full whitespace-nowrap"
                          size="sm"
                        >
                          <i className="ri-shopping-cart-line mr-2"></i>
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        {product.category}
                      </p>
                      <Link
                        to={`/product/${product.id}`}
                        className="cursor-pointer"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-lavender-600">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`ri-star-${
                                i < Math.floor(product.rating) ? "fill" : "line"
                              } text-yellow-400 text-sm`}
                            ></i>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-64 h-64 sm:h-48 flex-shrink-0">
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isNew && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              New
                            </span>
                          )}
                          {product.onSale && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Sale
                            </span>
                          )}
                        </div>

                        {/* Wishlist button */}
                        <button
                          onClick={() =>
                            toggleWishlist({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              category: product.category,
                            })
                          }
                          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                            isInWishlist(product.id)
                              ? "bg-red-500 text-white"
                              : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                          }`}
                        >
                          <i
                            className={
                              isInWishlist(product.id)
                                ? "ri-heart-fill"
                                : "ri-heart-line"
                            }
                          ></i>
                        </button>
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <p className="text-sm text-lavender-600 font-medium mb-2">
                              {product.category}
                            </p>
                            <Link
                              to={`/product/${product.id}`}
                              className="cursor-pointer"
                            >
                              <h3 className="text-xl font-bold text-gray-900 hover:text-lavender-600 transition-colors mb-3 leading-tight">
                                {product.name}
                              </h3>
                            </Link>

                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={`ri-star-${
                                      i < Math.floor(product.rating)
                                        ? "fill"
                                        : "line"
                                    } text-yellow-400 text-base`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-sm text-gray-500 font-medium">
                                ({product.reviews} reviews)
                              </span>
                            </div>

                            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                              {product.description}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-bold text-gray-900">
                                ${product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                              {product.onSale && (
                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                                  Save $
                                  {(
                                    product.originalPrice! - product.price
                                  ).toFixed(2)}
                                </span>
                              )}
                            </div>
                            <Button
                              onClick={() =>
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  image: product.image,
                                })
                              }
                              className="whitespace-nowrap w-full sm:w-auto"
                              size="lg"
                            >
                              <i className="ri-shopping-cart-line mr-2"></i>
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg cursor-pointer ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <i className="ri-arrow-left-s-line"></i>
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === currentPage;

                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg cursor-pointer ${
                            isCurrentPage
                              ? "bg-lavender-600 text-white"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 3 ||
                      page === currentPage + 3
                    ) {
                      return (
                        <span key={page} className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg cursor-pointer ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
