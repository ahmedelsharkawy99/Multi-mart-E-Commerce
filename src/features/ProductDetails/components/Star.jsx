import { motion } from "framer-motion";
const Star = ({ onClick, index, rating }) => {
  return (
    <motion.span whileTap={{ scale: 1.2 }} onClick={onClick?.bind(null, index)}>
      <i
        className={`ri-star-${
          rating >= index ? "fill" : rating > index - 1 ? "half-line" : "line"
        }`}
      ></i>
    </motion.span>
  );
};

export default Star;
