import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../../utils/helpers";

const initialState = {
  order: {
    userDetails: {},
    orderDetails: {},
    isPaid: false,
    isDelivered: false,
    paidAt: "",
    deliveredAt: "",
  },
  allOrders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.order.userDetails = action.payload.userDetails;
      state.order.orderDetails = action.payload.orderDetails;
    },

    getOrder: (state, action) => {
      state.order.userDetails = action.payload.userDetails;
      state.order.orderDetails = action.payload.orderDetails;
      state.order.isPaid = action.payload.isPaid;
      state.order.isDelivered = action.payload.isDelivered;
      state.order.paidAt = action.payload.isPaid
        ? formatDate(action.payload.paidAt.seconds * 1000)
        : "";
      state.order.deliveredAt = action.payload.isDelivered
        ? formatDate(action.payload.deliveredAt.seconds * 1000)
        : "";

      state.order.createdAt = formatDate(
        action.payload.createdAt.seconds * 1000
      );
      state.order.id = action.payload.id;
    },

    getAllOrders: (state, action) => {
      state.allOrders = action.payload.map((order) => ({
        ...order,
        paidAt: order.isPaid ? formatDate(order.paidAt.seconds * 1000) : "",
        deliveredAt: order.isDelivered
          ? formatDate(order.deliveredAt.seconds * 1000)
          : "",
        createdAt: formatDate(order.createdAt),
      }));
    },

    resetOrderDetails: (state) => {
      state.order.orderDetails = {};
    },

    updateOrder: (state, action) => {
      state.order.isPaid = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
