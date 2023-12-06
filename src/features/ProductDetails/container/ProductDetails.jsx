import { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import "../shared/styles/productDetails.css";

import ReviewTab from "../components/ReviewTab";
import TabsButtons from "../components/TabsButtons";
import DescriptionTab from "../components/DescriptionTab";
import RelatedProducts from "../components/RelatedProducts";
import Helmet from "../../../shared/components/Helmet/Helmet";
import ProductDetailsSection from "../components/ProductDetailsSection";
import CommonSection from "../../../shared/components/CommonSection/CommonSection";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("desc");
  const product = useSelector(({ products }) => products.productDetails);
  const relatedProducts = useSelector(
    ({ products }) => products.productsPlaceholders
  );

  const { title, description, reviews } = product;

  const handleActiveTab = (tap) => setActiveTab(tap);

  return (
    <Helmet title={title || "Product Details"}>
      <CommonSection title={title} />

      <ProductDetailsSection product={product} />

      <SectionContainer sectionClass="pt-0">
        <div className="col-lg-12">
          <TabsButtons
            onClick={handleActiveTab}
            activeTab={activeTab}
            reviews={reviews}
          />

          <AnimatePresence mode="wait">
            {activeTab === "desc" ? (
              <DescriptionTab description={description} key="desc" />
            ) : (
              <ReviewTab reviews={reviews} key="rev" />
            )}
          </AnimatePresence>
        </div>

        <RelatedProducts products={relatedProducts} />
      </SectionContainer>
    </Helmet>
  );
};

export default ProductDetails;
