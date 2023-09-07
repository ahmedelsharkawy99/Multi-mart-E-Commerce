import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";

import "./home.css";
import heroImage from "../../assets/images/hero-img.png";
import counterImage from "../../assets/images/counter-timer-img.png";

import Helmet from "../../components/Helmet/Helmet";
import Clock from "../../components/UI/Clock/Clock";
import Services from "../../components/Services/Services";
import ProductsList from "../../components/UI/ProductsList/ProductsList";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";
import { useSelector } from "react-redux";

const Home = () => {
  const [offerIsEnd, setOfferIsEnd] = useState(false);
  const products = useSelector(({ products }) => products.products);

  const onOfferEnd = () => setOfferIsEnd(true);

  const year = new Date().getFullYear();

  return (
    <Helmet title="Home">
      <SectionContainer sectionClass="hero__section">
        <Col lg="6" md="6">
          <div className="hero__content">
            <p className="hero__subtitle">Trending Products in {year}</p>
            <h2>Make Your Interior More Minimalstic & Modern</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates corrupti deleniti animi? Officia, ex vero quasi laborum
              animi quaerat corporis.
            </p>
            <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
              <Link to="/shop">SHOP NOW</Link>
            </motion.button>
          </div>
        </Col>

        <Col lg="6" md="6">
          <div className="hero__img">
            <img src={heroImage} alt="Modern Chair" />
          </div>
        </Col>
      </SectionContainer>

      <Services />

      <SectionContainer sectionClass="trending__products">
        <Col lg="12" className="mb-5">
          <h2 className="section__title">Trending Products</h2>
        </Col>
        <ProductsList products={products} value="chair" />
      </SectionContainer>

      <SectionContainer sectionClass="best__sales">
        <Col lg="12" className="mb-5">
          <h2 className="section__title">Best Sales</h2>
        </Col>
        <ProductsList products={products} value="sofa" />
      </SectionContainer>

      {!offerIsEnd && (
        <SectionContainer sectionClass="timer__count">
          <Col lg="6" md="12">
            <div className="timer__top-content">
              <h4 className="text-white fs-6 mb-2">Limited offers</h4>
              <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              <Clock onOfferEnd={onOfferEnd} />
              <motion.button whileTap={{ scale: 1.2 }} className="store__btn">
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </div>
          </Col>
          <Col lg="6" md="12" className="text-end counter__img">
            <img src={counterImage} alt="Modern Chair" />
          </Col>
        </SectionContainer>
      )}

      <SectionContainer sectionClass="new__arrivals">
        <Col lg="12" className="mb-5">
          <h2 className="section__title">New Arriavls</h2>
        </Col>
        <ProductsList products={products} value="mobile" />
        <ProductsList products={products} value="wireless" />
      </SectionContainer>

      <SectionContainer sectionClass="popular__catergory">
        <Col lg="12" className="mb-5">
          <h2 className="section__title">Popular in Category</h2>
        </Col>
        <ProductsList products={products} value="watch" />
      </SectionContainer>
    </Helmet>
  );
};

export default Home;
