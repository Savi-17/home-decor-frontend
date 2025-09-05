
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { useAuth } from '../../hooks/useAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const addressSchema = Yup.object({
  type: Yup.string().required('Address type is required'),
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  company: Yup.string(),
  address1: Yup.string()
    .required('Address line 1 is required')
    .min(5, 'Address must be at least 5 characters'),
  address2: Yup.string(),
  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters'),
  state: Yup.string()
    .required('State is required'),
  zipCode: Yup.string()
    .required('ZIP code is required')
    .matches(/^[0-9]{5}(-[0-9]{4})?$/, 'Invalid ZIP code format'),
  country: Yup.string()
    .required('Country is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  isDefault: Yup.boolean()
});

interface Address {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressPage() {
  const { user, isLoggedIn, logout } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'Home',
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main Street',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '5551234567',
      isDefault: true
    },
    {
      id: '2',
      type: 'Work',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Tech Corp',
      address1: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phone: '5559876543',
      isDefault: false
    }
  ]);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const initialValues = {
    type: '',
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    isDefault: false
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id 
          ? { ...values, id: editingAddress.id }
          : addr
      ));
      setEditingAddress(null);
    } else {
      // Add new address
      const newAddress: Address = {
        ...values,
        id: Date.now().toString()
      };
      setAddresses(prev => [...prev, newAddress]);
      setIsAddingAddress(false);
    }
    
    resetForm();
    alert(editingAddress ? 'Address updated successfully!' : 'Address added successfully!');
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsAddingAddress(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

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
              <Link to="/profile" className="text-gray-500 hover:text-lavender-600">Profile</Link>
            </li>
            <li>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </li>
            <li className="text-lavender-600 font-medium">My Addresses</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Addresses</h1>
            <p className="text-gray-600">Manage your shipping and billing addresses</p>
          </div>
          <button
            onClick={() => {
              setIsAddingAddress(true);
              setEditingAddress(null);
            }}
            className="px-4 py-2 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Add Address
          </button>
        </div>

        {/* Address Form */}
        {isAddingAddress && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h2>

            <Formik
              initialValues={editingAddress || initialValues}
              validationSchema={addressSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Type *
                      </label>
                      <Field
                        as="select"
                        name="type"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                      >
                        <option value="">Select address type</option>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company (Optional)
                      </label>
                      <Field
                        type="text"
                        name="company"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                      />
                      <ErrorMessage name="company" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

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

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 1 *
                      </label>
                      <Field
                        type="text"
                        name="address1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                      />
                      <ErrorMessage name="address1" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 2 (Optional)
                      </label>
                      <Field
                        type="text"
                        name="address2"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                      />
                      <ErrorMessage name="address2" component="div" className="text-red-500 text-sm mt-1" />
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
                        as="select"
                        name="state"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                      >
                        <option value="">Select state</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </Field>
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
                        as="select"
                        name="country"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </Field>
                      <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
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

                    <div className="md:col-span-2">
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="isDefault"
                          className="mr-2 text-lavender-600 focus:ring-lavender-500"
                        />
                        Make this my default address
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingAddress(false);
                        setEditingAddress(null);
                      }}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                    >
                      {isSubmitting ? 'Saving...' : editingAddress ? 'Update Address' : 'Add Address'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {/* Address List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map(address => (
            <div key={address.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
              {address.isDefault && (
                <div className="absolute top-4 right-4">
                  <span className="bg-lavender-100 text-lavender-700 px-2 py-1 rounded-full text-xs font-medium">
                    Default
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <i className="ri-map-pin-line text-lavender-600 mr-2"></i>
                  {address.type}
                </h3>
              </div>

              <div className="text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">
                  {address.firstName} {address.lastName}
                </p>
                {address.company && <p>{address.company}</p>}
                <p>{address.address1}</p>
                {address.address2 && <p>{address.address2}</p>}
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
                <p>{address.phone}</p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-lavender-600 hover:text-lavender-700 cursor-pointer"
                  >
                    <i className="ri-edit-line mr-1"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    <i className="ri-delete-bin-line mr-1"></i>
                    Delete
                  </button>
                </div>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-gray-600 hover:text-lavender-600 cursor-pointer text-sm"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {addresses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-map-pin-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
            <p className="text-gray-600 mb-4">Add your first address to get started</p>
            <button
              onClick={() => setIsAddingAddress(true)}
              className="px-4 py-2 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 cursor-pointer whitespace-nowrap"
            >
              Add Address
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
