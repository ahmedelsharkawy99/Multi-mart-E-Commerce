import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import { cartActions } from "../../../shared/store/slices/cartSlice/cartSlice";

import Image from "../../../shared/components/Image/Image";

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  return (
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
      <td>
        <div className="actions">
          <button
            onClick={() => dispatch(cartActions.reduceItemQuantity(item.id))}
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => dispatch(cartActions.addItem(item))}>+</button>
        </div>
      </td>

      <td>
        <motion.span
          onClick={() => dispatch(cartActions.removeItem(item.id))}
          whileTap={{ scale: 1.2 }}
        >
          <i className="ri-delete-bin-line"></i>
        </motion.span>
      </td>
    </tr>
  );
};

export default Tr;
