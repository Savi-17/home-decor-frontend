import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Button from '../../components/base/Button';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { allProducts } from '../../mocks/products';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoggedIn, logout } = useAuth();
  const { addItem: addToCart, itemCount } = useCart();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === id);
    if (foundProduct) {
      // Add additional product details
      const detailedProduct = {
        ...foundProduct,
        images: [
          foundProduct.image,
          foundProduct.image.replace('&seq=', '&seq=detail1-'),
          foundProduct.image.replace('&seq=', '&seq=detail2-'),
          foundProduct.image.replace('&seq=', '&seq=detail3-')
        ],
        video: foundProduct.image.replace('search-image', 'search-video').replace('&seq=', '&seq=video-'),
        description: 'Experience the perfect blend of luxury and functionality with this handcrafted piece. Made from premium materials and designed with attention to every detail, this item will elevate your home decor to new heights.',
        features: [
          'Premium quality materials',
          'Handcrafted with care',
          'Eco-friendly production',
          'Long-lasting durability',
          'Easy maintenance',
          'Satisfaction guaranteed'
        ],
        specifications: {
          'Material': foundProduct.category === 'Candles' ? 'Soy Wax, Cotton Wick' : 
                     foundProduct.category === 'Soaps' ? 'Natural Oils, Plant Extracts' :
                     foundProduct.category === 'Paintings' ? 'Canvas, Acrylic Paint' : 
                     'High-Grade Gypsum',
          'Dimensions': foundProduct.category === 'Candles' ? '4" x 6"' : 
                       foundProduct.category === 'Soaps' ? '3" x 2" x 1"' :
                       foundProduct.category === 'Paintings' ? '24" x 36"' : 
                       '12" x 18"',
          'Weight': foundProduct.category === 'Candles' ? '12 oz' : 
                   foundProduct.category === 'Soaps' ? '4 oz' :
                   foundProduct.category === 'Paintings' ? '2 lbs' : 
                   '5 lbs',
          'Care Instructions': foundProduct.category === 'Candles' ? 'Trim wick before use' : 
                              foundProduct.category === 'Soaps' ? 'Keep dry between uses' :
                              foundProduct.category === 'Paintings' ? 'Dust gently with soft cloth' : 
                              'Clean with damp cloth'
        },
        variants: foundProduct.category === 'Candles' ? ['Small', 'Medium', 'Large'] :
                  foundProduct.category === 'Soaps' ? ['Lavender', 'Rose', 'Eucalyptus'] :
                  foundProduct.category === 'Paintings' ? ['Framed', 'Unframed'] :
                  ['Standard', 'Premium'],
        shippingDays: Math.floor(Math.random() * 5) + 3,
        inStock: true,
        stockCount: Math.floor(Math.random() * 50) + 10
      };
      setProduct(detailedProduct);
      setSelectedVariant(detailedProduct.variants[0]);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-amber-600 animate-spin mb-4"></i>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: selectedVariant
    }, quantity);
  };

  const relatedProducts = allProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

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

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-amber-600 cursor-pointer">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/products" className="hover:text-amber-600 cursor-pointer">Products</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img 
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setShowImageModal(true)}
              />
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors cursor-pointer"
              >
                <i className="ri-fullscreen-line text-gray-700"></i>
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                    selectedImage === index ? 'border-amber-600' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Product Video */}
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
              <iframe
                src={product.video}
                title="Product Video"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-amber-600 font-medium mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-yellow-400 text-lg`}></i>
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
                <Link to="#reviews" className="text-amber-600 hover:text-amber-700 cursor-pointer">
                  Write a review
                </Link>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Variant</h3>
              <div className="flex gap-3">
                {product.variants.map((variant: string) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors cursor-pointer whitespace-nowrap ${
                      selectedVariant === variant
                        ? 'border-amber-600 bg-amber-50 text-amber-600'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <span className="px-4 py-2 min-w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stockCount} items in stock
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 whitespace-nowrap"
                size="lg"
              >
                <i className="ri-shopping-cart-line mr-2"></i>
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <button
                onClick={() => toggleWishlist({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category
                })}
                className={`px-4 py-3 rounded-lg border-2 transition-colors cursor-pointer ${
                  isInWishlist(product.id)
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-300 hover:border-red-300 text-gray-700 hover:text-red-500'
                }`}
              >
                <i className={`ri-heart-${isInWishlist(product.id) ? 'fill' : 'line'} text-xl`}></i>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <i className="ri-truck-line text-amber-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Estimated Shipping</h4>
                  <p className="text-gray-600">
                    {product.shippingDays}-{product.shippingDays + 2} business days
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Free shipping on orders over $50
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="text-center">
                <i className="ri-shield-check-line text-2xl text-green-600 mb-2"></i>
                <p className="text-sm text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <i className="ri-refresh-line text-2xl text-blue-600 mb-2"></i>
                <p className="text-sm text-gray-600">30-Day Returns</p>
              </div>
              <div className="text-center">
                <i className="ri-award-line text-2xl text-amber-600 mb-2"></i>
                <p className="text-sm text-gray-600">Quality Guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description', icon: 'ri-file-text-line' },
                { id: 'specifications', label: 'Specifications', icon: 'ri-settings-line' },
                { id: 'reviews', label: 'Reviews', icon: 'ri-star-line' },
                { id: 'shipping', label: 'Shipping & Returns', icon: 'ri-truck-line' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-amber-600 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <i className={tab.icon}></i>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg mb-6">{product.description}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <i className="ri-check-line text-green-600"></i>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-600">{value as string}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{product.rating}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-yellow-400`}></i>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">Based on {product.reviews} reviews</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    {[5, 4, 3, 2, 1].map(rating => {
                      const percentage = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1;
                      return (
                        <div key={rating} className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 w-12">{rating} star</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: 'Sarah Johnson',
                      rating: 5,
                      date: '2024-01-15',
                      comment: 'Absolutely love this product! The quality is outstanding and it looks perfect in my living room.',
                      verified: true
                    },
                    {
                      name: 'Mike Chen',
                      rating: 4,
                      date: '2024-01-10',
                      comment: 'Great quality and fast shipping. Would definitely recommend to others.',
                      verified: true
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-600 font-medium">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-gray-900">{review.name}</h4>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`ri-star-${i < review.rating ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Standard Shipping</h4>
                      <p className="text-gray-600 mb-2">5-7 business days</p>
                      <p className="text-gray-600">Free on orders over $50</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Express Shipping</h4>
                      <p className="text-gray-600 mb-2">2-3 business days</p>
                      <p className="text-gray-600">$15.99</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Return Policy</h3>
                  <div className="prose text-gray-600">
                    <p>We offer a 30-day return policy for all items. Items must be returned in their original condition with all packaging materials.</p>
                    <h4 className="font-medium text-gray-900 mt-4 mb-2">Terms and Conditions:</h4>
                    <ul>
                      <li>Items must be unused and in original packaging</li>
                      <li>Return shipping costs are responsibility of the customer</li>
                      <li>Refunds will be processed within 5-7 business days</li>
                      <li>Custom or personalized items cannot be returned</li>
                      <li>Original shipping costs are non-refundable</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="group cursor-pointer">
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                      <img 
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-1">{relatedProduct.category}</p>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`ri-star-${i < Math.floor(relatedProduct.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({relatedProduct.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">${relatedProduct.price}</span>
                        {relatedProduct.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${relatedProduct.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
            <img 
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <div className="flex justify-center mt-4 gap-2">
              {product.images.map((_: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    selectedImage === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}