import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice/cartSlice";
import userSlice from "./slices/userSlice/userSlice";
import orderSlice from "./slices/orderSlice/orderSlice";
import productsSlice from "./slices/productsSlice/productsSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    orders: orderSlice,
    products: productsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
