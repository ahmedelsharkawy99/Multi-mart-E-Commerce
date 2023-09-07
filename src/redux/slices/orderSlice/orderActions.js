import {
  getData,
  getUserOrders,
  setOrder,
  updateOrder,
} from "../../../handlers/firestore";
import { orderActions } from "./orderSlice";

export const placeOrderHandler = (order) => {
  return async (dispatch) => {
    try {
      const orderDb = await setOrder(order);
      dispatch(orderActions.placeOrder(order));
      return orderDb.id;
    } catch (error) {
      throw error;
    }
  };
};

export const getOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const order = await getData("orders", orderId);
      dispatch(orderActions.getOrder(order));
    } catch (error) {
      throw error;
    }
  };
};

export const getAllOrdersHandler = (userEmail) => {
  return async (dispatch) => {
    try {
      const orders = await getUserOrders("orders", userEmail);
      dispatch(orderActions.getAllOrders(orders));
    } catch (error) {
      throw error;
    }
  };
};

export const payOrder = (orderId) => {
  return async (dispatch) => {
    try {
      await updateOrder("orders", orderId);
      await dispatch(getOrder(orderId));
    } catch (error) {
      throw error;
    }
  };
};
