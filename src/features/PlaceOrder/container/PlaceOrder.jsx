import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../shared/styles/placeOrder.css";
import { titles } from "../shared/utils/tableTitles";
import RequireAuth from "../../../routes/RequireAuth";
import { placeOrderHandler } from "../../../shared/store/slices/orderSlice/orderActions";

import ShippingCard from "../components/ShippingCard";
import Helmet from "../../../shared/components/Helmet/Helmet";
import PlaceOrderTableBody from "../components/PlaceOrderTableBody";
import CustomTable from "../../../shared/components/CustomTable/CustomTable";
import OrderSummaryCard from "../../../shared/components/OrderSummaryCard/OrderSummaryCard";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";
import SessionStorageService from "../../../shared/storage/sessionStorage";

const PlaceOrder = () => {
  const order = useSelector(({ orders }) => orders.order);
  const allOrders = useSelector(({ orders }) => orders.allOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderDetails, userDetails } = order;

  const clickHandler = async () => {
    try {
      const createdOrder = {
        ...order,
        isPaid: false,
        isDelivered: false,
        paidAt: "",
        deliveredAt: "",
      };

      const orderId = await dispatch(placeOrderHandler(createdOrder));
      SessionStorageService.saveData(`multimart_orders`, [
        ...allOrders,
        { ...createdOrder, id: orderId, createdAt: { seconds: Date.now() } },
      ]);

      toast.success("Order successfully added");
      navigate(`/orders/${orderId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Place Order">
      <SectionContainer>
        <div className="col-lg-9 mb-5">
          <div className="order__details">
            <ShippingCard userDetails={userDetails}>
              <div className="d-flex justify-content-end">
                <Link to="/checkout" className="buy__btn auth__btn mt-2">
                  Edit
                </Link>
              </div>
            </ShippingCard>

            <div className="border rounded">
              <CustomTable titles={titles}>
                <PlaceOrderTableBody items={orderDetails.products} />
              </CustomTable>
              <div className="d-flex justify-content-end">
                <Link to="/cart" className="buy__btn m-2 text-white">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <OrderSummaryCard order={order} clickHandler={clickHandler} />
        </div>
      </SectionContainer>
    </Helmet>
  );
};

export default RequireAuth(PlaceOrder);
