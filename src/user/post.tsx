import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/user/user_post.module.css";
import { supabase } from "../createClient";
import GetCookieID from "../components/cookie/getCookieId";

export default function UserPost() {
  const [island, setIsland] = useState([]);
  const [events, setEvent] = useState([]);

  const userID = GetCookieID();

  //メッセージ受信
  const fetchMsg = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("status", "false")
      .eq("userID", userID);

    if (error) {
      console.error("post情報取得失敗");
    } else {
      const postID = data[0].id;
      const { data: msgs, error: msgError } = await supabase
        .from("messages")
        .select("*")
        .eq("postID", postID);

      if (msgError) {
        console.error("msg情報取得失敗");
      } else {
        if (msgs.length > 0) {
          // 受信しているメッセージがあるときのみ実行
          //msgsのオブジェクトデータごとにpostedByの検索をかける
          msgs.map(async (msg) => {
            const postID = msg.postedBy;
            const { data: by, error: byError } = await supabase
              .from("posts")
              .select("*, events(*), islands(*)")
              .eq("id", postID)
              .eq("status", false);
            // console.log(by);

            if (byError) {
              console.error("送信者取得失敗");
            } else {
              if (by.length > 0) {
                // 送信者がイベントのメッセージ一覧
                if (by[0].islands === null) {
                  const eventObject = {
                    ...msg,
                    by: by[0],
                  };
                  console.log(eventObject);
                  return eventObject;

                  // 送信者が島のメッセージ一覧
                } else if (by[0].events === null) {
                  const islandObject = {
                    ...msg,
                    by: by[0],
                  };
                  console.log(islandObject);
                  return islandObject;
                }
              }
            }
          });
        } else {
          console.log("受信メッセージはありません");
        }
      }
    }
  };

  useEffect(() => {
    fetchMsg();
  }, []);

  return (
    <>
      <div className={styles.userPostBack}>
        <h1>POST</h1>
        <div className={styles.postMessageBack}>
          <h2>受信メッセージ✉️</h2>

          {/* {islandsMs.map((island) => (
            <div className={styles.message}>
              <div className={styles.flex}>
                <img
                  className={styles.icon}
                  src={island.thumbnail || "/island/island_icon.png"}
                  alt="island Thumbnail"
                ></img>
                <div className={styles.right}>
                  <p className={styles.name}> {island.islandName}</p>
                  <p>テキストテキストテキストテキストテキストテキスト...</p>
                </div>
              </div>
              <Link to={`/user/message/island_message/${island.id}`}>
                <button>表示</button>
              </Link>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
}
