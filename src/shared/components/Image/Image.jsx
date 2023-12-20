import { motion } from "framer-motion";

const Image = (props) => {
  return <motion.img {...props} loading="lazy" decoding="async" />;
};

export default Image;
