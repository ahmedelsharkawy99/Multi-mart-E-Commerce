import React from "react";
import { Link } from "react-router-dom";

const CartCard = ({ totalAmount }) => {
  return (
    <>
      <div>
        <h6 className="d-flex align-items-center justify-content-between">
          Subtotal
          <span className="fs-4 text-bold">${totalAmount}</span>
        </h6>
      </div>
      <p className="fs-6 mt-2">taxes and shipping will calculate in checkout</p>
      <div>
        <button className="buy__btn w-100">
          <Link to="/checkout" className="d-block w-100">
            Checkout
          </Link>
        </button>
        <button className="buy__btn w-100  mt-3">
          <Link to="/shop" className="d-block w-100">
            Continue Shopping
          </Link>
        </button>
      </div>
    </>
  );
};

export default CartCard;
