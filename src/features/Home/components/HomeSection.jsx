import { useSelector } from "react-redux";

import ProductsList from "../../../shared/components/ProductsList/ProductsList";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";
const HomeSection = ({ title, value, className }) => {
  const products = useSelector(({ products }) => products.products);

  return (
    <SectionContainer sectionClass={className}>
      <div className="col-lg-12 mb-5">
        <h2 className="section__title">{title}</h2>
      </div>
      <ProductsList products={products} value={value} />
    </SectionContainer>
  );
};

export default HomeSection;
