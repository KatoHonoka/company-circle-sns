import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../styles/island/createIsland.module.css";
import FetchIsland from "./fetchIsland";
import { handleSelectChange } from "./handleSelectChange";
import { addNameHandler } from "./addNameHandler";
import { deleteNameHandler } from "./deleteNameHandler";

export default function SelectIsland({
  islandID,
  setIslandTags,
}: {
  islandID: string;
  setIslandTags: Dispatch<SetStateAction<{ id: number; islandName: string }[]>>;
}) {
  const [islands, setIslands] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [tempSelectedValues, setTempSelectedValues] = useState([]); // 一時的な選択値を格納する配列
  const [selectError, setSelectError] = useState("");

  Number(islandID);

  // selectタグの選択項目を取得
  const fetchIslandData = async () => {
    await FetchIsland(setIslands, islandID);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchIslandData();
  }, []);

  // 選択項目
  const handleSelectChangeData = (e) => {
    handleSelectChange(e, setTempSelectedValues); // handleSelectChange関数を呼び出す
  } ;

// 追加ボタン押されたらタグを追加
const addNameHandlerData = () => {
  addNameHandler(
    tempSelectedValues,
    selectedValues,
    islands,
    setIslandTags,
    setSelectedValues,
    setSelectError
  ); // addNameHandler関数を呼び出す
};

  // タグの削除
  const deleteNameHandlerData = (index) => {
    deleteNameHandler(
      index,
      selectedValues,
      setSelectedValues,
      islands,
      setIslandTags
    ); // deleteNameHandler関数を呼び出す
  };

  return (
    <>
      <div>共同開催する島がある場合は、ここから選択してください</div>
      <select
        name="islands"
        size={4}
        onChange={handleSelectChangeData} // 選択が変更されたときの処理を追加
        className={styles.selectIsland}
      >
        <optgroup label="島名" className={styles.islansTitle}>
          {islands.map((island) => (
            <option
              key={island.islandName}
              value={island.islandName}
              className={styles.option}
            >
              {island.islandName}
            </option>
          ))}
        </optgroup>
      </select>
      <button onClick={addNameHandlerData} className={styles.add}>
        追加
      </button>
      {selectError && (
        <div>
          <span className={styles.span}>{selectError}</span>
        </div>
      )}
      {selectedValues
        .reduce((rows, value, index) => {
          if (index % 3 === 0) {
            rows.push([]);
          }
          rows[rows.length - 1].push(
            <div key={index} className={styles.selectedValue}>
              <div className={styles.nameFlex}>
                <span className={styles.nowrap}>{value}</span>
                &nbsp;&nbsp;
                <button
                  onClick={() => deleteNameHandlerData(index)}
                  className={styles.delBtn}
                >
                  ×
                </button>
              </div>
            </div>,
          );
          return rows;
        }, [])
        .map((row, index) => (
          <div key={index} className={styles.row}>
            {row}
          </div>
        ))}
    </>
  );
}
