import React, { useEffect } from "react";
import styles from "../styles/menubar.module.css";
import { Link, useParams } from "react-router-dom";

export default function MenubarIsland({
  thumbnail,
}: {
  thumbnail: string | null;
}) {
  const params = useParams();
  const paramsID = parseInt(params.id);

  useEffect(() => {
    let imageUrl = thumbnail;
    let circleElement = document.getElementById("img");

    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }, []);

  // ユーザーがサークルに参加してるとき
  // if(){
  return (
    <>
      <div className={styles.menubar}>
        <div className={styles.icon} id="img"></div>
        <h4>島名</h4>

        <div className={styles.menuContents}>
          <div>
            <Link to={`/island/thread`}>掲示板</Link>
          </div>
          <div>
            <Link to={`/event/${params}`}>イベント</Link>
          </div>
          <div>
            <Link to={`/island/post`}>ポスト</Link>
          </div>
          <div>
            <Link to={`/island/menbers/${paramsID}`}>島民一覧</Link>
          </div>
          <div>
            <Link to={`/island/${paramsID}`}>島詳細</Link>
          </div>
        </div>
      </div>
    </>
  );
}
// ユーザーがサークルに参加してないとき
// else if(){
// return(
// <>
// <div className={styles.menubar}>
// <div className={styles.icon} id='img'></div>
// <h4>島名</h4>
//      <div>
//      <Link to={`/event/[id]`}>イベント</Link>
//      </div>
//      <div>
//      <Link to={`/island/menbers`}>島民一覧</Link>
//      </div>
//      <div>
//      <Link to={`/island/[id]`}>島詳細</Link>
//      </div>
// </div>
// </>
// )
// }
// }
