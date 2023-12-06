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
        <Link to="/checkout" className="d-block buy__btn w-100">
          Checkout
        </Link>
        <Link to="/shop" className="d-block buy__btn w-100  mt-3">
          Continue Shopping
        </Link>
      </div>
    </>
  );
};

export default CartCard;
