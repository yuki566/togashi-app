/*
  spot-detail.js : S5 スポット詳細

  表示するもの
    - スポット名、タイプの印
    - 公式ページへのリンク（「額縁」の形で表示。URLがまだ無いときは「公式ページは準備中」）
    - 解説・出典・住所（「巻物」の形で表示。空欄のときは「準備中」）
    - 「地図アプリで開く」ボタン（Googleマップへのリンク）
    - 「一覧へ戻る」ボタン

  params.id   : 表示するスポットのID（例："spot-01"。data/spots.json の id）
  params.type : 診断結果のタイプ名（一覧に戻るときに、おすすめ順を保つために使う）

  写真は使わない（使うことが禁止されたため）。代わりに、スポットの公式ページなどへのリンクを出す。
  data/spots.json の URL に、ページのアドレス（例："https://www.city.nonoichi.lg.jp/..."）を書く。
*/

// 地図アプリ（Googleマップ）のURLを作る
//   緯度・経度ではなく、場所（スポット名＋住所）で検索して開く
//   こうすると、Googleマップに施設名のピンと情報が出る
//   住所がまだ無ければ、「スポット名 野々市市」で検索する
function makeMapUrl(spot) {
  const base = "https://www.google.com/maps/search/?api=1&query=";
  const place = spot.address ? spot.name + " " + spot.address : spot.name + " 野々市市";
  return base + encodeURIComponent(place);
}

// 公式ページへのリンクを、額縁の形で作る（URLが無いときは「準備中」の枠）
//   サイト名（出典）と、飛び先のドメインも出して、どこへ移動するかわかるようにする
function makeLinkFrame(spot) {
  if (!spot.URL) {
    return el("div", "公式ページは準備中", "frame link-empty");
  }

  const link = el("a", null, "frame link-frame");
  link.href = spot.URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  if (spot.source) link.appendChild(el("span", spot.source, "link-site"));
  link.appendChild(el("span", "公式ページを開く ↗", "link-label"));
  // URLの書き方がおかしくても画面が止まらないように、ドメインが取れたときだけ出す
  try {
    link.appendChild(el("span", new URL(spot.URL).hostname, "link-domain"));
  } catch (e) {
    // ドメインは出さない
  }
  return link;
}

// 巻物（見出し＋本文）を作る。本文が空なら「準備中」と表示する
function makeScroll(title, text) {
  const scroll = el("div", null, "maki");
  scroll.appendChild(el("div", title, "maki-title"));
  scroll.appendChild(el("p", text || "（準備中）", text ? "" : "note"));
  return scroll;
}

function renderSpotDetail(root, params) {
  const spot = loadedData.spots.find(function (s) { return s.id === params.id; });

  // 知らないIDが来たら一覧に戻す
  if (!spot) {
    showScreen("spots", { type: params.type });
    return;
  }

  // 仮データの間だけ出す帯。本物のデータに替えたら data/spots.json の draft を false にする
  if (spot.draft) {
    root.appendChild(el("div", "※ このスポットの情報は準備中です（チームで作成中）", "draft-banner"));
  }

  root.appendChild(el("h1", spot.name));
  const tags = el("div", null, "detail-tags");
  spot.types.forEach(function (t) {
    tags.appendChild(el("span", t, "tag type-" + t));
  });
  root.appendChild(tags);

  root.appendChild(makeLinkFrame(spot));

  root.appendChild(makeScroll("解説", spot.description));
  root.appendChild(makeScroll("出典", spot.source));
  root.appendChild(makeScroll("住所", spot.address));

  // 地図アプリで開く（新しいタブで開く）
  const mapLink = el("a", "地図アプリで開く", "btn");
  mapLink.href = makeMapUrl(spot);
  mapLink.target = "_blank";
  mapLink.rel = "noopener";
  root.appendChild(mapLink);
  root.appendChild(el("button","図鑑登録テスト","btn",function () {
    saveStamp(spot.id);
    alert(spot.name + "を登録しました");
  }));

  root.appendChild(el("button", "一覧へ戻る", "btn sub", function () {
    showScreen("spots", { type: params.type });
  }));
}
