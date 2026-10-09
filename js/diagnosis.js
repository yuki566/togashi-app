/*
  diagnosis.js : 診断の計算担当（アプリの「頭脳」）

  6問の答えを集計して、4タイプ（統治・武勇・信仰・学び）のどれかを決めます。

  ルール
    1. 選んだ選択肢は、それぞれ1つのタイプに対応していて、1点が入る
    2. 6問の合計がいちばん多いタイプが結果になる
    3. 同点のときは、最後の問い（Q6）で選んだタイプを優先する（※仮のルール）
    4. それでも決まらないとき（Q6で選んだタイプが同点に入っていない）は、
       TYPE_ORDER の順で先にあるタイプにする

  この関数は画面とは無関係なので、単独でテストしやすい作りです。
*/

// タイプの並び順（同点の最終的な決め方にも使う）
const TYPE_ORDER = ["統治", "武勇", "信仰", "学び"];

// answers : 6問ぶんの「選んだタイプ名」の配列  例）["統治","武勇","統治","学び","信仰","統治"]
// 戻り値  : { type: 結果のタイプ名, scores: { 統治:3, 武勇:1, ... } }
function diagnose(answers) {
  // 1. タイプごとの点数を数える
  const scores = {};
  TYPE_ORDER.forEach(function (t) { scores[t] = 0; });
  answers.forEach(function (t) {
    if (scores[t] !== undefined) scores[t] += 1;
  });

  // 2. いちばん高い点数を探す
  const maxScore = Math.max.apply(null, TYPE_ORDER.map(function (t) { return scores[t]; }));

  // 3. その点数のタイプ（同点なら複数）を集める
  const top = TYPE_ORDER.filter(function (t) { return scores[t] === maxScore; });

  // 4. 1つに決まればそれが結果
  if (top.length === 1) {
    return { type: top[0], scores: scores };
  }

  // 5. 同点なら、最後の問いで選んだタイプを優先
  const lastAnswer = answers[answers.length - 1];
  if (top.indexOf(lastAnswer) !== -1) {
    return { type: lastAnswer, scores: scores };
  }

  // 6. それでも決まらなければ、並び順で先のタイプ
  return { type: top[0], scores: scores };
}

// Node.js でテストするときにも読めるようにする（ブラウザでは何も起きない）
if (typeof module !== "undefined") {
  module.exports = { diagnose: diagnose, TYPE_ORDER: TYPE_ORDER };
}
