
import Button from '../base/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onLoginClick: () => void;
  onCartClick: () => void;
  cartCount: number;
  isLoggedIn: boolean;
  onLogout: () => void;
  user?: { name: string };
}

export default function Header({
  onLoginClick,
  onCartClick,
  cartCount,
  isLoggedIn,
  onLogout,
  user
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const categories = {
    'Candles & Lighting': [
      'Scented Candles',
      'Decorative Candles',
      'Candle Holders',
      'LED Candles',
      'Floating Candles',
      'Pillar Candles'
    ],
    'Bath & Body': [
      'Handmade Soaps',
      'Bath Bombs',
      'Body Scrubs',
      'Essential Oils',
      'Bath Salts',
      'Lotion Bars'
    ],
    'Wall Art': [
      'Canvas Paintings',
      'Framed Prints',
      'Abstract Art',
      'Nature Paintings',
      'Portrait Art',
      'Custom Paintings'
    ],
    'Gypsum Decor': [
      'Wall Panels',
      'Ceiling Designs',
      'Decorative Moldings',
      'Gypsum Sculptures',
      '3D Wall Art',
      'Custom Designs'
    ]
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Top bar */}
      <div className="bg-lavender-50 py-2 text-center text-sm text-lavender-800 hidden md:block">
        Free shipping on orders over $50 | 30-day return policy
      </div>

      {/* Main header */}
      <div className="px-2 sm:px-4 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile layout */}
          <div className="flex md:hidden items-center justify-between mb-3">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-lavender-600 rounded-full flex items-center justify-center">
                <i className="ri-home-heart-line text-white text-lg"></i>
              </div>
              <span style={{ fontFamily: 'Pacifico, serif' }} className="text-xl text-gray-800">
                HomeDecor
              </span>
            </Link>

            {/* Mobile right section */}
            <div className="flex items-center space-x-2">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-lavender-600 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-lavender-600"></i>
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                        My Profile
                      </Link>
                      <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                        My Orders
                      </Link>
                      <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                        Wishlist
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button onClick={onLoginClick} variant="outline" size="sm">
                  Sign In
                </Button>
              )}

              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-700 hover:text-lavender-600 cursor-pointer"
              >
                <i className="ri-shopping-cart-line text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-lavender-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="md:hidden mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 text-base"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-lavender-600 cursor-pointer">
                <i className="ri-search-line text-lg"></i>
              </button>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-lavender-600 rounded-full flex items-center justify-center">
                <i className="ri-home-heart-line text-white text-xl"></i>
              </div>
              <span style={{ fontFamily: 'Pacifico, serif' }} className="text-2xl text-gray-800">
                HomeDecor
              </span>
            </Link>

            {/* Search bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for candles, soaps, paintings..."
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 text-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-lavender-600 cursor-pointer">
                  <i className="ri-search-line text-lg"></i>
                </button>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-lavender-600 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-lavender-600"></i>
                    </div>
                    <span className="text-sm font-medium">{user?.name || 'User'}</span>
                    <i className="ri-arrow-down-s-line text-sm"></i>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                        My Profile
                      </Link>
                      <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                        My Orders
                      </Link>
                      <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                        Wishlist
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button onClick={onLoginClick} variant="outline" size="sm">
                  Sign In
                </Button>
              )}

              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-700 hover:text-lavender-600 cursor-pointer"
              >
                <i className="ri-shopping-cart-line text-2xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-lavender-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-lavender-50 border-t border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8">
            <div
              className="relative"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <button className="flex items-center space-x-1 py-4 text-gray-700 hover:text-lavender-600 font-medium cursor-pointer">
                <i className="ri-menu-line"></i>
                <span>All Categories</span>
                <i className="ri-arrow-down-s-line"></i>
              </button>

              {showMegaMenu && (
                <div className="absolute left-0 top-full w-screen max-w-4xl bg-white shadow-xl border border-gray-200 z-50">
                  <div className="grid grid-cols-4 gap-6 p-6">
                    {Object.entries(categories).map(([category, items]) => (
                      <div key={category}>
                        <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                        <ul className="space-y-2">
                          {items.map((item, index) => (
                            <li key={index}>
                              <Link
                                to={`/category/${item.toLowerCase().replace(/ /g, '-')}`}
                                className="text-gray-600 hover:text-lavender-600 text-sm cursor-pointer block"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/new-arrivals" className="py-4 text-gray-700 hover:text-lavender-600 font-medium cursor-pointer">
              New Arrivals
            </Link>
            <Link to="/bestsellers" className="py-4 text-gray-700 hover:text-lavender-600 font-medium cursor-pointer">
              Best Sellers
            </Link>
            <Link to="/sale" className="py-4 text-red-600 hover:text-red-700 font-medium cursor-pointer">
              Sale
            </Link>
            <Link to="/about" className="py-4 text-gray-700 hover:text-lavender-600 font-medium cursor-pointer">
              About Us
            </Link>
            <Link to="/contact" className="py-4 text-gray-700 hover:text-lavender-600 font-medium cursor-pointer">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      <nav className="md:hidden bg-lavender-50 border-t border-gray-200">
        <div className="px-2 py-2">
          <div className="flex items-center justify-between text-xs">
            <Link to="/new-arrivals" className="px-2 py-2 text-gray-700 hover:text-lavender-600 font-medium cursor-pointer">
              New
            </Link>
            <Link to="/bestsellers" className="px-2 py-2 text-gray-700 hover:text-lavender-600 font-medium cursor-pointer">
              Best Sellers
            </Link>
            <Link to="/sale" className="px-2 py-2 text-red-600 hover:text-red-700 font-medium cursor-pointer">
              Sale
            </Link>
            <Link to="/about" className="px-2 py-2 text-gray-700 hover:text-lavender-600 font-medium cursor-pointer">
              About
            </Link>
            <Link to="/contact" className="px-2 py-2 text-gray-700 hover:text-lavender-600 font-medium cursor-pointer">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
