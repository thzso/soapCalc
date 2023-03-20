import { useEffect, useState } from "react";
import input from "./Input.module.css";

const InputContainer = ({
  name,
  value,
  handler,
  max,
  min,
  placeholder,
  disabled,
  inputTag,
  children,
  setNaOhQuantity,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setNaOhQuantity("");
  }, [isFocused]);

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    const num =
      value === ""
        ? ""
        : Math.max(min, Math.min(max, Number(value.replace(/\D/g, ""))));

    handler(num, name);
  };

  return (
    <div className={input.inputContainer}>
      <input
        id={name}
        disabled={disabled}
        autoComplete="off"
        type="text"
        className={input.input}
        name={name}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        onInput={(e) => {
          handleChange(e);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && children}
      <span className={input.inputTag}>{inputTag}</span>
    </div>
  );
};

export default InputContainer;
