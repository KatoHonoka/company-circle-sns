import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [selectedRadio, setSelectedRadio] = useState("all");
  const [searchWord, setSearchWord] = useState("");

  const navigate = useNavigate();
  // ログアウト処理
  const logOutHandler = () => {
    if (document.cookie !== "") {
      let expirationDate = new Date("1999-12-31T23:59:59Z");
      document.cookie = `id=; expires=${expirationDate.toUTCString()}; path=/;`;
      alert("ログアウトしました");
    }
    navigate("/user/login");
    window.location.reload();
  };

  //検索
  const onRadioBtnChanged = (e) => setSelectedRadio(e.target.value);
  const onInputChanged = (e) => setSearchWord(e.target.value);

  return (
    <header>
      {/* 検索箇所 */}
      <div>
        <form action="">
          <input
            type="radio"
            name="select"
            id="all"
            value="all"
            checked
            onChange={onRadioBtnChanged}
          />
          <label htmlFor="all">すべて検索</label>
          <input
            type="radio"
            name="select"
            id="island"
            value="island"
            onChange={onRadioBtnChanged}
          />
          <label htmlFor="island">島のみ</label>
          <input
            type="radio"
            name="select"
            id="event"
            value="event"
            onChange={onRadioBtnChanged}
          />
          <label htmlFor="event">イベントのみ</label>
          <br />
          <input type="text" maxLength={22} onChange={onInputChanged} />

          <Link
            to={`/search?word=${encodeURIComponent(
              searchWord,
            )}&radio=${encodeURIComponent(selectedRadio)}`}
          >
            <button>検索 </button>
          </Link>
        </form>
      </div>
      {/* ヘッダーの右に位置してるアイテム */}
      <div className={styles.headerItem}>
        <div>
          <img src="" alt="ユーザーアイコン" />
          <span>ユーザー名</span>
        </div>
        <div className={styles.imgWrapper} onClick={logOutHandler}>
          <img
            src="/images/logout.png"
            alt="ログアウト"
            className={styles.logout}
          />
        </div>
        {/* ハンバーガーメニュー */}
        <div className={styles.hambuger}>
          <input className={styles.checkbox} type="checkbox" id="checkbox" />
          <label id="menu01" className={styles.menuTrigger} htmlFor="checkbox">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <nav className={styles.menu}>
            <ul className={styles.menuGroup}>
              <li className={styles.menuGroupItem}>
                <span className={styles.menuGroupItemLink}>参加サークル</span>
              </li>
              <li className={styles.menuGroupItem}>
                <span className={styles.menuGroupItemLink}>参加イベント</span>
              </li>
              <li className={styles.menuGroupItem}>
                <a className={styles.menuGroupItemLink} href="/island/create">
                  新規サークル作成
                </a>
              </li>
              <li className={styles.menuGroupItem}>
                <a className={styles.menuGroupItemLink} href="/user/index">
                  アカウント情報
                </a>
              </li>
              <li className={styles.menuGroupItem}>
                <a className={styles.menuGroupItemLink} href="/user/post">
                  あなたのポスト
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
