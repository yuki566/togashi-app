/*
  spots.js : S4 スポット一覧（位置情報の保持対応版）

  このファイルは、野々市市の富樫氏ゆかりのスポット一覧画面（S4）を描画し、
  おすすめスポットの並べ替え、木札の生成、および localStorage を使った
  現在地・距離の保持（別画面移動でのリセット防止）を行います。
*/

// スポットを「おすすめが先頭」の順に並べ替える
//   戻り値：[{ spot: スポットの情報, recommended: おすすめなら true }, ...]
//   おすすめは types.json に書かれた順番。残りは spots.json の順番のまま

let spotImagesPreloaded = false;

function preloadSpotImages() {
  if (spotImagesPreloaded) return;
  spotImagesPreloaded = true;

  loadedData.spots.forEach(function (spot) {
    if (!spot.photo) return;

    const image = new Image();
    image.src = "images/" + spot.photo;
  });
}

function calcDistance(from, to) {
  const radLat1 = (from.lat * Math.PI) / 180;
  const radLon1 = (from.lng * Math.PI) / 180;
  const radLat2 = (to.lat * Math.PI) / 180;
  const radLon2 = (to.lng * Math.PI) / 180;
  const latDiff = radLat1 - radLat2;
  const lonDiff = radLon1 - radLon2;
  const radLatAvg = (radLat1 + radLat2) / 2.0;
  const a = 6378137.0;
  const e2 = 0.006694379990197551;
  const W = Math.sqrt(1.0 - e2 * Math.sin(radLatAvg) * Math.sin(radLatAvg));
  const M = a * (1.0 - e2) / (W * W * W);
  const N = a / W;
  const dLat = M * latDiff;
  const dLon = N * Math.cos(radLatAvg) * lonDiff;
  const meters = Math.sqrt(dLat * dLat + dLon * dLon);
  const walkingSpeedMetersPerMin = 80;
  const minutes = Math.ceil(meters / walkingSpeedMetersPerMin);

  return {
    meters: Math.round(meters),
    minutes: minutes < 1 ? 1 : minutes
  };
}

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

// 距離の表示用の文字を作る（例：「約 350 m ・ 徒歩 5 分」「約 1.2 km ・ 徒歩 15 分」）
function formatDistance(info) {
  const rounded = Math.round(info.meters / 10) * 10;   // 10m 単位に丸める
  let distanceText;
  if (rounded < 1000) {
    distanceText = "約 " + rounded + " m";
  } else {                                              // 丸めて 1000m 以上なら km で書く
    distanceText = "約 " + (info.meters / 1000).toFixed(1) + " km";
  }
  return distanceText + " ・ 徒歩 " + info.minutes + " 分";
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

  // 距離を書く場所（最初は空。「現在地から距離を表示」を押すと埋まる）
  const dist = el("span", null, "fuda-dist");
  dist.dataset.spotId = spot.id;
  fuda.appendChild(dist);

  return fuda;
}

// 「現在地から距離を表示」ボタンと、その結果を表示する欄を作る
function makeDistanceArea(list) {
  const area = el("div", null, "loc-area");
  const status = el("p", null, "loc-status note");

  // 位置情報が使えないブラウザでは、ボタン自体を出さない
  if (!("geolocation" in navigator)) {
    return area;
  }

  // 位置情報を取得して画面に反映する共通処理
  function fetchAndShowPosition(isManual) {
    status.textContent = "現在地を確認しています…";

    navigator.geolocation.getCurrentPosition(
      function (position) {          // 成功したとき
        const here = { lat: position.coords.latitude, lng: position.coords.longitude };
        
        // 【追加】取得した現在地を localStorage に保存する（別画面に移動しても消えないようにする）
        localStorage.setItem("togashi_last_lat", here.lat);
        localStorage.setItem("togashi_last_lng", here.lng);

        showDistances(list, here, status);
      },
      function (error) {             // 失敗・拒否されたとき
        if (error.code === 1) {
          status.textContent = "位置情報の利用が許可されませんでした。距離なしで一覧は使えます。";
        } else {
          status.textContent = "現在地を取得できませんでした。少し場所を変えて、もう一度お試しください。";
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  const button = el("button", "現在地から距離を表示", "btn sub loc-btn", function () {
    fetchAndShowPosition(true);
  });

  area.appendChild(button);
  area.appendChild(status);

  // 【追加】すでに localStorage に保存された現在地があるか確認し、あれば自動で復元して距離を表示する
  const savedLat = localStorage.getItem("togashi_last_lat");
  const savedLng = localStorage.getItem("togashi_last_lng");
  if (savedLat !== null && savedLng !== null) {
    const here = { lat: parseFloat(savedLat), lng: parseFloat(savedLng) };
    // 少し遅れて（または描画直後に）距離を計算して表示
    setTimeout(function () {
      showDistances(list, here, status);
      status.textContent = "前回の現在地からの距離を表示しています（再取得するにはボタンを押してください）。";
    }, 50);
  }

  return area;
}

// 各木札に、現在地からの距離を書き込む
function showDistances(list, here, status) {
  // 担当Eの距離関数がまだ無いとき
  if (typeof calcDistance !== "function") {
    status.textContent = "現在地は取得できました。距離の計算は準備中です。";
    return;
  }

  let count = 0;
  list.querySelectorAll(".fuda-dist").forEach(function (dist) {
    const spot = loadedData.spots.find(function (s) { return s.id === dist.dataset.spotId; });
    const hasCoords = spot && typeof spot.lat === "number" && typeof spot.lng === "number";
    if (hasCoords) {
      dist.textContent = formatDistance(calcDistance(here, { lat: spot.lat, lng: spot.lng }));
      count += 1;
    } else {
      dist.textContent = "場所の情報は準備中";
    }
  });

  // 初回取得時のメッセージ（保存データ復元時は makeDistanceArea 側で書き換えるため上書きしない配慮）
  if (!status.textContent.includes("前回")) {
    status.textContent = count > 0
      ? "現在地からの距離を表示しました（目安です）。"
      : "スポットの場所の情報が準備中のため、距離を表示できません。";
  }
}

function renderSpots(root, params) {
  preloadSpotImages();

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

  // 距離表示のボタンは、一覧の上に置く
  root.appendChild(makeDistanceArea(list));
  root.appendChild(list);

  // 戻るボタン（タイプがあるときだけ「結果に戻る」を出す）
  if (hasType) {
    root.appendChild(el("button", "結果に戻る", "btn sub", function () {
      showScreen("result", { type: typeName });
    }));
  }
  root.appendChild(
  el("button","富樫図鑑を見る","btn sub",function () {
    showScreen("collection");
  }));
  root.appendChild(el("button", "ホームに戻る", "btn sub", function () {
    showScreen("home");
  }));
}