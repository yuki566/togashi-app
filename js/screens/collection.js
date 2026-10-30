/*
  collection.js : S6 富樫図鑑

  表示するもの
    - 発見数
    - 達成率
    - 発見済みスポット
    - 未発見スポット
    - ホームへ戻る
*/

function renderCollection(root) {

  root.appendChild(
    el("h1", "富樫図鑑")
  );

  const stamps = loadStamps();

  const total =
    loadedData.spots.length;

  const found =
    stamps.length;

  root.appendChild(
    el(
      "p",
      "発見数：" + found + " / " + total,
      "note"
    )
  );

  const rate =
    Math.round(found / total * 100);

  root.appendChild(
    el(
      "p",
      "達成率：" + rate + "%",
      "note"
    )
  );

  const list =
    el("div", null, "fuda-list");

  loadedData.spots.forEach(function (spot) {

    const card =
      el("div", null, "card");

    const discovered =
      stamps.includes(spot.id);

    if (discovered) {

      card.appendChild(
        el("h2", spot.name)
      );

      const tags =
        el("div", null, "detail-tags");

      spot.types.forEach(function (type) {

        tags.appendChild(
          el(
            "span",
            type,
            "tag type-" + type
          )
        );

      });

      card.appendChild(tags);

      card.appendChild(
        el(
          "p",
          spot.description ||
          "説明は準備中です"
        )
      );

      card.appendChild(
        el(
          "button",
          "詳細を見る",
          "btn sub",
          function () {

            showScreen(
              "spot",
              {
                id: spot.id
              }
            );

          }
        )
      );

    } else {

      card.appendChild(
        el("h2", "？？？？？")
      );

      card.appendChild(
        el(
          "p",
          "現地を訪れて発見しよう！",
          "note"
        )
      );

    }

    list.appendChild(card);

  });

  root.appendChild(list);

  root.appendChild(el("button","ゆかりの地を見る","btn sub",function () {
    showScreen("spots");
  }));
  
  root.appendChild(el("button","ホームへ戻る","btn sub",function () {
    showScreen("home");
  }));
}