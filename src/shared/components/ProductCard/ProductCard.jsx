import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./productCard.css";
import { cartActions } from "../../store/slices/cartSlice/cartSlice";

import Image from "../Image/Image";
import Plus from "../Icons/Plus";

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
          <Image
            alt={item.title}
            whileHover={{ scale: 0.9 }}
            srcSet={`${item.image} 320w,
                     ${item.image} 480w,
                     ${item.image} 800w`}
            sizes="(max-width: 320px) 296px,
                   (max-width: 480px) 400px,
                   (max-width: 575px) 551px,
                   (max-width: 768px) 516px,
                   (max-width: 1200px) 216px,
                   (max-width: 1440px) 261px,
                                      306px"
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
            <Plus />
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
