import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slice/categorySlice";
import productReducer from "./slice/productSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    user: userReducer,
  },
});
