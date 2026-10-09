/*
  spots.js : S4 スポット一覧（今は「準備中」の仮画面）

  第5週に、ここを本物のスポット一覧に作り替えます。
  それまでは、結果画面の「ゆかりの地を見る」ボタンがつながっているか確かめるための画面です。
*/

function renderSpots(root, params) {
  root.appendChild(el("h1", "スポット一覧"));
  root.appendChild(el("p", "この画面は準備中です。", "note"));

  root.appendChild(el("button", "結果に戻る", "btn sub", function () {
    showScreen("result", { type: params.type });
  }));
  root.appendChild(el("button", "ホームに戻る", "btn sub", function () {
    showScreen("home");
  }));
}
