import styles from "./Calculator.module.css";
import InputContainer from "./InputContainer";
import input from "./Input.module.css";
const SingleDataRow = ({
  name,
  text,
  value,
  handler,
  inputTag,
  children,
  min,
  max,
  placeholder,
  onfocus,
  onblur,
  disabled,
  setNaOhQuantity
  // setTotalWeight,
}) => {
  // const [value, setValue]= useState(initialValue)

  // const handleChange = (e) => {
  //   const {name, value} = e.target
  //   const num =
  //     value === ""
  //       ? ""
  //       : Math.max(
  //           min,
  //           Math.min(max, Number(value.replace(/\D/g, "")))
  //         );

  //   handler(num, name);
  // };
  return (
    <div className={styles.resultRow}>
      <div className={styles.labeledInput}>
        <label htmlFor={name} className={styles.label}>
          {text}
        </label>

        <InputContainer
          {...{
            name,
            value,
            handler,
            max,
            min,
            placeholder,
            onfocus,
            onblur,
            disabled,
            inputTag,
            setNaOhQuantity
          }}
        />
        {/* <div className={input.inputContainer}>
          <input
            id={name}
            autocomplete="off"
            type="text"
            className={input.input}
            name={name}
            value={value}
            placeholder="---"
            onInput={
              (e) => {
                handleChange(e);
              }

            }
            onFocus={{}}
            onBlur={{}}
          />
          <span className={input.inputTag}>{inputTag}</span>
        </div> */}
      </div>
      <div className={styles.result}>{children}</div>
    </div>
  );
};

export default SingleDataRow;
