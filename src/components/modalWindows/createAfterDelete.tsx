import React, { useState } from "react";
import styles from "../../styles/createAfterDelete.module.css";

export default function CreateAfterDelete({
  closeAfterDModal,
}: {
  closeAfterDModal: () => void;
}) {

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <img
              src="/modalWindow/close.png"
              alt="×ボタン"
              onClick={closeAfterDModal}
              className={styles.close}
            />
            <div className={styles.main}>
                <h3 className={styles.h3}>島は沈没しました</h3>
                <div className={styles.delete_btn}>
                  <button className={styles.dCheck_btn}>OK</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}