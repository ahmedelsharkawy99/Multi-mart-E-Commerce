const ShippingCard = ({ userDetails, children }) => {
  return (
    <div className="card p-3 mb-5">
      <h2 className="mb-4">Shipping Address</h2>
      <div className="d-flex flex-wrap gap-2 justify-content-start mb-3 ">
        <div>{userDetails.displayName},</div>
        <div>{userDetails.street},</div>
        <div>{userDetails.city},</div>
        <div>{userDetails.postalCode},</div>
        <div>{userDetails.country}.</div>
      </div>
      {children}
    </div>
  );
};

export default ShippingCard;
