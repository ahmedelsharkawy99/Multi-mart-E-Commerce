import { useSelector } from "react-redux";

import RequireAuth from "../../../routes/RequireAuth";
import { ordersTitles } from "../shared/utils/tableHeaderTitle";

import NoOrdersFound from "../components/NoOrdersFound";
import OrdersTableBody from "../components/OrdersTableBody";
import Helmet from "../../../shared/components/Helmet/Helmet";
import CustomTable from "../../../shared/components/CustomTable/CustomTable";
import CommonSection from "../../../shared/components/CommonSection/CommonSection";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const OrdersHistory = () => {
  const allOrders = useSelector(({ orders }) => orders.allOrders);

  return (
    <Helmet title="Orders History">
      <CommonSection title="Orders History" />

      <SectionContainer>
        <div className="col">
          {allOrders.length === 0 ? (
            <NoOrdersFound />
          ) : (
            <CustomTable titles={ordersTitles}>
              <OrdersTableBody items={allOrders} />
            </CustomTable>
          )}
        </div>
      </SectionContainer>
    </Helmet>
  );
};

export default RequireAuth(OrdersHistory);
