import React from "react";
import { thread } from "../types/thread";
import { useNavigate } from "react-router-dom";
import styles from "../styles/thread.module.css";

function Thread({ thread }: { thread: thread[] }) {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      {thread.map((thread) => (
        <div
          key={thread.id}
          onClick={() => {
            navigate(`/chat/${thread.id}`);
          }}
          className={styles.thread}
        >
          <p className={styles.title}>{thread.threadTitle}</p>
        </div>
      ))}
    </div>
  );
}

export default Thread;