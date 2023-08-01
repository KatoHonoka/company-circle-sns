import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import FetchJoindIslandEvent from "./hooks/FetchJoindIslandEvent";
import GetCookieID from "./cookie/getCookieId";
import { supabase } from "../createClient";

const Header = () => {
  const [selectedRadio, setSelectedRadio] = useState("all");
  const [searchWord, setSearchWord] = useState("");
  const [userData, setUserData] = useState<{ [x: string]: any }[]>([]);

  const [isOpenIslandList, setIsOpenIslandList] = useState(false);
  const [isOpenEventList, setIsOpenEventList] = useState(false);
  const navigate = useNavigate();
  const userID = GetCookieID();
  const [isMenuOpen] = useState(false);

  // ユーザーアイコンとユーザー名の取得
  // 非同期の処理をuseEffect内で行う場合、コールバック関数を定義してその中で非同期処理を行う
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("id", userID)
        .eq("status", false);

      setUserData(user);
    } catch (error) {
      console.error("データ取得失敗", error.message);
    }
  };

  useEffect(() => {
    // メニューが開かれたときにスクロールバーを非表示にする
    if (!isMenuOpen) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "auto";
    }
  }, [isMenuOpen]);

  // 参加してる島、イベントのメッセージの取得
  const result = FetchJoindIslandEvent();

  // ログアウト処理
  const logOutHandler = () => {
    if (document.cookie !== "") {
      let expirationDate = new Date("1999-12-31T23:59:59Z");
      document.cookie = `id=; expires=${expirationDate.toUTCString()}; path=/;`;
      document.cookie = `loginSt=; expires=${expirationDate.toUTCString()}; path=/;`;
      alert("ログアウトしました");
    }
    navigate("/user/login");
    window.location.reload();
  };

  //検索条件をセット
  const onRadioBtnChanged = (e) => setSelectedRadio(e.target.value);
  const onInputChanged = (e) => setSearchWord(e.target.value);

  return (
    <header>
      {/* ロゴ */}
      <Link to={"/"}>
        <img src="/images/logo.png" className={styles.logo} alt="logo" />
      </Link>
      {/* 検索箇所 */}
      <div className={styles.search}>
        <label>
          <input
            type="radio"
            name="select"
            id="all"
            value="all"
            onChange={onRadioBtnChanged}
            className={styles.searchInput}
          />
          <span className={styles.radioName}>
            <span className={styles.radioText}>すべて検索</span>
          </span>
        </label>
        &nbsp; &nbsp;
        <label>
          <input
            type="radio"
            name="select"
            id="island"
            value="island"
            onChange={onRadioBtnChanged}
            className={styles.searchInput}
          />
          <span className={styles.radioName}>
            <span className={styles.radioText}>島のみ</span>
          </span>
        </label>
        &nbsp; &nbsp;
        <label>
          <input
            type="radio"
            name="select"
            id="event"
            value="event"
            onChange={onRadioBtnChanged}
            className={styles.searchInput}
          />
          <span className={styles.radioName}>
            <span className={styles.radioText}>イベントのみ</span>
          </span>
        </label>
        <br />
        <input
          type="text"
          maxLength={22}
          onChange={onInputChanged}
          className={styles.input}
          placeholder="入力してください"
        />
        <Link
          to={`/search?word=${encodeURIComponent(
            searchWord,
          )}&radio=${encodeURIComponent(selectedRadio)}`}
        >
          <button className={styles.btn} name="検索">
            検索
          </button>
        </Link>
      </div>

      {/* ヘッダーの右に位置してるアイテム */}
      <div className={styles.headerItem}>
        <div className={styles.userDataFlex}>
          <img
            src={
              userData && userData.length > 0
                ? userData[0].icon || "/user/tanukiti.png"
                : "/user/tanukiti.png"
            }
            alt="ユーザーアイコン"
            className={styles.icon}
          />
          <p className={styles.userName}>
            <span>
              {userData && userData.length > 0 ? userData[0].familyName : ""}
              さん
            </span>
          </p>
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
              <li className={`${styles.menuGroupItem}`}>
                <div
                  className={styles.menuGroupItemLinkWrapper}
                  onClick={() => setIsOpenIslandList(!isOpenIslandList)}
                >
                  <span className={styles.menuGroupItemLink}>参加島</span>
                  <hr className={styles.hr} />
                </div>
                <ul
                  className={
                    isOpenIslandList ? `${styles.open}` : `${styles.close}`
                  }
                >
                  {result &&
                    result.islands.map((island, index) => (
                      <div
                        key={index}
                        className={styles.listItem}
                        onClick={() => {
                          navigate(`/island/${island.id}`);
                          window.location.reload();
                        }}
                      >
                        <li key={island.id}>
                          {island.islandName}
                          {island && island.msgLength > 0 && (
                            <span className={styles.msgIcon}>
                              {island && island.msgLength}
                            </span>
                          )}
                        </li>
                      </div>
                    ))}
                </ul>
              </li>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="checkbox"
              />
              <li className={styles.menuGroupItem}>
                <div
                  className={styles.menuGroupItemLinkWrapper}
                  onClick={() => setIsOpenEventList(!isOpenEventList)}
                >
                  <span className={styles.menuGroupItemLink}>参加イベント</span>
                  <hr className={styles.hr} />
                </div>
                <ul
                  className={
                    isOpenEventList ? `${styles.open}` : `${styles.close}`
                  }
                >
                  {result &&
                    result.events.map((event, index) => (
                      <div
                        key={index}
                        className={styles.listItem}
                        onClick={() => {
                          navigate(`/event/${event.id}`);
                          window.location.reload();
                        }}
                      >
                        <li key={event.id}>
                          {event.eventName}
                          {event && event.msgLength > 0 && (
                            <span className={styles.msgIcon}>
                              {event && event.msgLength}
                            </span>
                          )}
                        </li>
                      </div>
                    ))}
                </ul>
              </li>
              <li className={styles.menuGroupItem}>
                <a className={styles.menuGroupItemLink} href="/island/create">
                  新規サークル作成
                </a>
              </li>
              <hr className={styles.hr} />

              <li className={styles.menuGroupItem}>
                <a className={styles.menuGroupItemLink} href="/user">
                  アカウント情報
                </a>
              </li>
              <hr className={styles.hr} />

              <li className={styles.menuGroupItem}>
                <a className={styles.menuGroupItemLink} href={`/user/post`}>
                  あなたのポスト
                </a>
              </li>
              <hr className={styles.hr} />

              <li className={styles.menuGroupItem}>
                <a
                  className={styles.menuGroupItemLink}
                  href="/island/islandAll"
                >
                  島一覧
                </a>
              </li>
              <hr className={styles.hr} />

              <li className={styles.menuGroupItem}>
                <a className={styles.menuGroupItemLink} href="/event/eventAll">
                  イベント一覧
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
