import { useReducer } from "react";

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.val,
      isTouched: state.isTouched,
    };
  }

  return {
    value: "",
    isTouched: false,
  };
};

const useInput = (validValue) => {
  const [inputValue, dispatchInputValue] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
  });

  const isValidValue = validValue(inputValue.value);
  const hasError = !isValidValue && inputValue.isTouched;

  const inputChangeHandler = (event) => {
    dispatchInputValue({ type: "INPUT", val: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatchInputValue({ type: "BLUR" });
  };

  return {
    value: inputValue.value,
    isValid: isValidValue,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
