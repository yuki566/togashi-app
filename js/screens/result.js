/*
  result.js : S3 診断結果画面

  表示するもの
    - タイプ名、キャッチコピー、説明文
    - おすすめスポット3か所
    - 「ゆかりの地を見る」 → S4 スポット一覧へ
    - 「もう一度診断する」 → S2 診断へ

  params.type : 結果のタイプ名（例："統治"）
*/

function renderResult(root, params) {
  const info = loadedData.types[params.type];

  // 知らないタイプ名が来たらホームに戻す（保存データが壊れていた場合など）
  if (!info) {
    showScreen("home");
    return;
  }

  // 仮データの間だけ出す帯。本物の文章に替えたら data/types.json の draft を false にする
  if (info.draft) {
    root.appendChild(el("div", "※ この文章は仮のものです（チームで作成中）", "draft-banner"));
  }

  root.appendChild(el("p", "あなたのタイプは…"));

  const card = el("div", null, "card");
  card.appendChild(el("span", params.type + "タイプ", "type-badge type-" + params.type));
  card.appendChild(el("h1", info.title));
  card.appendChild(el("p", info.catchcopy, "catch"));
  card.appendChild(el("p", info.description));
  root.appendChild(card);

  root.appendChild(el("h2", "おすすめのスポット"));
  const list = el("ul", null, "spot-list");
  info.spots.forEach(function (name) {
    list.appendChild(el("li", name));
  });
  root.appendChild(list);

  root.appendChild(el("button", "ゆかりの地を見る", "btn", function () {
    showScreen("spots", { type: params.type });
  }));
  root.appendChild(el("button", "もう一度診断する", "btn sub", function () {
    showScreen("quiz");
  }));
}
