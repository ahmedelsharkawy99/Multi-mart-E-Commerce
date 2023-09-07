import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";

import "./placeOrder.css";

import Helmet from "../../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { placeOrderHandler } from "../../redux/slices/orderSlice/orderActions";
import { toast } from "react-toastify";
import CustomTable from "../../components/UI/CustomTable/CustomTable";
import { ShippingCard } from "../../components/UI/ShippingCard/ShippingCard";
import OrderSummaryCard from "../../components/UI/OrderSummaryCard/OrderSummaryCard";
import RequireAuth from "../../routers/RequireAuth";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";

const titles = ["Image", "Title", "Price", "Qty"];

const PlaceOrder = () => {
  const order = useSelector(({ orders }) => orders.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderDetails, userDetails } = order;

  const clickHandler = async () => {
    try {
      const { id, ...restOrder } = order;
      const orderId = await dispatch(
        placeOrderHandler({
          ...restOrder,
          isPaid: false,
          isDelivered: false,
          paidAt: "",
          deliveredAt: "",
        })
      );
      toast.success("Order successfully added");
      navigate(`/orders/${orderId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Place Order">
      <SectionContainer>
        <Col lg="9" className="mb-5">
          <div className="order__details">
            <ShippingCard userDetails={userDetails}>
              <div className="d-flex justify-content-end">
                <Link to="/checkout" className="buy__btn auth__btn mt-2">
                  Edit
                </Link>
              </div>
            </ShippingCard>

            <div className="border rounded">
              <CustomTable titles={titles} items={orderDetails.products} />
              <div className="d-flex justify-content-end">
                <Link to="/cart" className="buy__btn m-2 text-white">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </Col>
        <Col lg="3">
          <OrderSummaryCard order={order} clickHandler={clickHandler} />
        </Col>
      </SectionContainer>
    </Helmet>
  );
};

export default RequireAuth(PlaceOrder);
