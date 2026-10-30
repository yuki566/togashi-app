/*
  collection.js : S6 図鑑画面
*/

function renderCollection(root) {

  root.appendChild(el("h1", "富樫図鑑"));

  const stamps = loadStamps();
  const total = loadedData.spots.length;
  const found = stamps.length;

  root.appendChild(
    el("p", found + " / " + total + " 発見")
  );

  const rate = Math.round(found / total * 100);

  root.appendChild(
    el("p", "達成率 " + rate + "%", "note")
  );

  const list = el("div", null, "fuda-list");

  loadedData.spots.forEach(function (spot) {

    const unlocked =
      stamps.includes(spot.id);

    const card =
      el("div", null, "fuda");

    if (unlocked) {

      card.appendChild(
        el("h3", spot.name)
      );

      card.appendChild(
        el(
          "p",
          spot.description || "スポット情報"
        )
      );

    } else {

      card.appendChild(
        el("h3", "？？？？？")
      );

      card.appendChild(
        el(
          "p",
          "まだ発見していません",
          "note"
        )
      );

    }

    list.appendChild(card);

  });

  root.appendChild(list);

  root.appendChild(
    el(
      "button",
      "ホームに戻る",
      "btn sub",
      function () {
        showScreen("home");
      }
    )
  );

}