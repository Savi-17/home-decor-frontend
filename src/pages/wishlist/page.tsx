
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Button from '../../components/base/Button';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

export default function Wishlist() {
  const { user, isLoggedIn, logout } = useAuth();
  const { addItem: addToCart, itemCount } = useCart();
  const { items: wishlistItems, removeItem, count } = useWishlist();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onLoginClick={() => {}}
        onCartClick={() => {}}
        cartCount={itemCount}
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        user={user}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-2">{count} items saved for later</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <i className="ri-heart-line text-red-500 text-2xl"></i>
            </div>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-heart-line text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Save items you love to buy them later</p>
              <Link to="/">
                <Button>
                  Continue Shopping
                  <i className="ri-arrow-right-line ml-2"></i>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="relative aspect-square overflow-hidden rounded-t-xl">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <i className="ri-close-line text-sm"></i>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-lg font-bold text-gray-900 mb-4">${item.price}</p>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        size="sm"
                        className="flex-1"
                      >
                        <i className="ri-shopping-cart-line mr-1"></i>
                        Add to Cart
                      </Button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
