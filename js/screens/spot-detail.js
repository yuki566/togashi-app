/*
  spot-detail.js : S5 スポット詳細

  表示するもの
    - 写真（「額縁」の中に表示。写真がまだ無いときは「写真は準備中」の枠）
    - スポット名、タイプの印
    - 解説・出典・住所（「巻物」の形で表示。空欄のときは「準備中」）
    - 「地図アプリで開く」ボタン（Googleマップへのリンク）
    - 「一覧へ戻る」ボタン

  params.id   : 表示するスポットのID（例："spot-01"。data/spots.json の id）
  params.type : 診断結果のタイプ名（一覧に戻るときに、おすすめ順を保つために使う）

  写真は images/ フォルダに、自分たちで撮影したものを入れる（AIで作った画像は使わない）。
  data/spots.json の photo に、ファイル名（例："spot-01.jpg"）を書く。
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

// 写真の額縁を作る（写真が無い・読み込めないときは「準備中」の枠）
function makePhotoFrame(spot) {
  const frame = el("div", null, "frame");
  const empty = el("div", "写真は準備中", "photo-empty");

  if (spot.photo) {
    const img = document.createElement("img");
    img.src = "images/" + spot.photo;
    img.alt = spot.name + "の写真";
    // ファイルが見つからないときは、準備中の枠に差し替える
    img.addEventListener("error", function () {
      frame.replaceChild(empty, img);
    });
    frame.appendChild(img);
  } else {
    frame.appendChild(empty);
  }
  return frame;
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

  root.appendChild(makePhotoFrame(spot));

  root.appendChild(el("h1", spot.name));
  const tags = el("div", null, "detail-tags");
  spot.types.forEach(function (t) {
    tags.appendChild(el("span", t, "tag type-" + t));
  });
  root.appendChild(tags);

  root.appendChild(makeScroll("解説", spot.description));
  root.appendChild(makeScroll("出典", spot.source));
  const urlScroll = el("div", null, "maki");
  urlScroll.appendChild(el("div", "URL", "maki-title"));
  
  if (spot.URL) {
    const link = el("a", "公式ページを開く", "btn sub");
    link.href = spot.URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    urlScroll.appendChild(link);
  } else {
    urlScroll.appendChild(el("p", "（準備中）", "note"));
  }
  root.appendChild(urlScroll);
  
  root.appendChild(makeScroll("住所", spot.address));

  // 地図アプリで開く（新しいタブで開く）
  const mapLink = el("a", "地図アプリで開く", "btn");
  mapLink.href = makeMapUrl(spot);
  mapLink.target = "_blank";
  mapLink.rel = "noopener";
  root.appendChild(mapLink);

  root.appendChild(el("button", "一覧へ戻る", "btn sub", function () {
    showScreen("spots", { type: params.type });
  }));
}
