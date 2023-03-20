import { useEffect, useState } from "react";
import styles from "./tooltip.module.css";
const Tooltip = ({ sumPercent }) => {
  const [isVisible, setIsvisible] = useState(true);
  const is100 = sumPercent === 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsvisible(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  console.log(sumPercent);

  return (
    <>
      {isVisible && (
        <div
          className={
            is100
              ? `${styles.green} ${styles.tooltip}`
              : `${styles.red} ${styles.tooltip}`
          }
        >
          {is100 ? "reached max" : "exceeded max"}
        </div>
      )}
    </>
  );
};

export default Tooltip;
