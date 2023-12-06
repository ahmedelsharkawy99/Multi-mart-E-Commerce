import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import RequireAuth from "../../../routes/RequireAuth";

import OrderDetails from "../components/OrderDetails";
import Helmet from "../../../shared/components/Helmet/Helmet";
import PaypalCheckoutBtns from "../components/PaypalCheckoutBtns";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";
import OrderSummaryCard from "../../../shared/components/OrderSummaryCard/OrderSummaryCard";

const Order = () => {
  const { id } = useParams();
  const order = useSelector((state) => state.orders.order);

  return (
    <Helmet title={`Order ${id}`}>
      <SectionContainer>
        <OrderDetails order={order} />
        <div className="col-lg-3">
          <OrderSummaryCard order={order}>
            {!order.isPaid && <PaypalCheckoutBtns order={order} orderId={id} />}
          </OrderSummaryCard>
        </div>
      </SectionContainer>
    </Helmet>
  );
};

export default RequireAuth(Order);
