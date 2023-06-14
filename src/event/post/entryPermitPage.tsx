import MenubarEvent from "../../components/menubarEvent";
import EntryPermit from "../../components/entryPermit";
import styles from "../../styles/entryPermit.module.css";
import LogSt from "../../components/cookie/logSt";

export default function EventEntryPermitPage() {
  LogSt();
  return (
    <div className={styles.display}>
      <MenubarEvent />
      <EntryPermit table={"event"} />
    </div>
  );
}
