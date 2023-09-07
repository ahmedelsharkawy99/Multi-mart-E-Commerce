import "./logo.css";
import logo from "../../assets/images/eco-logo.png";

const Logo = ({ headingClassNames }) => {
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
      <div>
        <h1 className={headingClassNames || ""}>Multimart</h1>
      </div>
    </div>
  );
};

export default Logo;
