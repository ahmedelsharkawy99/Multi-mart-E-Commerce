import { Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import "./cart.css";
import { cartActions } from "../../redux/slices/cartSlice/cartSlice";

import Helmet from "../../components/Helmet/Helmet";
import CartCard from "../../components/UI/CartCard/CartCard";
import CustomTable from "../../components/UI/CustomTable/CustomTable";
import CommonSection from "../../components/UI/CommonSection/CommonSection";
import React from "react";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";

const titles = ["Image", "Title", "Price", "Qty", "Delete"];
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const removeItemHandler = (id) => dispatch(cartActions.removeItem(id));
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />

      <SectionContainer>
        <Col lg="9" className="mb-3">
          {cartItems.length === 0 ? (
            <h2 className="fs-4 ">No items added to the cart.</h2>
          ) : (
            <CustomTable
              titles={titles}
              items={cartItems}
              removeItemHandler={removeItemHandler}
            />
          )}
        </Col>
        <Col lg="3">
          {cartItems.length !== 0 && <CartCard totalAmount={totalAmount} />}
        </Col>
      </SectionContainer>
    </Helmet>
  );
};

export default Cart;
