import { motion } from "framer-motion";

import Image from "../../../shared/components/Image/Image";

const ServicesItem = ({ item }) => {
  return (
    <div className="col-md-4 col-lg-3">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="services__item"
        style={{ background: item.bg }}
      >
        <span className="d-flex align-items-center justify-content-center">
          <Image srcSet={item.icon} alt={item.title} />
        </span>
        <div>
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesItem;
