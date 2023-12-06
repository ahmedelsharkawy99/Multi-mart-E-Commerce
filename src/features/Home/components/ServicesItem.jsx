import { motion } from "framer-motion";
const ServicesItem = ({ item }) => {
  return (
    <div className="col-md-4 col-lg-3">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="services__item"
        style={{ background: item.bg }}
      >
        <span>
          <i className={item.icon}></i>
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
