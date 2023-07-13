// カーソル外したときに未入力だったらエラー表示
// eventでも使用

import React, { useEffect } from "react";

export default function HandleDetailBlur({ detail, setError, type }) {
  useEffect(() => {
    async function handleNameBlur() {
      if (type === "island") {
        if (detail.trim() === "") {
          setError("※活動内容は入力必須項目です");
        } else {
          setError("");
        }
      } else if (type === "event") {
        if (detail.trim() === "") {
          setError("※詳細内容は入力必須項目です");
        } else {
          setError("");
        }
      }
    }

    handleNameBlur();
  }, [detail, setError]);

  return null;
}
