import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  Decrement,
  Increment,
  Remove,
  checkOut,
} from "../redux/appSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const Navigate = useNavigate();
  const products = useSelector((state) => state.appReducer.products);
  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
    localStorage.setItem("products", JSON.stringify(products))
  );
  const totalItems = products.length;

  const dispatch = useDispatch();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mt-4">Cart</h1>
      <div className="container mx-auto p-4">
        {products.length === 0 ? (
          <p className="text-center mt-8 text-gray-600 text-2xl">
            Your cart is empty
          </p>
        ) : (
          <div className="text-center mt-8 text-gray-600">
            <h2 className="text-2xl font-semibold mt-4">Items in your cart:</h2>
          <div className="bg-white shadow-md rounded p-4 mt-4">
            
            <ul className="list-disc pl-5 mt-2">
              {products.map((product, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between mb-4 p-2 border-b border-gray-200 shadow-md"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 mr-2 inline-block"
                  />
                  {product.name} - ${product.price}
                  <div className="flex items-center border-2 border-gray-200 rounded p-1 pr-4">
                    <button
                      onClick={() => dispatch(Increment(product.id))}
                      className="bg-blue-500 text-white px-1 rounded ml-4"
                    >
                      +
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      onClick={() => dispatch(Decrement(product.id))}
                      className="bg-red-500 text-white px-2 rounded "
                    >
                      -
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(Remove(product.id))}
                    className="bg-gray-500 text-white px-2 rounded ml-4 cursor-pointer"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p className="font-bold">Total Price: ${totalPrice}</p>
            <p className="font-bold">Total Items: {totalItems}</p>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 cursor-pointer"
            >
              Clear Cart
            </button>
            <button
              onClick={() => {
                dispatch(checkOut(products)); // تنفيذ الوظيفة الحالية
                setTimeout(() => Navigate("/checkout"), 100); // توجيه المستخدم إلى صفحة checkout
              }}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4 cursor-pointer"
            >
              Checkout
            </button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
