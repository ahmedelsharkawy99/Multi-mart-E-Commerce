import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./productCard.css";
import { cartActions } from "../../store/slices/cartSlice/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    const cartItem = {
      id: item.id,
      productName: item.title,
      image: item.image,
      price: item.price,
    };
    dispatch(cartActions.addItem(cartItem));
  };
  return (
    <div className="mb-2 col-lg-3 col-md-4">
      <div className="product__item">
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={item.image}
            alt={item.title}
            loading="lazy"
          />
        </div>
        <div className="p-2 product__info">
          <h3>
            <Link to={`/shop/${item.id}`}>{item.title}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__item-bottom  d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
