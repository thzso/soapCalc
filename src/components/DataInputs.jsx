import { useEffect, useState } from "react";
import styles from "./DataInputs.module.css";
import input from "./Input.module.css";
import InputContainer from "./InputContainer";
import Tooltip from "./Tooltip";

const DataInputs = ({
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
  setOptions,
}) => {
  const [selected, setSelected] = useState(oilsData.oil);
  const [percentValue, setPercentValue] = useState(oilsData.percent);
  const [weightValue, setWeightValue] = useState(oilsData.weight);

  const sumWeight = inputsList.reduce(
    (acc, current) => acc + Number(current.weight),
    0
  );

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
    if (totalWeight === "") {
      setPercentValue("");
      setWeightValue("");
      setInputsList((prev) =>
        prev.map((obj) => {
          obj.weight = "";
          obj.percent = "";
          return obj;
        })
      );
    }
  }, [totalWeight]);

  const addPercent = (list) => {
    return list.reduce((acc, current) => acc + Number(current.percent), 0);
  };

  useEffect(() => {
    const isAllInpuFilled = inputsList.every((obj) =>
      Object.values(obj).every((x) => x !== "")
    );
    const sum = addPercent(inputsList);
    setSumpercent(sum);
    setDisabled(sum >= 100 || !isAllInpuFilled ? true : false);
  }, [percentValue]);

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
    setOptions(() => {
      const newArr = options
        .map((obj) => (obj.text === value ? { ...obj, disabled: true } : obj))
        .map((obj) =>
          obj.text === selected ? { ...obj, disabled: false } : obj
        );
      return newArr;
    });
  };
  const handlePercentChange = (num, name) => {
    const weightUpdate =
      num === "" ? "" : (totalWeight * (num / 100)).toFixed(2);
    const key = "weight";
    setPercentValue(num);
    setWeightValue(weightUpdate);
    updateInputsList(name, num, key, weightUpdate);
  };
  const handleWeightChange = (num, name) => {
    setWeightValue(num);
    const percentUpdate =
      num === "" ? "" : ((num / totalWeight) * 100).toFixed(2);
    const key = "percent";
    setPercentValue(percentUpdate);
    updateInputsList(name, num, key, percentUpdate);
  };

  const handleDelete = () => {
    const list = [...inputsList];
    const index = inputsList.findIndex((obj) => obj.id === id);
    list.splice(index, 1);
    setInputsList(list);
    const sum = addPercent(list);

    setSumpercent(sum);
    setDisabled(false);
  };

  return (
    <div
      className={`${styles.inputsContainer} ${
        index === 0 && styles.rowWithoutX
      }`}
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
          {options.map((opt, i) => (
            <option key={opt.text} value={opt.value} disabled={opt.disabled}>
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
          inputTag="%"
          {...{ setNaOhQuantity }}
        >
          {sumPercent >= 100 && <Tooltip {...{ sumPercent }} />}
        </InputContainer>

        <InputContainer
          name="weight"
          value={weightValue}
          handler={handleWeightChange}
          max={totalWeight}
          min={1}
          placeholder={totalWeight ? `max ${totalWeight - sumWeight}` : "---"}
          disabled={selected && totalWeight ? false : true}
          inputTag="g"
          {...{ setNaOhQuantity }}
        >
          {sumPercent >= 100 && <Tooltip {...{ sumPercent }} />}
        </InputContainer>

        <div className={styles.delete}>
          {index !== 0 && (
            <span onClick={handleDelete} className="material-symbols-outlined">
              close
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default DataInputs;
