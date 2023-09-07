import { Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./productCard.css";

import { cartActions } from "../../../redux/slices/cartSlice/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () =>
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.title,
        imgUrl: item.image,
        price: item.price,
      })
    );

  return (
    <Col lg="3" md="4" className="mb-2">
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
    </Col>
  );
};

export default ProductCard;
