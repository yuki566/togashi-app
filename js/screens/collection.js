/*
  collection.js : S6 図鑑
*/

function renderCollection(root) {

  root.appendChild(el("h1", "富樫図鑑"));

  const stamps = loadStamps();

  const found = stamps.length;
  const total = loadedData.spots.length;

  root.appendChild(
    el("p", "発見数 " + found + " / " + total)
  );

  root.appendChild(
    el(
      "p",
      "達成率 " +
      Math.round(found / total * 100) +
      "%",
      "note"
    )
  );

  const list = el("div", null, "fuda-list");

  loadedData.spots.forEach(function (spot) {

    const opened =
      stamps.includes(spot.id);

    const card =
      el("div", null, "fuda");

    if (opened) {

      card.appendChild(
        el("h3", spot.name)
      );

      const tags =
        el("div", null, "detail-tags");

      spot.types.forEach(function (t) {

        tags.appendChild(
          el(
            "span",
            t,
            "tag type-" + t
          )
        );

      });

      card.appendChild(tags);

      card.appendChild(
        el(
          "p",
          spot.description ||
          "解説は準備中です"
        )
      );

    } else {

      card.appendChild(
        el("h3", "？？？？？")
      );

      card.appendChild(
        el(
          "p",
          "現地を訪れて発見しよう",
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
      "ホームへ戻る",
      "btn sub",
      function () {
        showScreen("home");
      }
    )
  );
}