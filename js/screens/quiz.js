/*
  quiz.js : S2 診断画面

  6問を1問ずつ表示します。
    - 選択肢を押すと、次の質問へ進む（最後の質問なら結果へ）
    - 「戻る」ボタンで前の質問に戻れる（前に選んだ答えは色がついて残る）
    - 「ホームに戻る」ボタンで、診断をやめてホームへ戻れる
      （途中の答えは保存されない。確認のメッセージを出してから戻る）

  answers の中身：質問ごとに「選んだタイプ名」を入れていく配列
    例）["統治", "武勇", ...]  ← 0番目が1問目の答え
*/

function renderQuiz(root) {
  const questions = loadedData.questions;
  const answers = [];   // これまでの答え
  let index = 0;        // 今、何問目か（0が1問目）

  // 今の質問を表示する
  function draw() {
    root.textContent = "";
    const q = questions[index];

    // 進み具合（例：3 / 6）
    const progress = el("div", null, "progress");
    progress.appendChild(el("div", (index + 1) + " / " + questions.length, "progress-text"));
    const bar = el("div", null, "progress-bar");
    const fill = el("div", null, "progress-fill");
    fill.style.width = ((index + 1) / questions.length * 100) + "%";
    bar.appendChild(fill);
    progress.appendChild(bar);
    root.appendChild(progress);

    // 質問文
    root.appendChild(el("p", q.text, "question"));

    // 選択肢（押すと答えを記録して次へ）
    q.choices.forEach(function (choice) {
      const selected = answers[index] === choice.type;
      const btn = el("button", choice.text, "btn choice" + (selected ? " selected" : ""), function () {
        answers[index] = choice.type;
        next();
      });
      root.appendChild(btn);
    });

    // 戻るボタン（1問目では押せない）
    const back = el("button", "戻る", "btn sub", function () {
      index -= 1;
      draw();
    });
    if (index === 0) back.disabled = true;
    root.appendChild(back);

    // ホームに戻るボタン（診断を途中でやめる）
    // 押し間違いで答えが消えないよう、確認してから戻る。
    // 結果の保存（saveResult）は最後の質問のあとだけなので、
    // 途中でやめても、前回の結果は消えない。
    const home = el("button", "ホームに戻る", "btn sub", function () {
      if (window.confirm("診断をやめてホームに戻りますか？\n（ここまでの答えは保存されません）")) {
        showScreen("home");  // ← "home" は app.js の画面の名前に合わせる
      }
    });
    root.appendChild(home);
  }

  // 次へ進む。最後の質問なら診断して結果画面へ
  function next() {
    if (index < questions.length - 1) {
      index += 1;
      draw();
    } else {
      const result = diagnose(answers);  // js/diagnosis.js
      saveResult(result.type);           // js/storage.js
      showScreen("result", { type: result.type });
    }
  }

  draw();
}
