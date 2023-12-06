import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";

import counterImage from "../../../assets/images/counter-timer-img.png";

import Clock from "./Clock";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";
import Image from "../../../shared/components/Image/Image";

const OfferSection = () => {
  const [offerIsEnd, setOfferIsEnd] = useState(false);

  const onOfferEnd = useCallback(() => setOfferIsEnd(true), []);
  return (
    !offerIsEnd && (
      <SectionContainer sectionClass="timer__count">
        <div className="col-md-12 col-lg-6">
          <div className="timer__top-content">
            <h4 className="text-white fs-6 mb-2">Limited offers</h4>
            <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
            <Clock onOfferEnd={onOfferEnd} />
            <motion.button whileTap={{ scale: 1.2 }} className="store__btn">
              <Link to="/shop">Visit Store</Link>
            </motion.button>
          </div>
        </div>
        <div className="col-md-12 col-lg-6 text-end counter__img">
          <Image
            alt="Modern Chair"
            srcSet={`${counterImage} 320w,
                     ${counterImage} 480w,
                     ${counterImage} 800w`}
            sizes="
                   (min-width: 1024px, max-width: 1200px) 319.19px,
                   (min-width: 1200px, max-width: 1400px) 382.19px,
                                      445.19px"
          />
        </div>
      </SectionContainer>
    )
  );
};

export default OfferSection;
