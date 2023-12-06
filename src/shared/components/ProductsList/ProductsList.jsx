import { filteredProductsHandler } from "../../utils/helpers.js";

import ProductCard from "../ProductCard/ProductCard";

const ProductsList = ({ products, value }) => {
  const filteredProducts = value
    ? filteredProductsHandler(products, value)
    : products;

  return (
    <>
      {filteredProducts?.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}
    </>
  );
};

export default ProductsList;
