/*
  spots.js : S4 スポット一覧

  表示するもの
    - 8か所のスポットを「木札」の形で並べる
    - 診断結果のタイプに合うスポット（おすすめ3か所）を先頭にして、「朱印」の印を付ける
    - 木札を押すと、S5 スポット詳細へ
    - 「結果に戻る」「ホームに戻る」

  params.type : 診断結果のタイプ名（例："統治"）。ない場合は、並べ替えずに表示する

  データ
    - data/spots.json … スポットの情報（名前、タイプなど）
    - data/types.json … タイプごとのおすすめスポット（spots にスポット名が3つ入っている）
*/

// スポットを「おすすめが先頭」の順に並べ替える
//   戻り値：[{ spot: スポットの情報, recommended: おすすめなら true }, ...]
//   おすすめは types.json に書かれた順番。残りは spots.json の順番のまま
function orderSpots(spots, typeName) {
  const typeInfo = loadedData.types[typeName];
  const recommendedNames = typeInfo ? typeInfo.spots : [];

  const recommended = [];
  recommendedNames.forEach(function (name) {
    const spot = spots.find(function (s) { return s.name === name; });
    if (spot) recommended.push({ spot: spot, recommended: true });
  });

  const others = spots
    .filter(function (s) { return recommendedNames.indexOf(s.name) === -1; })
    .map(function (s) { return { spot: s, recommended: false }; });

  return recommended.concat(others);
}

// 木札（スポット1か所ぶんのボタン）を作る
function makeSpotFuda(item, typeName) {
  const spot = item.spot;

  // 木札の左端の色は、そのスポットの最初のタイプの色（CSS の .edge-統治 など）
  const fuda = el("button", null, "fuda edge-" + spot.types[0], function () {
    showScreen("spot", { id: spot.id, type: typeName });
  });

  // おすすめなら、右上に朱印
  if (item.recommended) {
    fuda.appendChild(el("span", "おすすめ", "seal"));
  }

  fuda.appendChild(el("span", spot.name, "fuda-name"));

  // タイプの小さな印（統治・武勇 など）
  const tags = el("span", null, "fuda-tags");
  spot.types.forEach(function (t) {
    tags.appendChild(el("span", t, "tag type-" + t));
  });
  fuda.appendChild(tags);

  return fuda;
}

function renderSpots(root, params) {
  const typeName = params.type;
  const hasType = Boolean(loadedData.types[typeName]);

  root.appendChild(el("h1", "ゆかりの地"));
  if (hasType) {
    root.appendChild(el("p", typeName + "タイプのあなたへ ・ おすすめを先頭に表示しています", "note"));
  } else {
    root.appendChild(el("p", "野々市市内の、富樫氏にゆかりのあるスポットです", "note"));
  }

  // 仮データの間だけ出す帯。本物のデータに替えたら data/spots.json の draft を false にする
  const isDraft = loadedData.spots.some(function (s) { return s.draft; });
  if (isDraft) {
    root.appendChild(el("div", "※ スポットの情報は準備中です（チームで作成中）", "draft-banner"));
  }

  // スポットの木札を並べる
  const list = el("div", null, "fuda-list");
  orderSpots(loadedData.spots, typeName).forEach(function (item) {
    list.appendChild(makeSpotFuda(item, typeName));
  });
  root.appendChild(list);

  // 戻るボタン（タイプがあるときだけ「結果に戻る」を出す）
  if (hasType) {
    root.appendChild(el("button", "結果に戻る", "btn sub", function () {
      showScreen("result", { type: typeName });
    }));
  }
  root.appendChild(el("button", "ホームに戻る", "btn sub", function () {
    showScreen("home");
  }));
}
