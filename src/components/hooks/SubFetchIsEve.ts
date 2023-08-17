import { supabase } from "../../createClient";
import { Island, Event } from "../../types/members";

export default function SubFetchIsEve({
  userID,
  setCombi,
}: {
  userID: number;
  setCombi: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const fetch = async () => {
    // 参加している島と、難民として参加しているイベントを取得
    let { data, error } = await supabase
      .from("userEntryStatus")
      .select("islands(*), events(*)")
      .eq("userID", userID)
      .eq("status", false);
    if (error) {
      console.log(error, "firstFetchError");
    }
    if (!data) {
      return;
    } else {
      const tmpUnknown = data as unknown;
      const tmpIs = tmpUnknown as {
        islands: Island;
        events: Event;
      }[];
      //島が参加しているイベント取得
      const joinIsArray = tmpIs
        .flatMap((data) => data.islands)
        .filter((island) => island !== null || undefined)
        .map((island) => island.id);

      let { data: eveData, error: eveError } = await supabase
        .from("userEntryStatus")
        .select("events(*)")
        .in("islandID", joinIsArray)
        .eq("status", false);

      if (eveError) {
        console.log(eveError, "eveError");
      } else if (eveData.length > 0) {
        eveData as { events: Event[] }[];
        //取得した２つのデータを１つの配列にする
        const tmpEve = eveData
          .flatMap((data) => data.events)
          .filter((event) => event !== null && event !== undefined)
          .reduce((accumulator, currentEvent) => {
            const isDuplicate = accumulator.some(
              (existingEvent) => existingEvent.events.id === currentEvent.id,
            );
            if (!isDuplicate) {
              accumulator.push({
                events: currentEvent,
                islands: null,
              });
            }
            return accumulator;
          }, []);

        tmpEve.map((data) => tmpIs.push(data));

        setCombi(tmpIs);
      } else {
        return;
      }
    }
  };
  fetch();
}
