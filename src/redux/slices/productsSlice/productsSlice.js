import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsPlaceholders: [],
  productDetails: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    replaceProducts: (state, action) => {
      state.products = action.payload;
      state.productsPlaceholders = action.payload;
    },

    filterProducts: (state, action) => {
      if (!action.payload) state.productsPlaceholders = state.products;
      else if (action.payload.type === "CATEGORY")
        state.productsPlaceholders = state.products.filter(
          (product) =>
            product.category === action.payload.value &&
            product.id !== action.payload.id
        );
      else
        state.productsPlaceholders = state.products.filter((product) =>
          product.title.toLowerCase().includes(action.payload)
        );
    },

    getProductDetails: (state, action) => {
      state.productDetails = state.products.find(
        (product) => product.id === action.payload
      );
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
