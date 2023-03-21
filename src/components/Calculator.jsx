import axios from "axios";
import { useEffect, useState } from "react";
import DataInputs from "./DataInputs";
import styles from "./Calculator.module.css";
import button from "./Button.module.css";
import SingleDataRow from "./SingleDataRow";

const Calculator = () => {
  const [data, setData] = useState([]);
  const [inputsList, setInputsList] = useState([
    { id: Math.random() * 100, oil: "", percent: "", weight: "" },
  ]);
  const [options, setOptions] = useState([
    {
      text: "Choose an oil",
      disabled: true,
      value: "",
    },
  ]);
  const [totalWeight, setTotalWeight] = useState("");
  const [liquidWeight, setLiquidWeight] = useState("");
  const [superFat, setSuperFat] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [naOhQuantity, setNaOhQuantity] = useState("");
  const [liquidQuantity, setLiquidQuantity] = useState(undefined);
  const [sumPercent, setSumpercent] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get("/.netlify/functions/api");
        setData(data.data);

        console.log(data)

        setOptions((prev) => {
          const array = data.data.map((obj) => {
            return {
              value: obj.oil,
              text: obj.oil,
              disabled: false,
            };
          });
          return [...prev, ...array];
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
console.log("totalWeight", totalWeight)
  const handleTotalWeight =(num, name)=>{
    setTotalWeight(num)
    setLiquidQuantity("")


  }
  const handleLiquidWeight =(num, name)=>{
    setLiquidQuantity("")
    setLiquidWeight(num)
  }
  const handleSuperFat =(num, name)=>{
    setSuperFat(num)
  }

  const handleCalculate = () => {
    const filledInputsList = inputsList.filter(obj=> !Object.values(obj).includes(""))
    console.log(filledInputsList)
        setInputsList(filledInputsList)
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
      <SingleDataRow
        name="totalWeight"
        text="Total weight of oils: "
        inputTag="g"
        min={0}
        max={10000}
        value={totalWeight}
        handler={handleTotalWeight}
        placeholder={"---"} 
        {...{setNaOhQuantity}}
  
      >
        {}
      </SingleDataRow>

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
              setOptions
            }}
          >
     
          </DataInputs>
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
        min={0}
        max={45}
        value={liquidWeight}
        handler={handleLiquidWeight}
        placeholder={"---"} 
        {...{setNaOhQuantity}}
      >
        {liquidQuantity && <span>{liquidQuantity}</span>}
      </SingleDataRow>

      <SingleDataRow
        name="superFat"
        text="SuperFat: "
        inputTag="%"
        min={0}
        max={25}
        value={superFat}
        handler={handleSuperFat}
        placeholder={"---"} 
        {...{setNaOhQuantity}}
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
          disabled={sumPercent === 100 && totalWeight!==""? false : true}
          onClick={(e) => handleCalculate(e)}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};
export default Calculator;
