import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Spinner } from "reactstrap";

import { getOrder } from "../../redux/slices/orderSlice/orderActions";
import { orderActions } from "../../redux/slices/orderSlice/orderSlice";

import RequireAuth from "../../routers/RequireAuth";
import Helmet from "../../components/Helmet/Helmet";
import CustomTable from "../../components/UI/CustomTable/CustomTable";
import OrderSummaryCard from "../../components/UI/OrderSummaryCard/OrderSummaryCard";
import PaypalCheckoutBtns from "../../components/PaypalCheckoutBtns/PaypalCheckoutBtns";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";

const titles = ["Image", "Title", "Price", "Qty"];

const Order = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders.order);
  const allOrders = useSelector((state) => state.orders.allOrders);

  useEffect(() => {
    if (allOrders.length !== 0)
      dispatch(
        orderActions.getOrder(allOrders.find((order) => order.id === id))
      );
    else dispatch(getOrder(id));
  }, [id, dispatch, allOrders]);

  return (
    <Helmet title={`Order ${id}`}>
      <SectionContainer>
        {Object.keys(order.userDetails).length === 0 ? (
          <Col lg="12" className="text-center">
            <Spinner style={{ width: "3rem", height: "3rem" }}>
              Loading...
            </Spinner>
          </Col>
        ) : (
          <>
            <Col lg="9" className="mb-5">
              <div className="order__details">
                <div className="card p-3 mb-5">
                  <h2 className="mb-4">Shipping Address</h2>
                  <div className="d-flex flex-wrap gap-2 justify-content-start justify-content-md-between mb-3 ">
                    <div>{order.userDetails.displayName},</div>
                    <div>{order.userDetails.phoneNumber},</div>
                    <div>{order.userDetails.street},</div>
                    <div>{order.userDetails.city},</div>
                    <div>{order.userDetails.postalCode},</div>
                    <div>{order.userDetails.country}.</div>
                  </div>
                </div>

                <CustomTable
                  titles={titles}
                  items={order.orderDetails.products}
                />
              </div>
            </Col>
            <Col lg="3">
              <OrderSummaryCard order={order}>
                {!order.isPaid && (
                  <PaypalCheckoutBtns order={order} orderId={id} />
                )}
              </OrderSummaryCard>
            </Col>
          </>
        )}
      </SectionContainer>
    </Helmet>
  );
};

export default RequireAuth(Order);
