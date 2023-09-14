import { useEffect, useState } from "react";
import styles from "../../styles/createSendingMessage.module.css";
import { supabase } from "../../createClient";
import { useParams } from "react-router-dom";
import GetCookieID from "../cookie/getCookieId";
import FetchIslandName from "./fetchIslandName";
import SendMessage from "./sendMessage";
import FetchPostIslands from "./fetchPostIslands";

export default function CreateSendingMessage({
  closeModal,
  table,
}: {
  closeModal: () => void;
  table: string;
}) {
  const [message, setMessage] = useState("");
  const [postID, setPostID] = useState();
  const [postedID, setPostedID] = useState();
  const [islandName, setIslandName] = useState("");
  const params = useParams();
  const paramsID = parseInt(params.id);
  const userID = GetCookieID();

  useEffect(() => {
    fetchPostData();
    fetchIslandNameData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // posts, postedByに入れるため、送信する側のpostIDを取得する
  const fetchPostData = async () => {
    await FetchPostIslands(table, paramsID, setPostID, userID, setPostedID);
  };

  // 島名を取得してモーダルウィンドウに表示
  const fetchIslandNameData = async () => {
    await FetchIslandName(supabase, paramsID, setIslandName);
  };

  // messagesテーブルにメッセージを保存
  const sendMessageData = async () => {
    await SendMessage(postID, message, postedID, closeModal);
    console.log(postID, message, postedID, closeModal);
  };

  // メッセージを送信するための処理を実行
  const addHandler = () => {
    sendMessageData();
  };

  return (
    <>
      {islandName && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.allContents}>
              <img
                src="/modalWindow/close.png"
                alt="×ボタン"
                onClick={closeModal}
                className={styles.close}
              />
              <div className={styles.main}>
                <div className={styles.title}>
                  <h3 className={styles.h3}>{islandName}</h3>
                  <p className={styles.messageName}>メッセージを送る</p>
                </div>
                <div className={styles.input}>
                  <label htmlFor="threadName">コメント</label>
                  <br />
                  <textarea
                    name="text"
                    className={styles.textSending}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div>
                <button
                  onClick={addHandler}
                  className={styles.btn}
                  disabled={!message}
                >
                  送信する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
