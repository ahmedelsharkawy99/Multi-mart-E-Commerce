import { Link } from "react-router-dom";

const OrdersTableBody = ({ items }) => {
  return (
    <tbody className="text-start">
      {items.map((item) => (
        <tr key={item.id}>
          <td className="text-start">{item.id}</td>
          <td className="text-start">{`$${item.orderDetails.totalAmount}`}</td>
          <td className="text-start">
            {item.isPaid ? item.paidAt : "Not Paid"}
          </td>
          <td className="text-start">
            {item.isDelivered ? item.deliveredAt : "Not Delivered"}
          </td>

          <td className="text-start">
            <Link to={`/orders/${item.id}`} className="">
              view
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrdersTableBody;
