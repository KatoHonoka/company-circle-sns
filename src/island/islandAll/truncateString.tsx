// 「活動用内容」100文字以降は...で表示する

export default function TruncateString({ str, maxLength }) {
  if (str.length > maxLength) {
    return <>{str.slice(0, maxLength)}...</>;
  } else {
    return <>{str}</>;
  }
}
