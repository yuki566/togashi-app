/*
  home.js : S1 ホーム画面

  表示するもの
    - アプリ名と短い説明
    - 「診断をはじめる」ボタン → S2 診断へ
    - 前回の診断結果があれば「前回の結果を見る」ボタン → S3 結果へ
*/

function renderHome(root) {
  root.appendChild(el("h1", "富樫氏 史跡めぐり"));
  root.appendChild(el("p", "いくつかの質問に答えて、あなたに合う野々市の史跡を見つけよう。"));

  const card = el("div", null, "card");
  card.appendChild(el("p", "6つの質問に答えると、4つのタイプ（統治・武勇・信仰・学び）のどれかがわかります。所要時間は1〜2分です。"));
  root.appendChild(card);

  // 診断をはじめるボタン
  root.appendChild(el("button", "診断をはじめる", "btn", function () {
    showScreen("quiz");
  }));

  // 前回の結果が保存されていたら、見るボタンを出す
  const saved = loadResult();
  if (saved) {
    root.appendChild(el("button", "前回の結果を見る（" + saved + "）", "btn sub", function () {
      showScreen("result", { type: saved });
    }));
  }
root.appendChild(
  el(
    "button",
    "富樫図鑑を見る",
    "btn sub",
    function () {
      showScreen("collection");
    }
  )
);
}
