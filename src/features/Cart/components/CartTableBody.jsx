import { motion } from "framer-motion";
import Tr from "./Tr";

const CartTableBody = ({ items }) => {
  return (
    <motion.tbody>
      {items.map((item) => (
        <Tr item={item} key={item.id} />
      ))}
    </motion.tbody>
  );
};

export default CartTableBody;
