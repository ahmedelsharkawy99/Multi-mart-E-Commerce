import { Table } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./customTable.css";
import { cartActions } from "../../../redux/slices/cartSlice/cartSlice";
const CustomTable = ({ titles, items, removeItemHandler, view }) => {
  return (
    <Table responsive className="table">
      <CustomTableHead titles={titles} />
      <CustomTableBody
        items={items}
        removeItemHandler={removeItemHandler}
        view={view}
      />
    </Table>
  );
};

const CustomTableHead = ({ titles }) => {
  return (
    <thead>
      <Tr titles={titles} />
    </thead>
  );
};

const Tr = ({ titles }) => {
  return (
    <tr>
      {titles.map((t, i) => (
        <th key={i}>{t}</th>
      ))}
    </tr>
  );
};

const CustomTableBody = ({ items, removeItemHandler, view }) => {
  const dispatch = useDispatch();
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          <td>
            {view ? item.id : <img src={item.image} alt={item.productName} />}
          </td>
          <td>
            {view ? `$${item.orderDetails.totalAmount}` : item.productName}
          </td>
          <td>
            {!view ? `$${item.price}` : item.isPaid ? item.paidAt : "Not Paid"}
          </td>
          <td>
            {!view ? (
              <div className="actions">
                {removeItemHandler && (
                  <button
                    onClick={() =>
                      dispatch(cartActions.reduceItemQuantity(item.id))
                    }
                  >
                    −
                  </button>
                )}
                <span>{item.quantity}</span>
                {removeItemHandler && (
                  <button onClick={() => dispatch(cartActions.addItem(item))}>
                    +
                  </button>
                )}
              </div>
            ) : item.isDelivered ? (
              item.deliveredAt
            ) : (
              "Not Delivered"
            )}
          </td>
          {removeItemHandler && (
            <td>
              <motion.span
                onClick={removeItemHandler.bind(null, item.id)}
                whileTap={{ scale: 1.2 }}
              >
                <i className="ri-delete-bin-line"></i>
              </motion.span>
            </td>
          )}

          {view && (
            <td>
              <Link to={`/orders/${item.id}`}>{view}</Link>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default CustomTable;
