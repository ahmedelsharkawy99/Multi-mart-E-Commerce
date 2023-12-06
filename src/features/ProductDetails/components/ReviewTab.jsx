import { motion } from "framer-motion";

import { tabAnimationProps } from "../shared/utils/variants";

import ProductReviews from "./ProductReviews";
import ReviewForm from "./ReviewForm";

const ReviewTab = ({ reviews }) => {
  return (
    <motion.div {...tabAnimationProps} className="product__review mt-5">
      <div className="review__wrapper">
        <ProductReviews reviews={reviews} />
        <div className="review__form">
          <h4>Leave your experience</h4>
          <ReviewForm reviews={reviews} />
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewTab;
