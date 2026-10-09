/*
  quiz.js : S2 診断画面

  6問を1問ずつ表示します。
    - 選択肢を押すと、次の質問へ進む（最後の質問なら結果へ）
    - 「戻る」ボタンで前の質問に戻れる（前に選んだ答えは色がついて残る）

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
