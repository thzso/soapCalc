import styles from "./Info.module.css";

const SapList = ({ data, setIsInfoClicked }) => {
  return (
    <ul id={styles.sapInfo}>
      <em>SAP values:</em>

      <span
        id={styles.closeSapInfo}
        onClick={() => {
          setIsInfoClicked((prev) => !prev);
        }}
      >
        X
      </span>
      {data.map((data) => (
        <li key={data.oil}>
          {data.oil}: {data.sap}
        </li>
      ))}
    </ul>
  );
};

export default SapList;
