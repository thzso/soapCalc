import { useEffect, useState, useRef } from "react";
import styles from "./DataInputs.module.css";
import input from "./Input.module.css";
import InputContainer from "./InputContainer";
import Tooltip from "./Tooltip";

const DataInputs = ({
  // children,
  id,
  oilsData,
  index,
  inputsList,
  setInputsList,
  options,
  totalWeight,
  setDisabled,
  sumPercent,
  setSumpercent,
  setNaOhQuantity,
  setLiquidQuantity,
}) => {
  const [selected, setSelected] = useState(oilsData.oil);
  const [percentValue, setPercentValue] = useState(oilsData.percent);
  const [weightValue, setWeightValue] = useState(oilsData.weight);
  // const [isFocused, setIsFocused] = useState(false);
  const [isWeightFocused, setIsWeightFocused] = useState(false);
  const [isOptionFocused, setIsOptionFocused] = useState(false);

  const ref = useRef();

  const sumWeight = inputsList.reduce(
    (acc, current) => acc + Number(current.weight),
    0
  );

  console.log("inputsList datainputsban", inputsList);
  useEffect(() => {
    if (totalWeight !== "" && percentValue !== "") {
      const newWeight = totalWeight * (percentValue / 100);
      setWeightValue(newWeight);
      setInputsList((prev) =>
        prev.map((obj) => {
          obj.weight = newWeight;
          return obj;
        })
      );
    }

    // const newList= inputsList.map(obj => {
    //   obj.percent = "1"
    //   return obj
    //     })
    //     console.log(inputsList, newList)

    //     setInputsList(newList)
  }, [totalWeight]);

  useEffect(() => {
    const isAllInpuFilled = inputsList.every((obj) =>
      Object.values(obj).every((x) => x !== "")
    );
    const sum = inputsList.reduce(
      (acc, current) => acc + Number(current.percent),
      0
    );
    setSumpercent(sum);
    setDisabled(sum >= 100 || !isAllInpuFilled ? true : false);
  }, [percentValue]);

  // useEffect(() => {
  //   setNaOhQuantity("");
  //   setLiquidQuantity("");
  // }, [selected, percentValue, weightValue, inputsList]);

  const updateInputsList = (name, value, otherKey, otherValue) => {
    const modifiedObject = inputsList.find((obj) => obj.id === id);
    modifiedObject[name] = value;

    if (otherKey !== undefined && otherValue !== undefined) {
      modifiedObject[otherKey] = otherValue;
    }
  };
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelected(value);
    updateInputsList(name, value);
  };
  const handlePercentChange = (num, name) => {
    // const { name, value } = e.target;

    // const num =
    //   value === ""
    //     ? ""
    //     : Math.max(0, Math.min(100, Number(value.replace(/\D/g, ""))));

    const weightUpdate = num === "" ? "" : totalWeight * (num / 100);
    const key = "weight";
    setPercentValue(num);
    setWeightValue(weightUpdate);
    updateInputsList(name, num, key, weightUpdate);
  };
  const handleWeightChange = (num, name) => {
    // const { name, value } = e.target;
    // const num =
    //   value === ""
    //     ? ""
    //     : Math.max(1, Math.min(totalWeight, Number(value.replace(/\D/g, ""))));

    setWeightValue(num);
    const percentUpdate = num === "" ? "" : (num / totalWeight) * 100;
    const key = "percent";
    setPercentValue(percentUpdate);
    updateInputsList(name, num, key, percentUpdate);
  };

  const handleDelete = () => {
    const list = [...inputsList];
    const index = inputsList.findIndex((obj) => obj.id === id);
    list.splice(index, 1);
    setInputsList(list);
    setDisabled(false);
  };

  return (
    <div
      className={`${styles.inputsContainer} ${
        index === 0 && styles.rowWithoutX
      }`}
      ref={ref}
      id={Math.random() * 100}
    >
      <div className={input.customSelect}>
        <select
          className={
            selected !== ""
              ? input.select
              : `${input.select} ${input.selectPlaceholder}`
          }
          name="oil"
          value={selected}
          disabled={totalWeight ? false : true}
          onChange={handleSelectChange}
        >
          {options.map((opt) => (
            <option
              // className={optionFocus? input.optionFocused : {}}
              key={opt.text}
              value={opt.value}
              disabled={
                opt.disabled
                  ? opt.disabled
                  : inputsList.some((obj) => obj.oil === opt.text)
              }
            >
              {opt.text}
            </option>
          ))}
        </select>
        <span className={input.selectArrow}></span>
      </div>
      <div className={styles.numberInputs}>
        <InputContainer
          name="percent"
          value={percentValue}
          handler={handlePercentChange}
          max={100}
          min={0}
          placeholder={totalWeight ? `max ${100 - sumPercent}` : "---"}
          disabled={selected && totalWeight ? false : true}
          inputTag="g"
          {...{setNaOhQuantity}}
        >
          {sumPercent >= 100 && <Tooltip {...{ sumPercent }} />}
        </InputContainer>

        {/* <div className={input.inputContainer}>
          <input
            className={input.input}
            ref={percentInputRef}
            type="text"
            name="percent"
            id=""
            value={percentValue}
            disabled={selected && totalWeight ? false : true}
            placeholder={totalWeight ? `max ${100 - sumPercent}` : "---"}
            onInput={handlePercentChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
          />
          {isFocused && children}
          <span className={input.inputTag}>%</span>
        </div> */}

        <InputContainer
          name="weight"
          value={weightValue}
          handler={handleWeightChange}
          max={totalWeight}
          min={1}
          placeholder={totalWeight ? `max ${totalWeight - sumWeight}` : "---"}
          disabled={selected && totalWeight ? false : true}
          inputTag="g"
          {...{setNaOhQuantity}}
        >
          {sumPercent >= 100 && <Tooltip {...{ sumPercent }} />}
        </InputContainer>

        {/* <div className={input.inputContainer}>
          <input
            className={input.input}
            ref={weightInputRef}
            type="text"
            name="weight"
            id=""
            value={weightValue}
            disabled={selected && totalWeight ? false : true}
            placeholder={totalWeight ? `max ${totalWeight - sumWeight}` : "---"}
            onInput={handleWeightChange}
            onFocus={() => setIsWeightFocused(true)}
            onBlur={() => setIsWeightFocused(false)}
            autoComplete="off"
          />
          {isWeightFocused && children}
          <span className={input.inputTag}>g</span>
        </div> */}

        <div className={styles.delete}>
          {index !== 0 && (
            <span onClick={handleDelete} className="material-symbols-outlined">
              close
            </span>
          )}
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
};
export default DataInputs;
