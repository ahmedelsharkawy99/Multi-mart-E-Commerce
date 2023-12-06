import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../styles/checkout.css";
import useAuth from "../../../shared/hooks/useAuth";
import RequireAuth from "../../../routes/RequireAuth";
import { orderActions } from "../../../shared/store/slices/orderSlice/orderSlice";

import CheckoutCard from "../components/CheckoutCard";
import CheckoutForm from "../components/CheckoutForm";
import Helmet from "../../../shared/components/Helmet/Helmet";
import CommonSection from "../../../shared/components/CommonSection/CommonSection";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const Checkout = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(({ cart }) => cart);
  const userDetails = useSelector(({ orders }) => orders.order.userDetails);
  const [formData, setFormData] = useState({
    displayName: userDetails.displayName || currentUser.displayName,
    email: userDetails.email || currentUser.email,
    phoneNumber: userDetails.phoneNumber || "",
    street: userDetails.street || "",
    city: userDetails.city || "",
    postalCode: userDetails.postalCode || "",
    country: userDetails.country || "",
  });

  const { cartItems, totalQuantity, totalAmount } = cart;

  const changeHandler = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const submitHandler = (e) => {
    e.preventDefault();
    const order = {
      orderDetails: {
        products: cartItems,
        totalQuantity,
        totalAmount,
      },
      userDetails: {
        ...formData,
      },
    };

    dispatch(orderActions.placeOrder(order));
    navigate("/place-order");
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <SectionContainer>
        <div className="col-lg-8">
          <h6 className="mb-4 fw-bold">Billing Information</h6>
          <CheckoutForm formData={formData} onChange={changeHandler} />
        </div>

        <CheckoutCard
          totalAmount={totalAmount}
          totalQuantity={totalQuantity}
          onClick={submitHandler}
        />
      </SectionContainer>
    </Helmet>
  );
};

export default RequireAuth(Checkout);
