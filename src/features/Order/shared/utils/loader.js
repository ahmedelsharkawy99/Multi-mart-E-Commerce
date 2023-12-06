import { redirect } from "react-router-dom";
import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { getAllOrdersHandler } from "../../../../shared/store/slices/orderSlice/orderActions";
import { orderActions } from "../../../../shared/store/slices/orderSlice/orderSlice";

export const OrderDetailsLoader = async (dispatch, id) => {
  const storedUser = SessionStorageService.getStoredData("multimart_user");
  const storedOrders = SessionStorageService.getStoredData("multimart_orders");

  if (!storedUser) {
    return redirect("/login");
  }

  if (!storedOrders) {
    const orders = await dispatch(getAllOrdersHandler(storedUser.email));
    const order = orders.find((order) => order._id === id);
    if (!order) {
      return redirect("/orders");
    }
    dispatch(orderActions.getOrder(order));
    SessionStorageService.saveData("multimart_orders", orders);
    return order;
  } else {
    dispatch(orderActions.getAllOrders(storedOrders));

    const order = storedOrders.find((order) => order.id === id);
    if (!order) {
      return redirect("/orders");
    }
    dispatch(orderActions.getOrder(order));
    SessionStorageService.saveData("multimart_orders", storedOrders);
    return order;
  }
};
