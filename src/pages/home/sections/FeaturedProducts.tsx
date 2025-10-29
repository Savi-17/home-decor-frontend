import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../../../components/base/Button";
import { useCart } from "../../../hooks/useCart";
import WishlistButton from "./WishlistButton";
import ProductBadges from "./ProductsBadges";

export default function FeaturedProducts() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(
        "api/products/productsWithFilter?filter=isFeatured"
      );
      setProducts(response.data.data);
    } catch (err) {
      setError("Failed to fetch featured products");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Featured Products</h2>
          <Link to="/ProductGrid">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image[0] || ""}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <ProductBadges isNew={product.isNew} onSale={product.onSale} />
                <WishlistButton product={product} />
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      })
                    }
                    size="sm"
                    className="w-full"
                  >
                    <i className="ri-shopping-cart-line mr-2"></i> Add to Cart
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-semibold mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <span className="text-lg font-bold">₹{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
