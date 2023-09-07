import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersHandler } from "../../redux/slices/orderSlice/orderActions";
import CommonSection from "../../components/UI/CommonSection/CommonSection";
import Helmet from "../../components/Helmet/Helmet";
import { Col, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import CustomTable from "../../components/UI/CustomTable/CustomTable";
import RequireAuth from "../../routers/RequireAuth";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";

const titles = ["Id", "Total Price", "Paid", "Delivered", "Action"];

const OrdersHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useAuth();
  const dispatch = useDispatch();
  const allOrders = useSelector(({ orders }) => orders.allOrders);

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getAllOrdersHandler(currentUser.email));
      setIsLoading(false);
    };

    fetchOrders();
  }, [currentUser.email, dispatch]);
  
  return (
    <Helmet title="Orders History">
      <CommonSection title="Orders History" />

      <SectionContainer>
        <Col>
          {allOrders.length === 0 && !isLoading ? (
            <h4 className="fs-4">
              No Orders Found.
              <Link to={"/"} className="text-primary">
                Shopping Now!
              </Link>
            </h4>
          ) : isLoading ? (
            <Spinner
              style={{
                width: "3rem",
                height: "3rem",
              }}
            >
              Loading...
            </Spinner>
          ) : (
            <CustomTable
              titles={titles}
              items={allOrders}
              view={"View Order"}
            />
          )}
        </Col>
      </SectionContainer>
    </Helmet>
  );
};

export default RequireAuth(OrdersHistory);
