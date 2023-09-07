import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Col, Spinner } from "reactstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect, useCallback } from "react";

import "./productDetails.css";
import { cartActions } from "../../redux/slices/cartSlice/cartSlice";
import { fetchProducts } from "../../redux/slices/productsSlice/productsActions";
import { productsActions } from "../../redux/slices/productsSlice/productsSlice";

import Helmet from "../../components/Helmet/Helmet";
import ProductsList from "../../components/UI/ProductsList/ProductsList";
import CommonSection from "../../components/UI/CommonSection/CommonSection";
import SectionContainer from "../../components/UI/SectionContainer/SectionContainer";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(({ products }) => products.productDetails);

  const relatedProducts = useSelector(
    ({ products }) => products.productsPlaceholders
  );

  const reviewMsg = useRef("");
  const reviewUser = useRef("");
  const [rating, setRating] = useState(null);
  const [activeTap, setActiveTap] = useState("desc");

  const {
    title,
    image,
    price,
    avgRating,
    reviews,
    description,
    category,
    shortDesc,
  } = product;

  const addToCart = useCallback(
    () => dispatch(cartActions.addItem(product)),
    [dispatch, product]
  );

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    if (!reviewUserName || !reviewUserMsg || !rating)
      return toast.error("Please complete your review");

    const reviewObj = {
      user: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    toast.success("Review successfully submitted");
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      await dispatch(fetchProducts());
      dispatch(productsActions.getProductDetails(id));
      dispatch(
        productsActions.filterProducts({
          type: "CATEGORY",
          value: product.category,
          id,
        })
      );
    };

    if (relatedProducts.length === 0) {
      fetchAllProducts();
    } else {
      dispatch(productsActions.getProductDetails(id));
      dispatch(
        productsActions.filterProducts({
          type: "CATEGORY",
          value: product.category,
          id,
        })
      );
    }
  }, [dispatch, id, product.category]);

  return (
    <Helmet title={title || "Product Details"}>
      <CommonSection title={title} />

      {Object.keys(product).length === 0 ? (
        <div className="text-center m-5">
          <Spinner
            style={{
              width: "5rem",
              height: "5rem",
            }}
          >
            Loading...
          </Spinner>
        </div>
      ) : (
        <>
          <SectionContainer sectionClass="pt-0">
            <Col lg="6">
              <img src={image} alt={title} />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{title}</h2>

                <div className="product__ratings d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i
                        className={`ri-star-${avgRating ? "fill" : "line"}`}
                      ></i>
                    </span>
                    <span>
                      <i
                        className={`ri-star-${avgRating ? "fill" : "line"}`}
                      ></i>
                    </span>
                    <span>
                      <i
                        className={`ri-star-${avgRating ? "fill" : "line"}`}
                      ></i>
                    </span>
                    <span>
                      <i
                        className={`ri-star-${avgRating ? "fill" : "line"}`}
                      ></i>
                    </span>
                    <span>
                      <i
                        className={`ri-star-${avgRating ? "fill" : "line"}`}
                      ></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating ? avgRating : "No"}</span> ratings)
                  </p>
                </div>

                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category: {category.toUpperCase()}</span>
                </div>

                <p className="mt-3">{shortDesc}</p>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to cart
                </motion.button>
              </div>
            </Col>
          </SectionContainer>

          <SectionContainer sectionClass="pt-0">
            <Col lg="12">
              <div className="tap__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${activeTap === "desc" ? "active__tap" : ""}`}
                  onClick={() => setActiveTap("desc")}
                >
                  Description
                </h6>

                <h6
                  className={`${activeTap === "rev" ? "active__tap" : ""}`}
                  onClick={() => setActiveTap("rev")}
                >
                  Reviews ({reviews && reviews.length})
                </h6>
              </div>

              {activeTap === "desc" ? (
                <motion.div
                  key={activeTap}
                  initial={{ opacity: 0, translateY: "-20px" }}
                  animate={{
                    opacity: 0.5,
                    translateY: "-10px",
                    transitionEnd: {
                      opacity: 1,
                      translateY: "0px",
                    },
                  }}
                  transition={{ ease: "easeInOut" }}
                  className="tap__content mt-5"
                >
                  <p>{description}</p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeTap}
                  initial={{ opacity: 0, translateY: "-20px" }}
                  animate={{
                    opacity: 0.5,
                    translateY: "-10px",
                    transitionEnd: {
                      opacity: 1,
                      translateY: "0px",
                    },
                  }}
                  transition={{ ease: "easeInOut" }}
                  className="product__review mt-5"
                >
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map((item, i) => (
                        <li key={i} className="mb-4">
                          <h6>{item.user || "Jone Doe"}</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form onSubmit={submitHandler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            ref={reviewUser}
                            required
                          />
                        </div>

                        <div className="form__group d-flex align-items-center gap-3 rating__group">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1
                            <i
                              className={`ri-star-${
                                rating >= 1 ? "fill" : "line"
                              }`}
                            ></i>
                          </motion.span>

                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2
                            <i
                              className={`ri-star-${
                                rating >= 2 ? "fill" : "line"
                              }`}
                            ></i>
                          </motion.span>

                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3
                            <i
                              className={`ri-star-${
                                rating >= 3 ? "fill" : "line"
                              }`}
                            ></i>
                          </motion.span>

                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4
                            <i
                              className={`ri-star-${
                                rating >= 4 ? "fill" : "line"
                              }`}
                            ></i>
                          </motion.span>

                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5
                            <i
                              className={`ri-star-${
                                rating === 5 ? "fill" : "line"
                              }`}
                            ></i>
                          </motion.span>
                        </div>

                        <div className="form__group">
                          <textarea
                            rows={4}
                            type="text"
                            ref={reviewMsg}
                            placeholder="Review Message..."
                            required
                          />
                        </div>

                        <button className="buy__btn">Submit</button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}
            </Col>

            {relatedProducts.length !== 0 && (
              <>
                <Col lg="12" className="mt-5">
                  <h2 className="related__title">You might also like</h2>
                </Col>

                <ProductsList products={relatedProducts} />
              </>
            )}
          </SectionContainer>
        </>
      )}
    </Helmet>
  );
};

export default ProductDetails;
