import { useDispatch } from "react-redux";

import { productsActions } from "../../../shared/store/slices/productsSlice/productsSlice";

import CustomInput from "../../../shared/components/CustomInput/CustomInput";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const FilterSection = () => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "all") {
      dispatch(productsActions.filterProducts());
      return;
    }

    dispatch(
      productsActions.filterProducts({ type: "CATEGORY", value: filterValue })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.value.toLowerCase();

    dispatch(productsActions.filterProducts(searchQuery));
  };

  return (
    <SectionContainer>
      <article className="col-lg-3">
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
      </article>
      <article className="col-md-12 col-lg-9">
        <CustomInput
          containerClass="search__box w-100 d-flex align-items-center justify-content-between position-relative"
          icon="ri-search-line"
          type="text"
          className="border-0"
          placeholder="Search....."
          onChange={handleSearch}
        />
      </article>
    </SectionContainer>
  );
};

export default FilterSection;
