import "../shared/styles/logo.css";
import logo from "../../../assets/images/eco-logo.png";

import Image from "../../../shared/components/Image/Image";

const Logo = ({ headingClassNames }) => {
  return (
    <div className="logo">
      <Image
        alt="logo"
        srcSet={`${logo} 320w,
                 ${logo} 480w,
                 ${logo} 800w`}
        sizes="(max-width: 768px) 16px,24px"
      />
      <div>
        <h1 className={headingClassNames}>Multimart</h1>
      </div>
    </div>
  );
};

export default Logo;
