import { useRef, useState } from "react";
import Classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim().length === 0;
const hasFiveChar = (value) => value.trim().length > 5;

const Checkout = (props) => {
  const [formInputIsValid, setFormInputIsValid] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const reset = () => {
    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    postalInputRef.current.value = "";
    cityInputRef.current.value = "";
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enterNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = hasFiveChar(enteredPostal);

    setFormInputIsValid({
      name: enterNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enterNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    const userData = {
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    };

    if (!formIsValid) {
      return;
    }

    props.onConfirm(userData);
    reset();
  };

  return (
    <form className={Classes.form} onSubmit={confirmHandler}>
      <div
        className={`${Classes.control} ${
          formInputIsValid.name ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameInputRef} />
        {!formInputIsValid.name && <p>Please enter valid name.</p>}
      </div>
      <div
        className={`${Classes.control} ${
          formInputIsValid.street ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputIsValid.street && <p>Please enter the valid street name.</p>}
      </div>
      <div
        className={`${Classes.control} ${
          formInputIsValid.postalCode ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputIsValid.postalCode && <p>Enter the valid postal code</p>}
      </div>
      <div
        className={`${Classes.control} ${
          formInputIsValid.city ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputIsValid.city && <p>Enter the valid city name</p>}
      </div>
      <div className={Classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={Classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
