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
      if (!action.payload) {
        state.productsPlaceholders = state.products;
      } else if (action.payload.type === "CATEGORY") {
        state.productsPlaceholders = state.products.filter(
          (product) => product.category === action.payload.value
        );
      } else {
        state.productsPlaceholders = state.products.filter((product) =>
          product.title.toLowerCase().includes(action.payload)
        );
      }
    },

    getRelatedProducts: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      state.productsPlaceholders = state.products.filter(
        (product) =>
          product.category === existingProduct.category &&
          product.id !== existingProduct.id
      );
    },

    getProductDetails: (state, action) => {
      state.productDetails = state.products.find(
        (product) => product.id === action.payload
      );
    },

    replaceProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },

    addReview: (state, action) => {
      state.productDetails.reviews = action.payload.reviews;
      state.productDetails.avgRating = action.payload.avgRating;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
