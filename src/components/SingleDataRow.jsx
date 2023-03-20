import styles from "./Calculator.module.css";
import InputContainer from "./InputContainer";

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
  setNaOhQuantity,
}) => {
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
            setNaOhQuantity,
          }}
        />
      </div>
      <div className={styles.result}>{children}</div>
    </div>
  );
};

export default SingleDataRow;
