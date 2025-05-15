import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./pages/Cart";
import { ProductsData } from "./api/Api";
import Checkout from "./pages/Checkout";
import Registration from "./pages/Registration";
import SignIn from "./pages/SignIn";

import { auth, db } from "./firebaseConfig";
import Wishlist from "./pages/Wishlist";
console.log("Firebase Initialized:", auth, db);

const Layout = () => {
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={ProductsData} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          
        </Route>

        <Route path="/register" element={<Registration />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
