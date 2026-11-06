/*
  storage.js : スマホ（ブラウザ）の中への保存担当

  診断結果を、このスマホの中だけに保存します（サーバーには送りません）。
  あとでスタンプ機能を足すときも、ここに保存の関数を足していきます。

  保存に失敗しても（プライベートモードなど）、アプリは止まらないようにしてあります。
*/

const STORAGE_KEY_RESULT = "togashi-app:result";

// 診断結果（タイプ名）を保存する
function saveResult(typeName) {
  try {
    localStorage.setItem(STORAGE_KEY_RESULT, typeName);
  } catch (e) {
    // 保存できなくても続行する
  }
}

// 保存してある診断結果を取り出す（なければ null）
function loadResult() {
  try {
    return localStorage.getItem(STORAGE_KEY_RESULT);
  } catch (e) {
    return null;
  }
}
const STORAGE_KEY_STAMPS =
  "togashi-app:stamps";

function loadStamps() {

  try {

    const data =
      localStorage.getItem(
        STORAGE_KEY_STAMPS
      );

    return data
      ? JSON.parse(data)
      : [];

  } catch (e) {

    return [];

  }

}

function saveStamp(spotId) {

  try {

    const stamps =
      loadStamps();

    if (!stamps.includes(spotId)) {

      stamps.push(spotId);

      localStorage.setItem(
        STORAGE_KEY_STAMPS,
        JSON.stringify(stamps)
      );

    }

  } catch (e) {}

}