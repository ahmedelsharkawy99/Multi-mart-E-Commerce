const CheckoutCard = ({ totalAmount, totalQuantity, onClick }) => {
  return (
    <div className="col-lg-4">
      <div className="checkout_card">
        <h6>
          Total Qty:{" "}
          <span>
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
          </span>
        </h6>
        <h6>
          Subtotal: <span>${totalAmount}</span>
        </h6>
        <h6>
          Shipping: <span>Free</span>
        </h6>
        <h4>
          Total Cost: <span>${totalAmount}</span>
        </h4>
        <button className="buy__btn auth__btn w-100" onClick={onClick}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default CheckoutCard;
