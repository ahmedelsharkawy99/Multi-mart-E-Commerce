import ProductsList from "../../../shared/components/ProductsList/ProductsList";

const RelatedProducts = ({ products }) => {
  return (
    products.length !== 0 && (
      <>
        <div className="col-lg-12 mt-5">
          <h2 className="related__title">You might also like</h2>
        </div>

        <ProductsList products={products} />
      </>
    )
  );
};

export default RelatedProducts;
