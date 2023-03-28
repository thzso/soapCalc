import { useState } from "react";
import DataInputs from "./DataInputs";
import styles from "./Calculator.module.css";
import button from "./Button.module.css";
import SingleDataRow from "./SingleDataRow";

const Calculator = ({ data, options, setOptions }) => {
  const [inputsList, setInputsList] = useState([
    { id: Math.random() * 100, oil: "", percent: "", weight: "" },
  ]);
  console.log(options);
  const [totalWeight, setTotalWeight] = useState("");
  const [liquidWeight, setLiquidWeight] = useState("");
  const [superFat, setSuperFat] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [naOhQuantity, setNaOhQuantity] = useState("");
  const [liquidQuantity, setLiquidQuantity] = useState(undefined);
  const [sumPercent, setSumpercent] = useState(0);

  const handleTotalWeight = (num, name) => {
    setTotalWeight(num);
    setLiquidQuantity("");
  };
  const handleLiquidWeight = (num, name) => {
    setLiquidQuantity("");
    setLiquidWeight(num);
  };
  const handleSuperFat = (num, name) => {
    setSuperFat(num);
  };

  const handleCalculate = () => {
    const filledInputsList = inputsList.filter(
      (obj) => !Object.values(obj).includes("")
    );

    setInputsList(filledInputsList);
    const sumOfproducts = filledInputsList
      .map(
        (listItem) =>
          listItem.weight * data.find((data) => data.oil === listItem.oil).sap
      )
      .reduce((acc, curr) => acc + curr)
      .toFixed(2);
    const naOh = sumOfproducts * (1 - superFat / 100);
    setNaOhQuantity(naOh);
    const water =
      liquidWeight !== "" ? `${(liquidWeight / 100) * totalWeight} g` : "?";
    setLiquidQuantity(water);
  };

  const handlePlus = () => {
    setInputsList([
      ...inputsList,
      { id: Math.random() * 100, oil: "", percent: "", weight: "" },
    ]);
  };

  return (
    <div className={styles.calculatorContanier}>
      <div id={styles.totalWeight}>
        <SingleDataRow
          name="totalWeight"
          text="Total weight of oils: "
          inputTag="g"
          min={0}
          max={10000}
          value={totalWeight}
          handler={handleTotalWeight}
          placeholder={"---"}
          {...{ setNaOhQuantity }}
        ></SingleDataRow>
      </div>
      {}

      <div className={styles.listContainer}>
        {inputsList.map((oilsData, index) => (
          <DataInputs
            key={oilsData.id}
            id={oilsData.id}
            {...{
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
              setOptions,
            }}
          ></DataInputs>
        ))}
      </div>

      <button
        className={button.button}
        onClick={handlePlus}
        disabled={disabled}
      >
        add
      </button>

      <SingleDataRow
        name="liqiudWeight"
        text="Liquid: "
        inputTag="%"
        min={1}
        max={45}
        value={liquidWeight}
        handler={handleLiquidWeight}
        placeholder={"30-45%"}
        {...{ setNaOhQuantity }}
      >
        {liquidQuantity && <span>{liquidQuantity}</span>}
      </SingleDataRow>

      <SingleDataRow
        name="superFat"
        text="SuperFat: "
        inputTag="%"
        min={1}
        max={25}
        value={superFat}
        handler={handleSuperFat}
        placeholder={"max 25%"}
        {...{ setNaOhQuantity }}
      >
        {naOhQuantity && (
          <span> NaOh : {Number(naOhQuantity).toFixed(2)} g</span>
        )}
      </SingleDataRow>

      <div className={styles.submitBtns}>
        <button
          className={`${button.button} ${button.reset}`}
          onClick={() => {
            setInputsList([
              { id: Math.random() * 100, oil: "", percent: "", weight: "" },
            ]);
            setLiquidQuantity("");
            setLiquidWeight("");
            setNaOhQuantity("");
            setSuperFat("");
            setTotalWeight("");
          }}
        >
          Reset
        </button>

        <button
          className={button.button}
          disabled={sumPercent === 100 && totalWeight !== "" ? false : true}
          onClick={(e) => handleCalculate(e)}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};
export default Calculator;
