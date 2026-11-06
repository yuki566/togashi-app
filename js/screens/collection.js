/*
  collection.js : S6 富樫図鑑
*/

function renderCollection(root) {
  root.appendChild(el("h1", "富樫図鑑"));
  const stamps = loadStamps();
  const total = loadedData.spots.length;
  const found = stamps.length;
  const rate = Math.round(found / total * 100);
  root.appendChild(el("p","発見数：" + found + " / " + total,"note"));
  root.appendChild(el("p","達成率：" + rate + "%","note"));
  const list = el("div", null, "fuda-list");
  loadedData.spots.forEach(function (spot) {
    const card = el("div", null, "card");
    const discovered = stamps.includes(spot.id);// 発見済み
    if (discovered) {
      card.appendChild(el("h2", spot.name));
      const tags = el("div", null, "detail-tags");
      spot.types.forEach(function (type) {
        tags.appendChild(el("span",type,"tag type-" + type));
      });
      card.appendChild(tags);
      card.appendChild(el("p",spot.description || "説明は準備中です"));
      card.appendChild(el("button","詳細を見る","btn sub",function () {
        showScreen("spot",{ id: spot.id });
      }));
    }// 未発見
    else {
      card.appendChild(el("h2", spot.name));
      card.appendChild(el("p","現地を訪れて発見しよう！","note"));
      const registerBtn = el("button","図鑑登録","btn",function () {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const here = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            const target = {
              lat: spot.lat,
              lng: spot.lng
            };
            const distance =calcDistance(here,target);
            if (distance.meters <= 100) {
              saveStamp(spot.id);
              alert(spot.name +" を図鑑登録しました！");
              showScreen("collection");
            } else {
              alert("スポットまで約 " +Math.round(distance.meters) + "mあります。");
            }
          },
            function () {
              alert(
                "位置情報を取得できませんでした。"
              );
            }
        );
      }
      );
      card.appendChild(registerBtn);
    }
    list.appendChild(card);
  });
  root.appendChild(list);
  root.appendChild(
    el("button","ゆかりの地を見る","btn sub",function () {const saved = loadResult();
      showScreen("spots",{ type: saved });
    })
  );

  root.appendChild(
    el("button","ホームへ戻る","btn sub",function () {
        showScreen("home");
    })
  );
}