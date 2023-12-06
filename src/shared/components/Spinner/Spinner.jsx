const Spinner = ({ color, width, height }) => {
  return (
    <div
      className={`spinner-border text-${color}`}
      role="status"
      style={{ width, height }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
