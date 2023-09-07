import ProductCard from "../ProductCard/ProductCard";

const filteredProductsHandler = (arr, value) => {
  if (!value) return arr;
  const filteredProducts = arr.filter((product) => product.category === value);
  return filteredProducts;
};
const ProductsList = ({ products, value }) => {
  const filteredProducts = filteredProductsHandler(products, value);

  return (
    <>
      {filteredProducts?.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}
    </>
  );
};

export default ProductsList;
