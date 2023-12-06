import "../shared/styles/services.css";
import serviceData from "../shared/utils/serviceData";
import ServicesItem from "./ServicesItem";
const Services = () => {
  return (
    <section className="services">
      <div className="container">
        <div className="row">
          {serviceData.map((item) => (
            <ServicesItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
