
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function CheckoutPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const { items: cartItems, total, itemCount, clearCart } = useCart();

  const [step, setStep] = useState(1); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [billingData, setBillingData] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentData, setPaymentData] = useState({
    method: 'card', 
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: 0 },
    { id: 'express', name: 'Express Shipping', time: '2-3 business days', price: 15.99 },
    { id: 'overnight', name: 'Overnight Shipping', time: '1 business day', price: 29.99 }
  ];

  const selectedShipping = shippingOptions.find(option => option.id === shippingMethod);
  const subtotal = total;
  const shippingCost = selectedShipping?.price || 0;
  const tax = subtotal * 0.08; 
  const discount = promoApplied ? subtotal * 0.1 : 0; 
  const finalTotal = subtotal + shippingCost + tax - discount;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
    setStep(3);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  const shippingSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    address: Yup.string()
      .required('Address is required')
      .min(5, 'Address must be at least 5 characters'),
    city: Yup.string()
      .required('City is required'),
    state: Yup.string()
      .required('State is required'),
    zipCode: Yup.string()
      .required('ZIP code is required')
      .matches(/^[0-9]{5}(-[0-9]{4})?$/, 'Invalid ZIP code format'),
    country: Yup.string()
      .required('Country is required')
  });

  const paymentSchema = Yup.object({
    cardNumber: Yup.string()
      .required('Card number is required')
      .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
    expiryDate: Yup.string()
      .required('Expiry date is required')
      .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Invalid expiry date format (MM/YY)'),
    cvv: Yup.string()
      .required('CVV is required')
      .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
    cardName: Yup.string()
      .required('Cardholder name is required')
      .min(2, 'Name must be at least 2 characters')
  });

  if (cartItems.length === 0 && !orderComplete) {
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

        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <i className="ri-shopping-cart-line text-6xl text-gray-300 mb-6"></i>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart before checkout</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>

        <Footer />
      </div>
    );
  }

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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[
              { step: 1, label: 'Shipping', icon: 'ri-truck-line' },
              { step: 2, label: 'Payment', icon: 'ri-bank-card-line' },
              { step: 3, label: 'Confirmation', icon: 'ri-check-line' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  step >= item.step 
                    ? 'bg-lavender-600 border-lavender-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <i className={item.icon}></i>
                </div>
                <span className={`ml-2 font-medium ${
                  step >= item.step ? 'text-lavender-600' : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
                {index < 2 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step > item.step ? 'bg-lavender-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-lavender-600 text-white rounded-full flex items-center justify-center mr-3">
                    <i className="ri-truck-line"></i>
                  </div>
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                </div>

                <Formik
                  initialValues={shippingData}
                  validationSchema={shippingSchema}
                  onSubmit={(values) => {
                    setShippingData(values);
                    setStep(2);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <Field
                            type="text"
                            name="firstName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                          />
                          <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <Field
                            type="text"
                            name="lastName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                          />
                          <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Field
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <Field
                            type="tel"
                            name="phone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                          />
                          <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address *
                          </label>
                          <Field
                            type="text"
                            name="address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                          />
                          <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <Field
                            type="text"
                            name="city"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                          />
                          <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State *
                          </label>
                          <Field
                            type="text"
                            name="state"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                          />
                          <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code *
                          </label>
                          <Field
                            type="text"
                            name="zipCode"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                          />
                          <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country *
                          </label>
                          <Field
                            type="text"
                            name="country"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                          />
                          <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>

                      <div className="flex justify-between mt-8">
                        <Link to="/cart" className="px-6 py-2 text-gray-600 hover:text-gray-800 cursor-pointer">
                          ← Back to Cart
                        </Link>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-lavender-600 text-white rounded-full flex items-center justify-center mr-3">
                    <i className="ri-bank-card-line"></i>
                  </div>
                  <h2 className="text-xl font-semibold">Payment Information</h2>
                </div>

                <Formik
                  initialValues={paymentData}
                  validationSchema={paymentSchema}
                  onSubmit={(values) => {
                    setPaymentData(values);
                    setStep(3);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number *
                          </label>
                          <Field
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                          />
                          <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date *
                            </label>
                            <Field
                              type="text"
                              name="expiryDate"
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                            />
                            <ErrorMessage name="expiryDate" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVV *
                            </label>
                            <Field
                              type="text"
                              name="cvv"
                              placeholder="123"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                            />
                            <ErrorMessage name="cvv" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cardholder Name *
                          </label>
                          <Field
                            type="text"
                            name="cardName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                          />
                          <ErrorMessage name="cardName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>

                      <div className="flex justify-between mt-8">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-6 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                        >
                          ← Back to Shipping
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                        >
                          Complete Order
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            {step === 3 && orderComplete && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-check-line text-3xl text-green-600"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for your purchase! Your order has been confirmed and will be shipped soon.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Order Number:</span>
                      <span className="font-medium">#HD{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span>{shippingData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-medium">${finalTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Delivery:</span>
                      <span>{selectedShipping?.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Link to="/orders">
                    <Button variant="outline">Track Order</Button>
                  </Link>
                  <Link to="/products">
                    <Button>Continue Shopping</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.variant}`} className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      {item.variant && (
                        <p className="text-xs text-gray-500">Variant: {item.variant}</p>
                      )}
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {step < 3 && (
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="text-sm"
                    />
                    <Button
                      onClick={applyPromoCode}
                      variant="outline"
                      size="sm"
                      disabled={promoApplied}
                      className="whitespace-nowrap"
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-600 mt-2">
                      <i className="ri-check-line mr-1"></i>
                      Promo code applied successfully!
                    </p>
                  )}
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {step < 3 && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-shield-check-line text-green-600 mr-2"></i>
                    Secure checkout with SSL encryption
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-refresh-line text-blue-600 mr-2"></i>
                    30-day return policy
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-customer-service-line text-amber-600 mr-2"></i>
                    24/7 customer support
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
