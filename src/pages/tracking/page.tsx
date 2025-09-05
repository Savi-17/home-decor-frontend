
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { useAuth } from '../../hooks/useAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const trackingSchema = Yup.object({
  trackingNumber: Yup.string()
    .required('Tracking number is required')
    .min(8, 'Tracking number must be at least 8 characters')
});

interface TrackingInfo {
  orderNumber: string;
  trackingNumber: string;
  status: string;
  estimatedDelivery: string;
  carrier: string;
  timeline: {
    date: string;
    status: string;
    location: string;
    description: string;
  }[];
}

export default function TrackingPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const orderNumber = searchParams.get('order');

  useEffect(() => {
    if (orderNumber) {
      handleTrackOrder(orderNumber);
    }
  }, [orderNumber]);

  const mockTrackingData: { [key: string]: TrackingInfo } = {
    'HD001': {
      orderNumber: 'HD001',
      trackingNumber: 'TRK123456789',
      status: 'In Transit',
      estimatedDelivery: '2024-01-15',
      carrier: 'FedEx',
      timeline: [
        {
          date: '2024-01-10 09:00 AM',
          status: 'Order Shipped',
          location: 'Los Angeles, CA',
          description: 'Your order has been shipped from our warehouse'
        },
        {
          date: '2024-01-11 02:30 PM',
          status: 'In Transit',
          location: 'Phoenix, AZ',
          description: 'Package is in transit to destination facility'
        },
        {
          date: '2024-01-12 11:15 AM',
          status: 'In Transit',
          location: 'Denver, CO',
          description: 'Package arrived at sorting facility'
        },
        {
          date: '2024-01-13 08:45 AM',
          status: 'Out for Delivery',
          location: 'Your City',
          description: 'Package is out for delivery today'
        }
      ]
    }
  };

  const handleTrackOrder = async (trackingNumber: string) => {
    setLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const tracking = mockTrackingData[trackingNumber];
    if (tracking) {
      setTrackingInfo(tracking);
    } else {
      setError('Tracking number not found. Please check and try again.');
    }
    
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'out for delivery': return 'text-blue-600 bg-blue-100';
      case 'in transit': return 'text-yellow-600 bg-yellow-100';
      case 'order shipped': return 'text-lavender-600 bg-lavender-100';
      default: return 'text-gray-600 bg-gray-100';
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

      <div className="max-w-4xl mx-auto px-4 py-8">
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
              <Link to="/orders" className="text-gray-500 hover:text-lavender-600">Orders</Link>
            </li>
            <li>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </li>
            <li className="text-lavender-600 font-medium">Track Order</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-lavender-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-truck-line text-2xl text-lavender-600"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your tracking number to see the latest updates</p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <Formik
            initialValues={{ trackingNumber: orderNumber || '' }}
            validationSchema={trackingSchema}
            onSubmit={(values) => handleTrackOrder(values.trackingNumber)}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Field
                      type="text"
                      name="trackingNumber"
                      placeholder="Enter your tracking number (e.g., HD001)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                    />
                    <ErrorMessage name="trackingNumber" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="px-6 py-3 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 disabled:opacity-50 whitespace-nowrap cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Tracking...
                      </>
                    ) : (
                      <>
                        <i className="ri-search-line mr-2"></i>
                        Track Order
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <i className="ri-error-warning-line text-red-500 mr-3"></i>
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Tracking Results */}
        {trackingInfo && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-medium">{trackingInfo.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tracking Number</p>
                  <p className="font-medium">{trackingInfo.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carrier</p>
                  <p className="font-medium">{trackingInfo.carrier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-medium">{new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingInfo.status)}`}>
                  {trackingInfo.status}
                </span>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Tracking History</h2>
              <div className="relative">
                {trackingInfo.timeline.map((event, index) => (
                  <div key={index} className="relative flex items-start pb-8 last:pb-0">
                    <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-gray-200 last:hidden"></div>
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                      index === trackingInfo.timeline.length - 1 ? 'bg-lavender-600' : 'bg-green-500'
                    }`}>
                      <i className={`text-white text-sm ${
                        index === trackingInfo.timeline.length - 1 ? 'ri-truck-line' : 'ri-check-line'
                      }`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{event.status}</h3>
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                      <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-lavender-50 rounded-xl border border-lavender-200 p-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-lavender-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-information-line text-lavender-600"></i>
                </div>
                <div>
                  <h3 className="font-medium text-lavender-900 mb-2">Delivery Information</h3>
                  <ul className="text-sm text-lavender-700 space-y-1">
                    <li>• Package will be delivered during business hours (9 AM - 6 PM)</li>
                    <li>• Signature may be required for delivery</li>
                    <li>• You will receive an email notification when delivered</li>
                    <li>• For any delivery issues, contact our support team</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <i className="ri-customer-service-2-line mr-2 text-lavender-600"></i>
              Contact Support
            </Link>
            <Link 
              to="/orders" 
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <i className="ri-file-list-3-line mr-2 text-lavender-600"></i>
              View All Orders
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
