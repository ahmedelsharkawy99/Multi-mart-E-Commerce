import { titles } from "../shared/utils/tableTitles";

import OrderTableBody from "./OrderTableBody";
import CustomTable from "../../../shared/components/CustomTable/CustomTable";

const OrderDetails = ({ order }) => {
  const { userDetails, orderDetails } = order;
  return (
    <div className="col-lg-9 mb-5">
      <div className="order__details">
        <div className="card p-3 mb-5">
          <h2 className="mb-4">Shipping Address</h2>
          <div className="d-flex flex-wrap gap-2 justify-content-start justify-content-md-between mb-3 ">
            <div>{userDetails.displayName},</div>
            <div>{userDetails.phoneNumber},</div>
            <div>{userDetails.street},</div>
            <div>{userDetails.city},</div>
            <div>{userDetails.postalCode},</div>
            <div>{userDetails.country}.</div>
          </div>
        </div>

        <CustomTable titles={titles}>
          <OrderTableBody items={orderDetails.products} />
        </CustomTable>
      </div>
    </div>
  );
};

export default OrderDetails;
