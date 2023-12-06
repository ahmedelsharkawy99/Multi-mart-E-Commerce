const TabsButtons = ({ onClick, activeTab, reviews }) => {
  return (
    <menu className="tap__wrapper d-flex align-items-center gap-5">
      <button
        className={`btn ${
          activeTab === "desc" ? "btn-secondary" : "btn-outline-secondary"
        }`}
        onClick={onClick.bind(null, "desc")}
      >
        Description
      </button>

      <button
        className={`btn ${
          activeTab === "rev" ? "btn-secondary" : "btn-outline-secondary"
        }`}
        onClick={onClick.bind(null, "rev")}
      >
        Reviews ({(reviews && reviews.length) || 0})
      </button>
    </menu>
  );
};

export default TabsButtons;
