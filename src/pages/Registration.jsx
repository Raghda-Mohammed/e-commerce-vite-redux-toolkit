import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import background from "../assets/background.jpg";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const Registration = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState();
  const [loading, setLoading] = useState(false);
  const [succMessg, setSuccMessg] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Name must be 15 characters or less")
        .required("Name is required"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const { name, email, password } = values;
      setLoading(true);

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then( async (userCredential) => {
          // Signed up
          // const user = userCredential.user;
          const user = userCredential.user;
          console.log(user);

          await updateProfile(auth.currentUser, {
            displayName: name,
          });
          
          setSuccMessg("Account created successfully");
          
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;

          console.log("Full Error Object:", error);

          setLoading(false);
          if (error.code && error.code.includes("auth/email-already-in-use")) {
            setFirebaseError("Email already in use, please use another email");
            resetForm();
          }

          // ..
        });
    },
  });


    useEffect(() => {
    if (succMessg) {
      // setTimeout(() => navigate("/signin"), 2000);
}
}, [succMessg, navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <img
          src={background}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        action=""
        className="w-full max-w-sm md:max-w-md mx-4 mt-12 p-4 border border-gray-600 rounded-2xl shadow-md bg-white z-1"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {firebaseError && <p className="text-red-500">{firebaseError}</p>}
        {succMessg && <p className="text-green-500">{succMessg}</p>}

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <div className="flex relative">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              autoComplete="on"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              required
              className={`border ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-600"
              } p-2 rounded w-full`}
            />
            <div className="absolute right-2 top-3">
              {/* {formik.touched.name && formik.errors.name ? (
                
                <MdErrorOutline className="text-red-500" />
              ) : null}
              {formik.touched.name && !formik.errors.name ? (
                <FaCheck className="text-green-500" />
              ) : null} */}
              {formik.touched.name && formik.errors.name ? (
                <>
                  {formik.touched.name}
                  <MdErrorOutline className="text-red-500" />
                </>
              ) : formik.touched.name && !formik.errors.name ? (
                <>
                  <FaCheck className="text-green-500" />
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-black">
            Email
          </label>
          <div className="flex relative">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="on"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              required
              className={`border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-600"
              } p-2 rounded w-full`}
            />
            <div className="absolute right-2 top-3">
              {formik.touched.email && formik.errors.email ? (
                <MdErrorOutline className="text-red-500" />
              ) : null}
              {formik.touched.email && !formik.errors.email ? (
                <FaCheck className="text-green-500" />
              ) : null}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <div className="flex relative">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              autoComplete="on"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              required
              className={`border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-600"
              } p-2 rounded w-full`}
            />
            <div className="absolute right-2 top-3">
              {formik.touched.password && formik.errors.password ? (
                <MdErrorOutline className="text-red-500" />
              ) : null}
              {formik.touched.password && !formik.errors.password ? (
                <FaCheck className="text-green-500" />
              ) : null}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
          </label>
          <div className="flex relative">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter your Confirm Password"
              autoComplete="on"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              required
              className={`border ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-600"
              } p-2 rounded w-full`}
            />
            <div className="absolute right-2 top-3">
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <MdErrorOutline className="text-red-500" />
              ) : null}
              {formik.touched.confirmPassword &&
              !formik.errors.confirmPassword ? (
                <FaCheck className="text-green-500" />
              ) : null}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {loading ? "Processing..." : "Register Account"}
        </button>
        <button className="ml-4">
          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </button>
        {succMessg && <p className="text-green-500">{succMessg}</p>}
        {firebaseError && <p className="text-red-500">{firebaseError}</p>}
      </form>
    </div>
  );
};

export default Registration;
