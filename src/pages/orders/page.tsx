
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { useAuth } from '../../hooks/useAuth';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  trackingNumber?: string;
}

export default function OrdersPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'HD001',
      date: '2024-01-10',
      status: 'Shipped',
      total: 159.99,
      trackingNumber: 'TRK123456789',
      items: [
        {
          id: '1',
          name: 'Lavender Candle Set',
          image: 'https://readdy.ai/api/search-image?query=elegant%20lavender%20scented%20candle%20set%20with%20minimalist%20white%20packaging%20on%20clean%20white%20background%20soft%20purple%20accents%20luxury%20home%20decor%20style%20professional%20product%20photography&width=300&height=300&seq=ord1&orientation=squarish',
          quantity: 2,
          price: 49.99
        },
        {
          id: '2',
          name: 'Handmade Soap Collection',
          image: 'https://readdy.ai/api/search-image?query=artisanal%20handmade%20soap%20collection%20natural%20ingredients%20beautiful%20packaging%20clean%20white%20background%20organic%20skincare%20products%20professional%20photography&width=300&height=300&seq=ord2&orientation=squarish',
          quantity: 1,
          price: 59.99
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    },
    {
      id: '2',
      orderNumber: 'HD002',
      date: '2024-01-08',
      status: 'Delivered',
      total: 289.99,
      items: [
        {
          id: '3',
          name: 'Abstract Wall Art',
          image: 'https://readdy.ai/api/search-image?query=modern%20abstract%20wall%20art%20painting%20geometric%20shapes%20lavender%20purple%20tones%20contemporary%20home%20decor%20clean%20background%20artistic%20design&width=300&height=300&seq=ord3&orientation=squarish',
          quantity: 1,
          price: 199.99
        },
        {
          id: '4',
          name: 'Essential Oil Diffuser',
          image: 'https://readdy.ai/api/search-image?query=modern%20essential%20oil%20diffuser%20white%20ceramic%20minimalist%20design%20aromatherapy%20device%20clean%20white%20background%20home%20wellness%20product&width=300&height=300&seq=ord4&orientation=squarish',
          quantity: 1,
          price: 89.99
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    },
    {
      id: '3',
      orderNumber: 'HD003',
      date: '2024-01-05',
      status: 'Processing',
      total: 79.99,
      items: [
        {
          id: '5',
          name: 'Bath Bomb Set',
          image: 'https://readdy.ai/api/search-image?query=colorful%20bath%20bomb%20set%20natural%20ingredients%20spa%20relaxation%20products%20beautiful%20packaging%20clean%20white%20background%20wellness%20skincare&width=300&height=300&seq=ord5&orientation=squarish',
          quantity: 3,
          price: 26.66
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    }
  ];

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'total-desc':
        return b.total - a.total;
      case 'total-asc':
        return a.total - b.total;
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'ri-check-double-line';
      case 'shipped': return 'ri-truck-line';
      case 'processing': return 'ri-time-line';
      case 'cancelled': return 'ri-close-circle-line';
      default: return 'ri-file-list-line';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onLoginClick={() => {}}
        onCartClick={() => {}}
        cartCount={0}
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        user={user}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-gray-500 hover:text-lavender-600">Home</Link>
            </li>
            <li>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </li>
            <li>
              <Link to="/profile" className="text-gray-500 hover:text-lavender-600">Profile</Link>
            </li>
            <li>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </li>
            <li className="text-lavender-600 font-medium">Order History</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
            <p className="text-gray-600">View and track all your orders</p>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="total-desc">Highest Amount</option>
              <option value="total-asc">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {sortedOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Order Number</p>
                      <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date Placed</p>
                      <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        <i className={`${getStatusIcon(order.status)} mr-1`}></i>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {order.trackingNumber && (
                      <Link
                        to={`/tracking?order=${order.orderNumber}`}
                        className="px-4 py-2 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 cursor-pointer whitespace-nowrap text-sm"
                      >
                        <i className="ri-truck-line mr-1"></i>
                        Track Order
                      </Link>
                    )}
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap text-sm">
                      <i className="ri-download-line mr-1"></i>
                      Invoice
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Items Ordered</h3>
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-gray-500 text-sm">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                      <div className="text-gray-600 text-sm">
                        <p className="font-medium">{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap text-sm">
                        <i className="ri-shopping-cart-line mr-1"></i>
                        Reorder
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap text-sm">
                        <i className="ri-customer-service-2-line mr-1"></i>
                        Get Help
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-list-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === 'all' 
                ? "You haven't placed any orders yet" 
                : `No ${filterStatus} orders found`
              }
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 cursor-pointer"
            >
              <i className="ri-shopping-bag-line mr-2"></i>
              Start Shopping
            </Link>
          </div>
        )}

        {/* Pagination */}
        {sortedOrders.length > 0 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <button className="px-3 py-2 bg-lavender-600 text-white rounded-lg">1</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">2</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">3</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </nav>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
