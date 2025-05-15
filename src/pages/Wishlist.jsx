import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromWishlist } from "../redux/appSlice"; // تأكد من وجود دالة لإزالة العنصر من Wishlist

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.appReducer.wishlist);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mt-6">🖤 Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center mt-8 text-gray-600 text-2xl">
          🛍 Your Wishlist is empty
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {wishlist.map((item) => (
            <div
              className="p-4 bg-white shadow-lg rounded-lg transition transform hover:scale-105"
              key={item.id}
            >
              {/* صورة المنتج */}
              <div className="flex justify-center items-center border-b border-gray-300 p-4">
                <img
                  className="h-40 w-40 object-contain transition transform hover:scale-110"
                  src={item.image}
                  alt={item.title}
                />
              </div>

              {/* تفاصيل المنتج */}
              <h1 className="text-lg font-bold mt-2 truncate">{item.title}</h1>
              <p className="text-sm text-gray-600 mt-2 truncate">
                {item.description}
              </p>
              <p className="text-gray-600 font-semibold mt-2">
                {item.category}
              </p>

              {/* السعر والتقييم */}
              <div className="flex justify-between mt-2">
                <p className="text-xl text-green-600 font-bold">
                  ${item.price}
                </p>
                <p className="text-gray-600">{item.rating?.rate} ⭐</p>
              </div>

              {/* أزرار التفاعل */}
              <div className="grid grid-cols-1 gap-3 mt-4">
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
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
                >
                  🛒 Add to Cart
                </button>

                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
                >
                  ❌ Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
