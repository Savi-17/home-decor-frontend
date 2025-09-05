
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { useAuth } from '../../hooks/useAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const profileSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  birthDate: Yup.date()
    .max(new Date(), 'Birth date cannot be in the future'),
  gender: Yup.string().oneOf(['male', 'female', 'other'], 'Please select a gender')
});

const passwordSchema = Yup.object({
  currentPassword: Yup.string()
    .required('Current password is required')
    .min(6, 'Password must be at least 6 characters'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters')
    .notOneOf([Yup.ref('currentPassword')], 'New password must be different from current password'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
});

export default function ProfilePage() {
  const { user, isLoggedIn, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    phone: '(555) 123-4567',
    birthDate: '1990-01-01',
    gender: 'male'
  };

  const handleProfileSubmit = async (values: any) => {
    console.log('Profile updated:', values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Profile updated successfully!');
  };

  const handlePasswordSubmit = async (values: any) => {
    console.log('Password changed:', values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Password changed successfully!');
    setShowPasswordForm(false);
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
            <li className="text-lavender-600 font-medium">My Profile</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-lavender-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-user-line text-3xl text-lavender-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                    activeTab === 'profile' ? 'bg-lavender-100 text-lavender-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <i className="ri-user-line mr-3"></i>
                  Profile Information
                </button>
                <Link
                  to="/orders"
                  className="w-full text-left px-4 py-3 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100 block"
                >
                  <i className="ri-file-list-3-line mr-3"></i>
                  Order History
                </Link>
                <Link
                  to="/address"
                  className="w-full text-left px-4 py-3 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100 block"
                >
                  <i className="ri-map-pin-line mr-3"></i>
                  Addresses
                </Link>
                <Link
                  to="/wishlist"
                  className="w-full text-left px-4 py-3 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100 block"
                >
                  <i className="ri-heart-line mr-3"></i>
                  Wishlist
                </Link>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                    activeTab === 'notifications' ? 'bg-lavender-100 text-lavender-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <i className="ri-notification-line mr-3"></i>
                  Notifications
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    <button
                      onClick={() => setShowPasswordForm(!showPasswordForm)}
                      className="text-lavender-600 hover:text-lavender-700 cursor-pointer"
                    >
                      <i className="ri-key-line mr-1"></i>
                      Change Password
                    </button>
                  </div>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={profileSchema}
                    onSubmit={handleProfileSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <Field
                              type="text"
                              name="name"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
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
                              type="text"
                              name="phone"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                            />
                            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date of Birth
                            </label>
                            <Field
                              type="date"
                              name="birthDate"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                            />
                            <ErrorMessage name="birthDate" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Gender
                            </label>
                            <div className="flex space-x-6">
                              <label className="flex items-center">
                                <Field
                                  type="radio"
                                  name="gender"
                                  value="male"
                                  className="mr-2 text-lavender-600 focus:ring-lavender-500"
                                />
                                Male
                              </label>
                              <label className="flex items-center">
                                <Field
                                  type="radio"
                                  name="gender"
                                  value="female"
                                  className="mr-2 text-lavender-600 focus:ring-lavender-500"
                                />
                                Female
                              </label>
                              <label className="flex items-center">
                                <Field
                                  type="radio"
                                  name="gender"
                                  value="other"
                                  className="mr-2 text-lavender-600 focus:ring-lavender-500"
                                />
                                Other
                              </label>
                            </div>
                            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                        </div>

                        <div className="flex justify-end mt-6">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                          >
                            {isSubmitting ? 'Updating...' : 'Update Profile'}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>

                {/* Password Change Form */}
                {showPasswordForm && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                    
                    <Formik
                      initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
                      validationSchema={passwordSchema}
                      onSubmit={handlePasswordSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password *
                              </label>
                              <Field
                                type="password"
                                name="currentPassword"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                              />
                              <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password *
                              </label>
                              <Field
                                type="password"
                                name="newPassword"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                              />
                              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password *
                              </label>
                              <Field
                                type="password"
                                name="confirmPassword"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                              />
                              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                          </div>

                          <div className="flex justify-end space-x-4 mt-6">
                            <button
                              type="button"
                              onClick={() => setShowPasswordForm(false)}
                              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="px-6 py-2 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                            >
                              {isSubmitting ? 'Changing...' : 'Change Password'}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order Updates</h3>
                      <p className="text-gray-500 text-sm">Get notified about your order status</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-lavender-600 rounded focus:ring-lavender-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Promotions & Offers</h3>
                      <p className="text-gray-500 text-sm">Receive emails about sales and special offers</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-lavender-600 rounded focus:ring-lavender-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Arrivals</h3>
                      <p className="text-gray-500 text-sm">Be the first to know about new products</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-lavender-600 rounded focus:ring-lavender-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-gray-500 text-sm">Receive text messages for urgent updates</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-lavender-600 rounded focus:ring-lavender-500" />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="px-6 py-2 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 cursor-pointer whitespace-nowrap">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
