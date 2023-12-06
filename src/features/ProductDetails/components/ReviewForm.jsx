import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { formatDate } from "../../../shared/utils/helpers";
import { reviewFormState } from "../shared/utils/constants";
import { addReview } from "../../../shared/store/slices/productsSlice/productsActions";

import RatingStars from "./RatingStars";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";

const ReviewForm = ({ reviews }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState(reviewFormState);
  const [rating, setRating] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formData.user || !formData.text || !rating)
      return toast.error("Please complete your review");

    const reviewObj = {
      ...formData,
      rating,
      createdAt: formatDate(Date.now()),
    };

    let upatedReviews;
    if (!reviews) {
      upatedReviews = [reviewObj];
    } else {
      upatedReviews = [...reviews, reviewObj];
    }

    const totalRating = upatedReviews.reduce((acc, cur) => acc + cur.rating, 0);
    const avgRating = totalRating / upatedReviews.length;

    dispatch(addReview(id, { reviews: upatedReviews, avgRating }));

    setFormData(reviewFormState);
    setRating(null);

    toast.success("Review successfully submitted");
  };

  const changeHandler = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <form onSubmit={submitHandler}>
      <CustomInput
        id="user"
        required
        type="text"
        value={formData.user}
        placeholder="Enter Name"
        onChange={changeHandler}
      />

      <div className="form__group d-flex align-items-center gap-3 rating__group">
        <RatingStars rating={rating} onClick={setRating} />
      </div>

      <CustomInput
        rows={4}
        required
        id="text"
        as="textarea"
        value={formData.text}
        onChange={changeHandler}
        placeholder="Review Message..."
      />

      <button className="buy__btn">Submit</button>
    </form>
  );
};

export default ReviewForm;
