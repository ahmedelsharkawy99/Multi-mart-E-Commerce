const ProductReviews = ({ reviews }) => {
  return (
    <ul className="m-auto w-75">
      {reviews?.map((item) => (
        <li key={item.createdAt} className="mb-4">
          <span className="d-flex align-items-center gap-2">
            <h6>{item.user}</h6>
            <span className="rating">(rating {item.rating})</span>
          </span>
          <p className="d-flex align-items-center justify-content-between gap-2">
            <span>{item.text}</span>
            <small>{item.createdAt}</small>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ProductReviews;
