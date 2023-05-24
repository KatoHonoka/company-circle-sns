import React from "react";
import styles from "../../styles/createSendingMessage.module.css";

export default function CreateSendingMessage({
    closeModal,
}: {
    closeModal: () => void;
}) {
    const addHandler = () => {};
    return(
        <>
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
                            <h3 className={styles.h3}>○○島</h3>
                            <p className={styles.messageName}>メッセージ</p>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="threadName">コメント</label><br />
                            <textarea name="text" className={styles.textSending}></textarea>
                        </div>
                        </div>
                        <div className={styles.btn}>
                        <button onClick={addHandler}>送信する</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
