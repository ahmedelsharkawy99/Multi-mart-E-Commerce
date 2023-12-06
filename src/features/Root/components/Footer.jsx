import "../shared/styles/footer.css";
import { quickLinksColOne, quickLinksColTwo } from "../shared/utils/links";

import Logo from "./Logo";
import FooterLinksCol from "./FooterLinksCol";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer mt-auto">
      <article className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <Logo headingClassNames="text-white" />
            <p className="footer__text mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
              explicabo totam cumque pariatur animi fugit sequi necessitatibus
              praesentium vitae quas?
            </p>
          </div>

          <FooterLinksCol
            lg="col-lg-3"
            md="col-md-3"
            title="Top Cateories"
            links={quickLinksColOne}
          />

          <FooterLinksCol
            lg="col-lg-2"
            md="col-md-3"
            title="Useful Links"
            links={quickLinksColTwo}
          />

          <FooterLinksCol
            lg="col-lg-3"
            md="col-md-4"
            title="Contact"
            className="footer__contact"
          >
            <li className="ps-0 border-0 d-flex align-items-center gap-2 list-group-item">
              <span className="align-self-start">
                <i className="ri-map-pin-line"></i>
              </span>
              <address>
                ATTN: Dennis Menees, CEO Global Co. 90210 Broadway Blvd.
                Nashville, TN 37011-5678
              </address>
            </li>

            <li className="ps-0 border-0 d-flex align-items-center gap-2 list-group-item">
              <span>
                <i className="ri-phone-line"></i>
              </span>
              <a href="tel:+201099695674">+201099695674</a>
            </li>

            <li className="ps-0 border-0 d-flex align-items-center gap-2 list-group-item">
              <span>
                <i className="ri-mail-line"></i>
              </span>
              <a href="mailto:aelsharkawy428@gmail.com">
                aelsharkawy428@gmail.com
              </a>
            </li>
          </FooterLinksCol>

          <div className="col-lg-12 text-center">
            <p className="footer__copyright">
              Copyright {year}. Developed by Ahmed ELSharkawy. All rights
              reserved
            </p>
          </div>
        </div>
      </article>
    </footer>
  );
};

export default Footer;
