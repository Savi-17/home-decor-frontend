"use client";
import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../../components/base/Button";
import { Link } from "react-router-dom";
import {
  setIsModalOpen,
  setIsRegisterModalOpen,
} from "../../../store/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

export default function LoginModal() {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state: any) => state.user);
  // const [cookies, setCookie, removeCookie] = useCookies([
  //   "cookie-name",
  //   "token",
  // ]);

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: any
  ) => {
    setError(null);
    try {
      const response = await axios.post("/api/customers/login", values);
      console.log("Login successful:", response.data);
      resetForm();
      // setCookie("token", response.data.token);
      dispatch(setIsModalOpen(false));
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };
  if (!isModalOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg">
        <button
          onClick={() => dispatch(setIsModalOpen(false))}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
                  className="text-red-500 text-sm mt-1"
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
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <button
            onClick={() => {
              dispatch(setIsModalOpen(false));
              dispatch(setIsRegisterModalOpen(true));
            }}
            className="text-lavender-600 font-semibold"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
