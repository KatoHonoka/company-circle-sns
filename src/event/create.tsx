import React, { useEffect, useState } from "react";
import LogSt from "../components/cookie/logSt";
import styles from "../styles/event/create.module.css";
import EventName from "../components/createEvent/eventName";
import { useNavigate, useParams } from "react-router-dom";
import EventDetail from "../components/createEvent/detail";
import Daytime from "../components/createEvent/daytime";
import { supabase } from "../createClient";

export default function EventCreate() {
  LogSt();

  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [eventName, setEventName] = useState("");
  const [detail, setDetail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const params = useParams();
  const paramsID = parseInt(params.id);
  const islandID = params.id;

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length == 0) {
      // 画像が選択されていないのでreturn
      return;
    }

    const file = event.target.files?.[0];
    const random = Math.floor(Math.random() * 10000);
    const filePath = `${file.name}${random}`; // 画像の保存先のpathを指定
    const { error } = await supabase.storage
      .from("eventIcon")
      .upload(filePath, file);
    if (error) {
      console.log(error, "画像追加エラー", filePath);
    }

    const { data } = supabase.storage.from("eventIcon").getPublicUrl(filePath);
    setImageUrl(data.publicUrl);
  };

  // イベント作成する
  const createHandler = async () => {
    const eventData = {
      eventName: eventName,
      detail: detail,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      status: "false",
      createdBy: "システム",
      thumbnail: imageUrl,
    };

    try {
      await supabase.from("events").insert(eventData);

      // 作成されたイベントのIDを取得
      const { data } = await supabase
        .from("events")
        .select("id")
        .eq("eventName", eventName);
      const createdEventId = data[0].id;

      // userEntryStatusテーブルに挿入
      try {
        const enStatusData = {
          islandID: islandID,
          eventID: createdEventId,
          status: "false",
        };
        await supabase.from("userEntryStatus").insert(enStatusData);

        // postテーブルに島用ポスト作成
        try {
          const post = {
            eventID: createdEventId,
            status: "false",
          };
          await supabase.from("posts").insert(post);
        } catch (error) {
          console.log("イベントポスト作成エラー");
        }
      } catch (error) {
        console.log("userEntryStatus挿入エラー");
      }

      navigate(`/event/${createdEventId}`);
      window.location.reload();
    } catch (error) {
      console.log("イベント作成エラー");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.box}>
        <div className={styles.allContents}>
          <h1>新規イベント作成</h1>
          <div className={styles.tableCovered}>
            <table>
              <tbody>
                <tr>
                  <th>
                    イベント名<span className={styles.span}>【必須】</span>
                  </th>
                  <td>
                    <EventName
                      eventName={eventName}
                      setEventName={setEventName}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    詳細<span className={styles.span}>【必須】</span>
                  </th>
                  <td>
                    <EventDetail detail={detail} setDetail={setDetail} />
                  </td>
                </tr>
                <tr>
                  <th>
                    開催期間<span className={styles.span}>【必須】</span>
                  </th>
                  <td>
                    <Daytime
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                    />
                  </td>
                </tr>
                <tr>
                  <th>サムネイル</th>
                  <td className={styles.imgSide}>
                    <img
                      className={styles.icon}
                      src={imageUrl || "/event_icon.png"}
                      alt="Event Thumbnail"
                    />
                    <div className={styles.faileCenter}>
                      <input
                        type="file"
                        id="thumbnail"
                        className={styles.inputA}
                        onChange={handleFileChange}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            onClick={createHandler}
            disabled={
              !eventName.trim() ||
              !detail.trim() ||
              !startDate.trim() ||
              !endDate.trim()
            }
          >
            新しいイベントを開催する
          </button>
        </div>
      </div>
    </div>
  );
}
