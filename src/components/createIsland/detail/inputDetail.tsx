import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/island/createIsland.module.css";
import HandleDetailChange from "./handleIslandDetailChange";
import HandleNameBlur from "./handleBlur";

export default function InputDetail({
  detail,
  setDetail,
}: {
  detail: string;
  setDetail: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState("");

  return (
    <>
      <textarea
        className={`${styles.detail} ${error ? styles.errorInput : ""} `}
        maxLength={250}
        value={detail}
        onChange={HandleDetailChange({
          error,
          setDetail,
          setError,
        })}
      />
      {error && (
        <div>
          <span className={styles.span}>{error}</span>
        </div>
      )}
      <HandleNameBlur detail={detail} setError={setError} />
    </>
  );
}
