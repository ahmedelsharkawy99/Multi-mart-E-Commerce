import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const exixtingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++;

      if (!exixtingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          price: newItem.price,
          image: newItem.imgUrl,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        exixtingItem.quantity++;
        exixtingItem.totalPrice =
          Number(exixtingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      toast.success("Product added successfully");
    },

    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (!existingItem) return;

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== existingItem.id
      );

      state.totalQuantity = state.totalQuantity - existingItem.quantity;

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      toast.success("Product removed successfully");
    },

    reduceItemQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== existingItem.id
        );

        state.totalQuantity = state.totalQuantity - existingItem.quantity;
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
        toast.success("Product removed successfully");
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        state.totalAmount = state.totalAmount - Number(existingItem.price);
        state.totalQuantity = state.totalQuantity - 1;
        state.cartItems[existingItemIndex] = updatedItem;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
