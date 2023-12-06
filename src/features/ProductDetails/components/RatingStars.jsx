import Star from "./Star";

const RatingStars = ({ rating, onClick }) => {
  return [1, 2, 3, 4, 5].map((star) => (
    <Star key={star} index={star} rating={rating} onClick={onClick} />
  ));
};

export default RatingStars;
