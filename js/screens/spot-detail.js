/*
  spot-detail.js : S5 スポット詳細（今は「準備中」の仮画面）

  次のブランチ（feature/s4-s5-3-detail）で、本物の詳細画面に作り替えます。
  今は、画面の登録（js/app.js）と読み込み（index.html）がつながっているか確かめるための画面です。

  params.id   : 表示するスポットのID（例："spot-01"。data/spots.json の id）
  params.type : 診断結果のタイプ名（一覧に戻るときに使う）
*/

function renderSpotDetail(root, params) {
  root.appendChild(el("h1", "スポット詳細"));
  root.appendChild(el("p", "この画面は準備中です。", "note"));

  root.appendChild(el("button", "一覧へ戻る", "btn sub", function () {
    showScreen("spots", { type: params.type });
  }));
}
