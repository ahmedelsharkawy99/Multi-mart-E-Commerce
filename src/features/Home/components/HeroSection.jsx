import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import heroImage from "../../../assets/images/hero-img.png";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";
import Image from "../../../shared/components/Image/Image";

const HeroSection = () => {
  const year = new Date().getFullYear();

  return (
    <SectionContainer sectionClass="hero__section">
      <div className="col-md-6 col-lg-6">
        <div className="hero__content">
          <p className="hero__subtitle">Trending Products in {year}</p>
          <h2>Make Your Interior More Minimalstic & Modern</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            corrupti deleniti animi? Officia, ex vero quasi laborum animi
            quaerat corporis.
          </p>
          <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
            <Link to="/shop">SHOP NOW</Link>
          </motion.button>
        </div>
      </div>

      <div className="col-md-6 col-lg-6">
        <div className="hero__img">
          <Image
            alt="Modern Chair"
            srcSet={`${heroImage} 320w,
                     ${heroImage} 480w,
                     ${heroImage} 800w`}
            sizes="(max-width: 320px) 296px,
                   (max-width: 480px) 400px,
                   (max-width: 768px) 336px,
                   (max-width: 1024px) 456px,
                                      636px"
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
