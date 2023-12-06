import { useSelector } from "react-redux";

import "../shared/styles/shop.css";

import FilterSection from "../components/FilterSection";
import Helmet from "../../../shared/components/Helmet/Helmet";
import ProductsList from "../../../shared/components/ProductsList/ProductsList";
import CommonSection from "../../../shared/components/CommonSection/CommonSection";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const Shop = () => {
  const productsPlaceHolders = useSelector(
    ({ products }) => products.productsPlaceholders
  );

  return (
    <Helmet title="Shop">
      <CommonSection title={"Products"} />
      <FilterSection />

      <SectionContainer sectionClass="pt-0">
        {productsPlaceHolders.length === 0 ? (
          <h1 className="text-center fs-4">No Products Found!</h1>
        ) : (
          <ProductsList products={productsPlaceHolders} />
        )}
      </SectionContainer>
    </Helmet>
  );
};

export default Shop;
