import { Link } from "react-router-dom";

const NoOrdersFound = () => {
  return (
    <h4 className="fs-4">
      You have no orders yet.
      <Link to={"/shop"} className="text-primary">
        Shopping Now!
      </Link>
    </h4>
  );
};

export default NoOrdersFound;
