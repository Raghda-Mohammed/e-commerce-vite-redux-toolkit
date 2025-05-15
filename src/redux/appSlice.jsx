import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [], // استعادة البيانات عند تحميل الصفحة
  checkoutData: JSON.parse(localStorage.getItem("checkoutData")) || [], // استعادة بيانات checkout
  userInfo: null,

  products: [],
  wishlist: [],

  // total : 0,
  // quantity : 0,
  // user : null,
  // isFetching : false,
  // error : false,
  // success : false
};

export const appSlice = createSlice({
  name: "Ecommerce",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("products", JSON.stringify(state.products)); // حفظ البيانات في localStorage
    },

    // addToWishlist: (state, action) => {
    //   const item = state.wishlist.find((item) => item.id === action.payload.id);
    //   if (item) {
    //     item.quantity += action.payload.quantity;
    //   } else {
    //     state.wishlist.push({ ...action.payload, quantity: 1 });
    //   }
    //   localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // حفظ البيانات في localStorage
    // },

    addToWishlist: (state, action) => {
      const item = state.wishlist.find((item) => item.id === action.payload.id);
      if (!item) {
        state.wishlist.push({ ...action.payload });
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },

    Increment: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      item.quantity++;
    },
    Decrement: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        state.products = state.products.filter(
          (item) => item.id !== action.payload
        );
      } else {
        item.quantity--;
      }
    },
    Remove: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("products", JSON.stringify(state.products)); // حفظ البيانات في localStorage
      state.checkoutData = state.checkoutData.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("checkoutData", JSON.stringify(state.checkoutData)); // حفظ البيانات في localStorage
      console.log("Removed Item:", action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // تحديث localStorage
    },

    // RemoveFromWishlist: (state, action) => {
    //   state.wishlist = state.wishlist.filter(
    //     (item) => item.id !== action.payload
    //   );
    //   localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // حفظ البيانات في localStorage
    // },
    clearCart: (state) => {
      state.products = [];
    },

    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    checkOut: (state) => {
      console.log("Current Products:", state.products);
      state.checkoutData = [...state.products];
      console.log("Checkout Data Saved:", state.checkoutData);
      // state.products = [];
      console.log("Cart Cleared:", state.products);
      localStorage.setItem("checkoutData", JSON.stringify(state.checkoutData));
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});

export const {
  addToCart,
  addToWishlist,
  Increment,
  Decrement,
  Remove,
  removeFromWishlist,
  clearCart,
  checkOut,
  setUser,
} = appSlice.actions;
export default appSlice.reducer;
