
import Calculator from "./components/Calculator";
import Info from "./components/Info";
import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([
    {
      text: "Choose an oil",
      disabled: true,
      value: "",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get("/.netlify/functions/api");
        setData(data.data);
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

  return (
    <div className="App">
      <header>Soap Recipe Calculator</header>
      <Info {...{ data }} />
      <Calculator {...{ data, options, setOptions }} />
    </div>
  );
}

export default App;
