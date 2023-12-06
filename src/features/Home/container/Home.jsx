import { lazy } from "react";

import "../shared/styles/home.css";

import Services from "../components/Services";
import HeroSection from "../components/HeroSection";
import HomeSection from "../components/HomeSection";
import Helmet from "../../../shared/components/Helmet/Helmet";
const OfferSection = lazy(() => import("../components/OfferSection"));

const Home = () => {
  return (
    <Helmet title="Home">
      <HeroSection />
      <Services />

      <HomeSection
        title="Trending Products"
        value="chair"
        className="trending__products"
      />

      <HomeSection title="Best Sales" value="sofa" className="best__sales" />

      <OfferSection />

      <HomeSection
        title="New Arriavls"
        value="mobile"
        className="new__arrivals"
      />

      <HomeSection
        title="Popular in Category"
        value="watch"
        className="popular__catergory"
      />
    </Helmet>
  );
};

export default Home;
