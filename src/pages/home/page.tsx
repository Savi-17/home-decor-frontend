
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Button from '../../components/base/Button';
import Modal from '../../components/base/Modal';
import Input from '../../components/base/Input';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { featuredProducts, categories } from '../../mocks/products';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user, isLoggedIn, login, register, logout } = useAuth();
  const { items: cartItems, addItem: addToCart, itemCount, updateQuantity, removeItem } = useCart();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlist();

  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  // Coupon states
  const [selectedCoupon, setSelectedCoupon] = useState('');
  const [manualPromo, setManualPromo] = useState('');

  const availableCoupons = [
    { code: 'SAVE10', discount: 10, description: '10% off your order' },
    { code: 'WELCOME15', discount: 15, description: '15% off for new customers' },
    { code: 'LAVENDER20', discount: 20, description: '20% off lavender collection' },
    { code: 'FREESHIP', discount: 0, description: 'Free shipping on any order', freeShipping: true }
  ];

  const applyCoupon = (couponCode: string) => {
    setSelectedCoupon(couponCode);
    setManualPromo('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const selectedCouponData = availableCoupons.find(c => c.code === selectedCoupon);
  const discount = selectedCouponData ? (subtotal * selectedCouponData.discount / 100) : 0;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);
      setShowLogin(false);
      setLoginData({ email: '', password: '' });
    } catch (error) {
      console.error('Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(registerData.name, registerData.email, registerData.password);
      setShowLogin(false);
      setRegisterData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onLoginClick={() => setShowLogin(true)}
        onCartClick={() => setShowCart(true)}
        cartCount={itemCount}
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        user={user}
      />

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(108, 43, 217, 0.3), rgba(167, 115, 255, 0.3)), url('https://readdy.ai/api/search-image?query=Luxurious%20lavender%20themed%20home%20decor%20interior%20with%20candles%20paintings%20and%20elegant%20furniture%2C%20warm%20ambient%20lighting%2C%20sophisticated%20living%20space%2C%20modern%20home%20decoration%20inspiration%2C%20cozy%20atmosphere%20with%20premium%20decor%20items%2C%20purple%20lavender%20color%20scheme&width=1920&height=1080&seq=hero1&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-lavender-900/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="w-full max-w-2xl text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Your
              <span className="block text-lavender-300">Home</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Discover our curated collection of handcrafted candles, artisan soaps, 
              stunning paintings, and elegant gypsum decor to create your perfect sanctuary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" className="text-lg px-8 py-4 whitespace-nowrap">
                  Shop Collection
                  <i className="ri-arrow-right-line ml-2"></i>
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900 whitespace-nowrap">
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our carefully curated collections designed to transform every corner of your home
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to="/products" className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{category.count} Products</p>
                    <Button variant="outline" size="sm" className="w-full whitespace-nowrap">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-gray-600 text-lg">Handpicked items that make your space extraordinary</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="whitespace-nowrap">
                View All Products
                <i className="ri-arrow-right-line ml-2"></i>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
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
                    onClick={() => toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category
                    })}
                    className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isInWishlist(product.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <i className={isInWishlist(product.id) ? 'ri-heart-fill' : 'ri-heart-line'}></i>
                  </button>

                  {/* Quick add to cart */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      })}
                      className="w-full whitespace-nowrap"
                      size="sm"
                    >
                      <i className="ri-shopping-cart-line mr-2"></i>
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <Link to={`/product/${product.id}`} className="cursor-pointer">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-lavender-600">{product.name}</h3>
                  </Link>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(108, 43, 217, 0.6), rgba(167, 115, 255, 0.6)), url('https://readdy.ai/api/search-image?query=Cozy%20lavender%20themed%20home%20interior%20with%20candles%20and%20decorative%20items%2C%20warm%20lighting%2C%20comfortable%20living%20space%2C%20elegant%20home%20decor%20setup%2C%20inviting%20atmosphere%2C%20purple%20lavender%20color%20scheme&width=1920&height=600&seq=cta1&orientation=landscape')`
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-5xl font-bold mb-6">Create Your Dream Space</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join thousands of happy customers who have transformed their homes with our premium decor collection
          </p>
          <Link to="/products">
            <Button size="lg" className="text-lg px-8 py-4 whitespace-nowrap">
              Start Shopping Today
              <i className="ri-sparkle-line ml-2"></i>
            </Button>
          </Link>
        </div>
      </section>

      {/* Login Modal */}
      <Modal 
        isOpen={showLogin} 
        onClose={() => {
          setShowLogin(false);
          setIsRegistering(false);
        }}
        title={isRegistering ? 'Create Account' : 'Sign In'}
      >
        {!isRegistering ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required
            />
            <Button type="submit" className="w-full whitespace-nowrap">
              Sign In
            </Button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="text-lavender-600 hover:text-lavender-700 cursor-pointer"
              >
                Create one
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              type="text"
              placeholder="Full name"
              value={registerData.name}
              onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
              required
            />
            <Input
              type="email"
              placeholder="Email address"
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
              required
            />
            <Button type="submit" className="w-full whitespace-nowrap">
              Create Account
            </Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="text-lavender-600 hover:text-lavender-700 cursor-pointer"
              >
                Sign in
              </button>
            </p>
          </form>
        )}
      </Modal>

      {/* Enhanced Cart Modal with Coupon Selection */}
      <Modal 
        isOpen={showCart} 
        onClose={() => setShowCart(false)}
        title="Shopping Cart"
        size="lg"
      >
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <i className="ri-shopping-cart-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button onClick={() => setShowCart(false)} className="whitespace-nowrap">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div>
            <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                      >
                        <i className="ri-subtract-line text-sm"></i>
                      </button>
                      <span className="text-sm px-2">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                      >
                        <i className="ri-add-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeItem(item.id, item.variant)}
                      className="text-red-500 hover:text-red-700 text-sm cursor-pointer mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Available Coupons Section */}
            <div className="mb-6 p-4 bg-lavender-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Available Coupons</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {availableCoupons.map((coupon) => (
                  <div 
                    key={coupon.code}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedCoupon === coupon.code 
                        ? 'border-lavender-500 bg-lavender-100' 
                        : 'border-gray-200 hover:border-lavender-300'
                    }`}
                    onClick={() => applyCoupon(coupon.code)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-lavender-700">{coupon.code}</span>
                        <p className="text-xs text-gray-600">{coupon.description}</p>
                      </div>
                      {selectedCoupon === coupon.code && (
                        <i className="ri-check-line text-lavender-600"></i>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Manual promo code input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={manualPromo}
                  onChange={(e) => setManualPromo(e.target.value)}
                  className="text-sm"
                />
                <Button
                  onClick={() => applyCoupon(manualPromo)}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {selectedCouponData && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount ({selectedCouponData.code}):</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span>${(subtotal - discount).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 whitespace-nowrap" onClick={() => setShowCart(false)}>
                  Continue Shopping
                </Button>
                <Link to="/checkout" className="flex-1">
                  <Button className="w-full whitespace-nowrap" onClick={() => setShowCart(false)}>
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
