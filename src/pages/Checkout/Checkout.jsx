import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, FormGroup } from "reactstrap";

import "./checkout.css";
import useAuth from "../../hooks/useAuth";
import { orderActions } from "../../redux/slices/orderSlice/orderSlice";

import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/CommonSection/CommonSection";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../../routers/RequireAuth";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";

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
        <Col lg="8">
          <h6 className="mb-4 fw-bold">Billing Information</h6>
          <Form className="billing__form">
            <FormGroup className="form__group">
              <input
                type="text"
                id="displayName"
                placeholder="Enter your name"
                value={formData.displayName}
                onChange={changeHandler}
              />
            </FormGroup>

            <FormGroup className="form__group">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={changeHandler}
              />
            </FormGroup>

            <FormGroup className="form__group">
              <input
                type="text"
                id="phoneNumber"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={changeHandler}
              />
            </FormGroup>

            <FormGroup className="form__group">
              <input
                type="text"
                id="street"
                placeholder="Street address"
                value={formData.street}
                onChange={changeHandler}
              />
            </FormGroup>

            <FormGroup className="form__group">
              <input
                type="text"
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={changeHandler}
              />
            </FormGroup>

            <FormGroup className="form__group">
              <input
                type="text"
                id="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={changeHandler}
              />
            </FormGroup>

            <FormGroup className="form__group">
              <input
                type="text"
                id="country"
                placeholder="Country"
                value={formData.country}
                onChange={changeHandler}
              />
            </FormGroup>
          </Form>
        </Col>

        <Col lg="4">
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
            <button
              className="buy__btn auth__btn w-100"
              onClick={submitHandler}
            >
              Continue
            </button>
          </div>
        </Col>
      </SectionContainer>
    </Helmet>
  );
};

export default RequireAuth(Checkout);
