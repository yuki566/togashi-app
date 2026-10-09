/*
  data.js : JSONデータの読み込み担当

  data/ フォルダの3つのファイルを読み込んで、プログラムから使えるようにします。
    - questions.json : 診断の質問（6問）
    - types.json     : 4タイプの説明とおすすめスポット
    - spots.json     : スポット8か所の情報

  使い方： const data = await loadData();  → data.questions / data.types / data.spots
*/

// 読み込んだデータを一度だけ保存しておく場所（2回目以降は読み直さない）
let loadedData = null;

// 1つのJSONファイルを読み込む（失敗したらエラーを投げる）
async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(path + " を読み込めませんでした（" + response.status + "）");
  }
  return response.json();
}

// 3つのデータをまとめて読み込む
async function loadData() {
  if (loadedData) return loadedData;

  const [questions, types, spots] = await Promise.all([
    loadJson("data/questions.json"),
    loadJson("data/types.json"),
    loadJson("data/spots.json"),
  ]);

  loadedData = { questions: questions, types: types, spots: spots };
  return loadedData;
}
