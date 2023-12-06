import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import { cartActions } from "../../../shared/store/slices/cartSlice/cartSlice";

import RatingStars from "./RatingStars";
import Image from "../../../shared/components/Image/Image";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const ProductDetailsSection = ({ product }) => {
  const dispatch = useDispatch();

  const { title, image, price, avgRating, category, shortDesc } = product;

  return (
    <SectionContainer sectionClass="pt-0">
      <div className="col-lg-6">
        <Image
          alt={title}
          srcSet={`${image} 320w,
                     ${image} 480w,
                     ${image} 800w`}
          sizes="(max-width: 320px) 296px,
                   (max-width: 480px) 400px,
                   (max-width: 768px) 336px,
                   (max-width: 1024px) 456px,
                                      636px"
        />
      </div>
      <div className="col-lg-6">
        <div className="product__details">
          <h2>{title}</h2>

          <div className="product__ratings d-flex align-items-center gap-5 mb-3">
            <div>
              <RatingStars rating={avgRating} />
            </div>
            <p>
              (<span>{avgRating ? avgRating : "No"}</span> ratings)
            </p>
          </div>

          <div className="d-flex align-items-center gap-5">
            <span className="product__price">${price}</span>
            <span>Category: {category.toUpperCase()}</span>
          </div>

          <p className="mt-3">{shortDesc}</p>

          <motion.button
            whileTap={{ scale: 1.2 }}
            className="buy__btn"
            onClick={() => dispatch(cartActions.addItem(product))}
          >
            Add to cart
          </motion.button>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ProductDetailsSection;
