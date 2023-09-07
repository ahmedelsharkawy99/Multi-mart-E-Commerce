import { useEffect } from "react";
import { Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import "./shop.css";

import Helmet from "../../components/Helmet/Helmet";
import ProductsList from "../../components/UI/ProductsList/ProductsList";
import CommonSection from "../../components/UI/CommonSection/CommonSection";
import { productsActions } from "../../redux/slices/productsSlice/productsSlice";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";

const Shop = () => {
  const dispatch = useDispatch();
  const productsPlaceHolders = useSelector(
    ({ products }) => products.productsPlaceholders
  );

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "all")
      return dispatch(productsActions.filterProducts());

    dispatch(
      productsActions.filterProducts({ type: "CATEGORY", value: filterValue })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.value.toLowerCase();

    dispatch(productsActions.filterProducts(searchQuery));
  };

  useEffect(() => {
    dispatch(productsActions.filterProducts());
  }, [dispatch]);
  return (
    <Helmet title="Shop">
      <CommonSection title={"Products"} />

      <SectionContainer>
        <Col lg="3">
          <div className="filter__widget">
            <select onChange={handleFilter}>
              <option value="all">Filter By Category</option>
              <option value="sofa">Sofa</option>
              <option value="chair">Chair</option>
              <option value="mobile">Mobile</option>
              <option value="watch">Watch</option>
              <option value="wireless">Wireless</option>
            </select>
          </div>
        </Col>
        <Col lg="9" md="12">
          <div className="search__box w-100 d-flex align-items-center justify-content-between">
            <input
              type="text"
              placeholder="Search....."
              onChange={handleSearch}
            />
            <span>
              <i className="ri-search-line"></i>
            </span>
          </div>
        </Col>
      </SectionContainer>

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
