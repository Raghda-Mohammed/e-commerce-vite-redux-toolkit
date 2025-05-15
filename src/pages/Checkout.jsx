import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Remove } from "../redux/appSlice";

const Checkout = () => {
  const checkoutData = useSelector((state) => state.appReducer.checkoutData);
  console.log("Checkout Data:", checkoutData);

  const totalPrice = checkoutData.reduce(
    (acc, product) => acc + product.price,
    0
  );
  const totalItems = checkoutData.length;

  const dispatch = useDispatch();
  const handleCheckout = () => {
    dispatch(Checkout());
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mt-10">Checkout</h1>
      <div className="container mx-auto p-4">
        {checkoutData.length === 0 ? (
          <p className="text-center mt-8 text-gray-600 text-2xl">
            Your Checkout is empty
          </p>
        ) : (
          <div>
            <h2 className="text-2xl text-center font-semibold my-4">Items in your cart:</h2>
            <div className="bg-white shadow-md rounded p-4">
            
            <ul className="list-disc pl-5 mt-2 border-b-2 border-gray-200">
              {checkoutData.map((product, index) => (
                <li key={index} className="flex items-center justify-between mb-4 p-2 border-b border-gray-200 shadow-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 mr-2 inline-block"
                  />
                  {product.name} - ${product.price}
                  <button
                    onClick={() => dispatch(Remove(product.id))}
                    className="bg-red-500 text-white px-2 rounded ml-4 cursor-pointer"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p className="font-bold">Total Price: ${totalPrice}</p>
            <p className="font-bold">Total Items: {totalItems}</p>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
            >
                Proceed to Payment
            </button>
          </div>
          </div>
        )}
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mt-4 text-center">
          Shipping Information
        </h2>
        <form className="bg-white shadow-md rounded p-4 w-md items-center mx-auto">
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter your address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
