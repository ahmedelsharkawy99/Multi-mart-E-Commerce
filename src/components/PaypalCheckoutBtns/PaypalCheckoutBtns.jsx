import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { payOrder } from "../../redux/slices/orderSlice/orderActions";

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

  return (
    <PayPalButtons
      className="mt-3"
      createOrder={createOrderHandler}
      onApprove={async (data, actions) => {
        try {
          await actions.order.capture();
          await dispatch(payOrder(orderId));
          toast.success("Order Payed Successfully");
        } catch (error) {
          toast.error(error.message);
        }
      }}
      onError={({ err }) => toast.error(err)}
    />
  );
};

export default PaypalCheckoutBtns;
