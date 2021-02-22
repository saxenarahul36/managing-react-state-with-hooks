import React, { useState, useContext } from "react";
import { saveShippingAddress } from "../../services/shippingService";
import { GlobalContext } from "../context/GlobalState";
// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};
const STATUS = {
  IDLE: "IDLE",
  SUBMITTING: "SUBMITTING",
  SUBMITTED: "SUBMITTED",
  COMPLETED: "COMPLETED",
};

export default function Checkout() {
  const { emptyCart } = useContext(GlobalContext);
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setError] = useState(null);
  const [touched, setTouched] = useState({});
  const getError = (addres) => {
    const result = {};
    if (!addres.city) result.city = "City is required.";
    if (!addres.country) result.country = "Country is required.";
    return result;
  };
  const error = getError(address);

  const isValid = Object.keys(error).length === 0;
  function handleChange(e) {
    e.persist();
    setAddress((currentAddresh) => {
      return { ...currentAddresh, [e.target.id]: e.target.value };
    });
  }

  function handleBlur(event) {
    event.persist();
    debugger;
    // TODO
    setTouched((current) => {
      return { ...current, [event.target.id]: true };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(address);
        emptyCart();
        setStatus(STATUS.COMPLETED);
      } catch (err) {
        setError(err);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }
  if (saveError) {
    throw saveError;
  }
  if (STATUS.COMPLETED === status) {
    return <h2>Thanks for shopping with us!.</h2>;
  }
  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.keys(error).map((key) => (
              <li key={key}>{error[key]}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status === STATUS.SUBMITTED) && error.city}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
          <p role="alert">
            {(touched.country || status === STATUS.SUBMITTED) && error.country}
          </p>
        </div>

        <div>
          <input
            disabled={status === STATUS.SUBMITTING}
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
          />
        </div>
      </form>
    </>
  );
}
