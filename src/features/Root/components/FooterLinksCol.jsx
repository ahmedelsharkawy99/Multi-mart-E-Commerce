import { Link } from "react-router-dom";

const FooterLinksCol = ({
  children,
  title,
  className = "",
  lg = "",
  md = "",
  links,
}) => {
  return (
    <div className={`mb-4 ${lg} ${md}`}>
      <div className={"footer__quick-links"}>
        <h2 className="quick__links-title">{title}</h2>
        <ul className={`list-group ${className}`}>
          {links &&
            links.map((link) => (
              <li className="ps-0 border-0 list-group-item" key={link.title}>
                <Link to={link.path}>{link.title}</Link>
              </li>
            ))}

          {children}
        </ul>
      </div>
    </div>
  );
};

export default FooterLinksCol;
