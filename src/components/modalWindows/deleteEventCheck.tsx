import styles from "../../styles/createDeletingCheck.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";
import { useState } from "react";
import HandleInputChange from "./handleInputChange";
import NextEventHandler from "./nextEventHandler";

export default function CreateDeleteCheck({
  close2Modal,
  nextOpen2,
  inputValue,
  setInputValue,
}: {
  close2Modal: () => void;
  nextOpen2: () => void;
  inputValue: string
  // React.Dispatch<>は、<>の値を引数として受け取る
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  
  const [emptyChara, setEmptyChara] = useState("");
  const [notExist, setNotExist] = useState("");

  // パスの最後のIDを取得する
  const { id } = useParams();

  // イベント名が間違っている場合
  const nextHandler = NextEventHandler(inputValue, id, nextOpen2, setNotExist);

  // イベント名が空白文字の場合
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    HandleInputChange(event, setEmptyChara, setNotExist, setInputValue);
  };

return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <img
              src="/modalWindow/close.png"
              alt="×ボタン"
              onClick={close2Modal}
              className={styles.close}
            />
            <div className={styles.main}>
              <div className={styles.title}>
                <h3 className={styles.h3}>本当にイベントを削除してもよろしいですか？</h3>
              </div>
              <div>
                <p>削除するために下記のテキストボックスに<br /> イベント名を入力してください</p>
                <p>※スペースを入れずに入力してください</p>
              </div>
              <input 
                type="text" 
                id={styles.deleteCheck} 
                value={inputValue}
                onChange={handleInputChange}
              />

              {emptyChara && (
                <div>
                  <span>{emptyChara}</span>
                </div>
              )}
              {notExist && (
                <div>
                  <span>{notExist}</span>
                </div>
              )}
            </div>
            <div>
              <button onClick={nextHandler} id={styles.delete_btn} disabled={!inputValue.trim()}>削除する</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
