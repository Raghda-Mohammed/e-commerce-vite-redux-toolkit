import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import background from "../assets/background.jpg";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/appSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState();
  const [loading, setLoading] = useState(false);
  const [succMessg, setSuccMessg] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      // name: Yup.string()
      //   .max(15, "Name must be 15 characters or less")
      //   .required("Name is required"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      // confirmPassword: Yup.string()
      //   .oneOf([Yup.ref("password"), null], "Passwords must match")
      //   .required("Confirm Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const { email, password } = values;
      setLoading(true); //تفعيل حالة التحميل

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);

          dispatch(
            setUser({
              __id: user.uid,
              userName: user.displayName,
              email: user.email,
              // email: user.email,
              // name: user.displayName,
              // photoURL: user.photoURL,
            })
          );

          setSuccMessg("Logged in successfully! Redirecting...");
          setLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          setLoading(false); // إيقاف حالة التحميل
          console.log("Full Error Object:", error);

          if (error.code && error.code.includes("auth/w")) {
            setFirebaseError("Wrong password. Please try again.");
          } else if (error.code && error.code.includes("auth/user-not-found")) {
            setFirebaseError("User not found with this email.");
          } else {
            setFirebaseError("An error occurred. Please try again.");
          }

          resetForm();
        });
    },
  });

  useEffect(() => {
    if (succMessg) {
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {loading ? "Processing..." : "Sign In"}
        </button>
        <button className="ml-4">
          <p className="text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </button>
        {succMessg && <p className="text-green-500">{succMessg}</p>}
        {firebaseError && <p className="text-red-500">{firebaseError}</p>}
      </form>
    </div>
  );
};

export default SignIn;
