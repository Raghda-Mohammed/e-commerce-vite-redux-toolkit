import React from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { addToCart, addToWishlist } from "../redux/appSlice";

const Products = () => {
  const data = useLoaderData();
  const products = data.data;

  const dispatch = useDispatch();
  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((item) => (
          <div
            className="p-4 bg-white shadow-xl rounded-lg m-2 hover:scale-105 transition duration-500 ease-in-out "
            key={item.id}
          >
            <div className="flex justify-center items-center border-b-2 border-gray-300 p-4">
              <img
                className="h-40 w-40 object-contain hover:scale-105 transition duration-500 ease-in-out"
                src={item.image}
                alt=""
              />
            </div>
            <h1 className="text-lg font-bold mt-2 truncate">{item.title}</h1>
            <p className="text-sm text-gray-600 mt-2 truncate">
              {item.description}
            </p>
            <p className="text-gray-600 mt-2 font-bold border-b-2 border-gray-300 pb-4">
              {item.category}
            </p>
            <div className="flex justify-between ">
              <p className="text-xl text-green-600 font-bold mt-2">
                ${item.price}
              </p>
              <p className="text-gray-600 mt-2">{item.rating.rate}⭐</p>
            </div>

            <div className="grid grid-cols-1  place-items-end gap-2  mt-4">
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      image: item.image,
                      quantity: 1,
                      description: item.description,
                    })
                  )
                }
                className="bg-blue-500 w-full hover:bg-blue-600 cursor-pointer text-white p-2 rounded mt-2"
              >
                Add to Cart
              </button>
              <button
                onClick={() =>
                  dispatch(
                    addToWishlist({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      image: item.image,
                      description: item.description,
                    })
                  )
                }
                className="bg-green-500 w-full hover:bg-green-600 cursor-pointer text-white p-2 rounded mt-2"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
        {/* {products.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">No Products Found</h1>
        </div>
      )} */}
      </div>
    </div>
  );
};

export default Products;
