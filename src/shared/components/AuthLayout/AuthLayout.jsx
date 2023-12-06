const AuthLayout = ({ title, children }) => {
  return (
    <article className="container">
      <div className="row my-5">
        <div className="col-lg-6 m-auto text-center">
          <h3 className="fw-bold mb-4">{title}</h3>
          {children}
        </div>
      </div>
    </article>
  );
};

export default AuthLayout;
