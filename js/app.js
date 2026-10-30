/*
  app.js : 画面の切り替え役（最後に読み込まれる）

  やっていること
    1. データ（JSON）を読み込む
    2. 画面を1つずつ表示する（showScreen）

  画面の流れ
    ホーム(S1) → 診断(S2) → 結果(S3) → スポット一覧(S4) → スポット詳細(S5)

  各画面は「画面名 → 表示する関数」の形で SCREENS に登録されています。
  新しい画面を作るときは、js/screens/ にファイルを足して、ここに1行足します。
*/

// 画面名と、その画面を表示する関数の対応表
const SCREENS = {
  home: renderHome,       // S1 ホーム   (js/screens/home.js)
  quiz: renderQuiz,       // S2 診断     (js/screens/quiz.js)
  result: renderResult,   // S3 診断結果 (js/screens/result.js)
  spots: renderSpots,     // S4 スポット一覧 (js/screens/spots.js)
  spot: renderSpotDetail, // S5 スポット詳細 (js/screens/spot-detail.js)
  collection: renderCollection,
};

// 画面を切り替える。params は画面に渡したい情報（例：結果のタイプ名）
function showScreen(name, params) {
  const root = document.getElementById("app");
  root.textContent = "";            // 今の画面を消す
  SCREENS[name](root, params || {}); // 新しい画面を作る
  window.scrollTo(0, 0);
}

// HTMLの部品を作る便利関数
//   el("p", "こんにちは")                  → <p>こんにちは</p>
//   el("button", "押す", "btn", onClick)   → classが btn で、押すと onClick が動くボタン
// ※ 文字は textContent で入れるので、データに変な文字が入っても安全です
function el(tag, text, className, onClick) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  if (onClick) node.addEventListener("click", onClick);
  return node;
}

// アプリの起動
async function startApp() {
  const root = document.getElementById("app");
  try {
    await loadData();
    showScreen("home");
  } catch (e) {
    root.textContent = "";
    root.appendChild(el("p", "データを読み込めませんでした。", "note"));
    root.appendChild(el("p", String(e.message), "note"));
    root.appendChild(el("p",
      "※ index.html を直接開くのではなく、VS Code の「Live Server」で開いてください。", "note"));
  }
}

startApp();
