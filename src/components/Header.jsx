import React, { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import "../index.css";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// react icons
import { IoSearchOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";

import { FaUserCheck } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [cart, setCart] = useState([]);
  // const [wishlist, setWishlist] = useState([]);
  const products = useSelector((state) => state.appReducer.products);
  const wishlist = useSelector((state) => state.appReducer.wishlist); 
  const userInfo = useSelector((state) => state.appReducer.userInfo);

  const Links = [
    { id: 1, page: "Home", path: "/" },
    { id: 2, page: "contact", path: "/contact" },
    { id: 3, page: "About", path: "/about" },
    // { id: 4, page: "Registetation", path: "/register" },
  ];

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <div className="border-b-2 border-gray-200 sticky top-0 bg-white z-50">
      <div className="container mx-auto flex justify-between py-2 px-4">
        {/* الشعار */}
        <div className="lg:flex items-center gap-2">
          <Link to="/" className="text-black text-decoration-none text-xl">
            E Commerce
          </Link>
        </div>

        <ul className="hidden lg:flex items-center gap-7">
          {Links.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className="text-black text-decoration-none link-primary hover:text-blue-600"
              >
                {item.page}
              </Link>
            </li>
          ))}
          {userInfo ? (
            <>
              <p className="text-orange-600 text-decoration-none link-primary hover:text-blue-600">
                {userInfo.userName}
              </p>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="text-black text-decoration-none link-primary hover:text-blue-600"
              >
                Registetation
              </Link>
            </>
          )}
        </ul>

        {/* عناصر تسجيل الدخول والسلة والمفضلة */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 border-none px-2 py-1 rounded-lg bg-gray-200">
            <Form.Control
              type="text"
              placeholder="What are you looking for?"
              className="text-sm py-2 px-4 bg-transparent border-none w-full focus:outline-none"
            />
            <IoSearchOutline className="text-xl" />
          </div>

          <div className="flex items-center gap-3">

            {/* المفضلة */}
            <Link to="/wishlist">
              <div className="relative">
                <FiHeart className="text-2xl text-black sm:text-3xl md:text-2xl" />
                {wishlist.length > 0 && (
                  <span className="absolute top-[-10px] right-[-5px] px-1.5 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </Link>

            {/* السلة */}
            <Link to="/cart">
              <div className="relative">
                <MdOutlineShoppingCart className="text-2xl text-black sm:text-3xl md:text-2xl" />
                {products.length > 0 && (
                  <span className="absolute top-[-10px] right-[-5px] px-1.5 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                    {products.length}
                  </span>
                )}
              </div>
            </Link>
          </div>

          <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
            <CiUser onClick={() => navigate("/signin")} />
          </button>
        </div>

        {/* القائمة الجانبية (للشاشات الصغيرة) */}
        <div className="lg:hidden ml-auto">
          {!isOpenMenu ? (
            <HiOutlineMenu
              className="text-2xl cursor-pointer"
              onClick={() => setIsOpenMenu(true)}
            />
          ) : (
            <HiX className="text-2xl cursor-pointer" onClick={closeMenu} />
          )}
        </div>

        {isOpenMenu && (
          <div className="lg:hidden flex flex-col items-center py-10 w-1/3 bg-white border border-gray-200 rounded-lg shadow-lg absolute top-16 right-4 z-50">
            <ul className="flex flex-col gap-4">
              {Links.map((item) => (
                <li key={item.id} className="text-sm text-center">
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className="text-black text-decoration-none hover:text-blue-600"
                  >
                    {item.page}
                  </Link>
                </li>
              ))}

              {userInfo ? (
                <>
                  <p className="text-orange-600 text-center text-decoration-none link-primary hover:text-blue-600 ml-3">
                    {userInfo.userName}
                  </p>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      navigate("/register"); // ✅ التوجيه إلى صفحة تسجيل الخروج
                    }}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/signin")}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Log In
                </button>
              )}
            </ul>
          </div>
        )}

        {/* {isOpenMenu && (
          <div className="lg:hidden flex flex-col items-center py-10 w-1/3 bg-white border border-gray-200 rounded-lg shadow-lg absolute top-16 right-4 z-50">
            <ul className="flex flex-col gap-4">
              {Links.map((item) => (
                <li key={item.id} className="text-sm text-center">
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className="text-black text-decoration-none hover:text-blue-600"
                  >
                    {item.page}
                  </Link>
                </li>
              ))}

              {isLoggedIn ? (
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Log Out
                </button>
              ) : (
                
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    navigate("/signin");
                  }}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Log In
                </button>
              )}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Header;
