
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <i className="ri-home-heart-line text-white text-lg"></i>
              </div>
              <span style={{ fontFamily: '"Pacifico", serif' }} className="text-xl">
                HomeDecor
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Transform your space with our premium collection of handcrafted home decor items.
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full cursor-pointer hover:bg-amber-600 transition-colors">
                <i className="ri-facebook-fill"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full cursor-pointer hover:bg-amber-600 transition-colors">
                <i className="ri-instagram-line"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full cursor-pointer hover:bg-amber-600 transition-colors">
                <i className="ri-twitter-fill"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full cursor-pointer hover:bg-amber-600 transition-colors">
                <i className="ri-pinterest-line"></i>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-amber-400 cursor-pointer">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 cursor-pointer">Contact</Link></li>
              <li><Link to="/shipping" className="hover:text-amber-400 cursor-pointer">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-amber-400 cursor-pointer">Returns</Link></li>
              <li><Link to="/faq" className="hover:text-amber-400 cursor-pointer">FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/candles" className="hover:text-amber-400 cursor-pointer">Candles</Link></li>
              <li><Link to="/soaps" className="hover:text-amber-400 cursor-pointer">Soaps</Link></li>
              <li><Link to="/paintings" className="hover:text-amber-400 cursor-pointer">Paintings</Link></li>
              <li><Link to="/gypsum" className="hover:text-amber-400 cursor-pointer">Gypsum Decor</Link></li>
              <li><Link to="/lighting" className="hover:text-amber-400 cursor-pointer">Lighting</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
              <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-r-lg transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-send-plane-line"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 HomeDecor. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-amber-400 text-sm cursor-pointer">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-amber-400 text-sm cursor-pointer">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
