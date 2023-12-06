import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "../shared/styles/cart.css";
import { tableTitles } from "../shared/utils/tableTitles";

import CartCard from "../components/CartCard";
import CartTableBody from "../components/CartTableBody";
import Helmet from "../../../shared/components/Helmet/Helmet";
import CustomTable from "../../../shared/components/CustomTable/CustomTable";
import CommonSection from "../../../shared/components/CommonSection/CommonSection";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />

      <SectionContainer>
        <div className="col-lg-9 mb-3">
          {cartItems.length === 0 ? (
            <h2 className="fs-4 ">
              No items added to the cart.{" "}
              <Link to="/shop" className="link-info">
                Continue Shopping
              </Link>
            </h2>
          ) : (
            <CustomTable titles={tableTitles}>
              <CartTableBody items={cartItems} />
            </CustomTable>
          )}
        </div>
        <div className="col-lg-3">
          {cartItems.length !== 0 && <CartCard totalAmount={totalAmount} />}
        </div>
      </SectionContainer>
    </Helmet>
  );
};

export default Cart;
