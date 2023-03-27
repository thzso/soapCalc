import { useState } from "react";
import styles from "./Info.module.css";
import SapList from "./SapList";

const Info = ({ data }) => {
  const [isInfoClicked, setIsInfoClicked] = useState(false);
  return (
    <div className={styles.info}>
      <div>(oil amount) x (SAP value) = lye</div>
      <div id={styles.information}>
        SAP: ratio of caustic soda to saponify 1 gram of oil
        <span
          id={styles.icon}
          className="material-symbols-outlined"
          onClick={() => setIsInfoClicked(true)}
        >
          info
        </span>
        {isInfoClicked && <SapList {...{ data, setIsInfoClicked }} />}
      </div>
      <div>Liquid: value between 30-45%</div>
      <div>
        Superfat - lye discount, recommended at least 1-3% ensuring there's no
        leftover lye.
      </div>
    </div>
  );
};

export default Info;
