import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { PayPalButtons } from "@paypal/react-paypal-js";

import { payOrder } from "../../../shared/store/slices/orderSlice/orderActions";
import SessionStorageService from "../../../shared/storage/sessionStorage";

const PaypalCheckoutBtns = ({ order, orderId }) => {
  const dispatch = useDispatch();

  const createOrderHandler = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: order.userDetails.email,
          amount: {
            value: order.orderDetails.totalAmount,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      await actions.order.capture();
      const payedOrder = await dispatch(payOrder(orderId));
      const allOrders = SessionStorageService.getStoredData("multimart_orders");
      const updatedOrders = allOrders.filter(
        (order) => order.id !== payedOrder.id
      );
      SessionStorageService.saveData("multimart_orders", [
        payedOrder,
        ...updatedOrders,
      ]);
      toast.success("Order Paid Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onError = ({ err }) => toast.error(err);

  return (
    <PayPalButtons
      className="mt-3"
      createOrder={createOrderHandler}
      onApprove={onApprove}
      onError={onError}
    />
  );
};

export default PaypalCheckoutBtns;
