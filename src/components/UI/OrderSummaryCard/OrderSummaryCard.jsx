import React from "react";
import { useLocation } from "react-router-dom";

import "./orderSummeryCard.css";
const OrderSummaryCard = ({ clickHandler, children, order }) => {
  const { pathname } = useLocation();
  return (
    <div className="order__summary">
      <div className="checkout_card">
        <h6>
          Total Qty:
          <span>
            {order.orderDetails.totalQuantity}
            {order.orderDetails.totalQuantity === 1 ? "item" : "items"}
          </span>
        </h6>
        <h6>
          Subtotal: <span>${order.orderDetails.totalAmount}</span>
        </h6>
        <h6>
          Shipping: <span>Free</span>
        </h6>
        {pathname === `/orders/${order.id}` && (
          <h6>
            {order.isDelivered ? (
              <>
                Delivered at:<span>{order.deliveredAt}</span>
              </>
            ) : (
              "Not Delivered"
            )}
          </h6>
        )}
        {pathname === `/orders/${order.id}` && (
          <h6 className="d-flex align-items-center justify-content-between gap-3 ">
            {order.isPaid ? (
              <>
                Paid at:<span>{order.paidAt}</span>
              </>
            ) : (
              "Not Paid"
            )}
          </h6>
        )}
        <h4>
          Total Cost: <span>${order.orderDetails.totalAmount}</span>
        </h4>
        {clickHandler && (
          <button className="buy__btn auth__btn w-100" onClick={clickHandler}>
            Place Order
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default OrderSummaryCard;
