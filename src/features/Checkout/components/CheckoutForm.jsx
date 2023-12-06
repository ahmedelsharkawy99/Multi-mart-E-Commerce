import { Form } from "react-router-dom";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";

const CheckoutForm = ({ formData, onChange }) => {
  return (
    <Form className="billing__form">
      <CustomInput
        type="text"
        id="displayName"
        placeholder="Enter your name"
        value={formData.displayName}
        onChange={onChange}
      />
      <CustomInput
        type="email"
        id="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={onChange}
      />
      <CustomInput
        type="text"
        id="phoneNumber"
        placeholder="Phone number"
        value={formData.phoneNumber}
        onChange={onChange}
      />
      <CustomInput
        type="text"
        id="street"
        placeholder="Street address"
        value={formData.street}
        onChange={onChange}
      />
      <CustomInput
        type="text"
        id="city"
        placeholder="City"
        value={formData.city}
        onChange={onChange}
      />
      <CustomInput
        type="text"
        id="postalCode"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={onChange}
      />

      <CustomInput
        type="text"
        id="country"
        placeholder="Country"
        value={formData.country}
        onChange={onChange}
      />
    </Form>
  );
};

export default CheckoutForm;
