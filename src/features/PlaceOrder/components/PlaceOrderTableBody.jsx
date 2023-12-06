import Image from "../../../shared/components/Image/Image";

const PlaceOrderTableBody = ({ items }) => {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          <td>
            <Image
              alt={item.productName}
              srcSet={`${item.image} 320w,
                     ${item.image} 480w,
                     ${item.image} 800w`}
              sizes="80px"
            />
          </td>
          <td>{item.productName}</td>
          <td>{item.price}</td>
          <td>{item.quantity}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default PlaceOrderTableBody;
