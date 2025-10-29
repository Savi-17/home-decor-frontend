"use client";
import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../../components/base/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalOpen,
  setIsRegisterModalOpen,
} from "../../../store/slice/userSlice";

export default function RegistrationModal() {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Full Name is required")
      .min(3, "Name must be at least 3 characters"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Invalid date"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    pin: Yup.string()
      .matches(/^[0-9]{6}$/, "PIN Code must be 6 digits")
      .required("PIN Code is required"),
  });
  const initialValues = {
    name: "",
    gender: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    pin: "",
  };

  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { isRegisterModalOpen } = useSelector((state: any) => state.user);

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: any
  ) => {
    setError(null);
    try {
      const payload = {
        name: values.name,
        gender: values.gender,
        dob: values.dob,
        email: values.email,
        password: values.password,
        contact: values.mobile,
        pincode: values.pin,
      };
      const response = await axios.post("/api/customers/register", payload);
      dispatch(setIsRegisterModalOpen(false));
      dispatch(setIsModalOpen(true));
      resetForm();
    } catch (error: any) {
      console.error("Registration failed:", error);
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };
  if (!isRegisterModalOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg">
        <button
          onClick={() => dispatch(setIsRegisterModalOpen(false))}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full border rounded-lg px-4 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  as="select"
                  name="gender"
                  className="w-full border rounded-lg px-4 py-2 bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  type="date"
                  name="dob"
                  className="w-full border rounded-lg px-4 py-2"
                />
                <ErrorMessage
                  name="dob"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full border rounded-lg px-4 py-2"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full border rounded-lg px-4 py-2"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full border rounded-lg px-4 py-2"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  className="w-full border rounded-lg px-4 py-2"
                />
                <ErrorMessage
                  name="mobile"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="pin"
                  placeholder="PIN Code"
                  className="w-full border rounded-lg px-4 py-2"
                />
                <ErrorMessage
                  name="pin"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => {
              dispatch(setIsRegisterModalOpen(false));
              dispatch(setIsModalOpen(true));
            }}
            className="text-lavender-600 font-semibold"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
