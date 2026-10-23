<div align="center">

# 🏯 富樫氏 史跡めぐり

**6つの質問で、あなたに合う野々市の史跡が見つかる。**<br>
加賀の守護・富樫氏ゆかりの地をめぐる、スマートフォン向けWebアプリ

[![アプリを開く](https://img.shields.io/badge/%E2%96%B6%20%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E9%96%8B%E3%81%8F-yuki566.github.io%2Ftogashi--app-c8a95a?style=for-the-badge&labelColor=26324a)](https://yuki566.github.io/togashi-app/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)
![フレームワークなし](https://img.shields.io/badge/%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%AF%E3%83%BC%E3%82%AF-%E3%81%AA%E3%81%97-c8a95a?style=flat-square&labelColor=26324a)
![ビルド不要](https://img.shields.io/badge/%E3%83%93%E3%83%AB%E3%83%89-%E4%B8%8D%E8%A6%81-c8a95a?style=flat-square&labelColor=26324a)
![個人情報の収集なし](https://img.shields.io/badge/%E5%80%8B%E4%BA%BA%E6%83%85%E5%A0%B1%E3%81%AE%E5%8F%8E%E9%9B%86-%E3%81%AA%E3%81%97-c8a95a?style=flat-square&labelColor=26324a)

プロジェクトデザイン実践　チーム番号：CCCA-404-5 / E5

</div>

---

## 目次

- [📱 どんなアプリ？](#-どんなアプリ)
- [🧭 使い方](#-使い方)
- [💻 手元で動かす](#-手元で動かす)
- [📂 フォルダ構成](#-フォルダ構成)
- [🛠️ 使っている技術](#️-使っている技術)
- [🤝 開発の進め方](#-開発の進め方)
- [📏 授業のルール](#-授業のルール)

---

## 📱 どんなアプリ？

富樫氏と野々市市の史跡を題材にした、スマートフォン向けのWebアプリです。
6問・4択のタイプ診断で、あなたが **統治・武勇・信仰・学び** のどのタイプかを判定し、タイプに合う史跡を紹介します。

| | できること |
|---|---|
| 🧩 **タイプ診断** | 6つの質問に答えると、4つのタイプのどれかがわかります（1〜2分） |
| ⛩️ **おすすめの史跡** | タイプに合う史跡3か所を、一覧の先頭に「おすすめ」の印つきで表示します |
| 📍 **現在地からの距離** | 位置情報を許可すると、各史跡までの距離と徒歩時間を表示します |
| 🗺️ **地図アプリで開く** | 史跡の詳細画面から、Googleマップでその場所を開けます |

| 画面 | 内容 |
|---|---|
| S1 ホーム | 「診断をはじめる」ボタン。前回の結果があれば「前回の結果を見る」 |
| S2 診断 | 6問（4択）を1問ずつ表示。「戻る」で前の質問へ |
| S3 診断結果 | タイプ名・説明・おすすめスポット3か所 |
| S4 スポット一覧 | 8か所を表示。位置情報を許可すると距離・徒歩時間も表示 |
| S5 スポット詳細 | 写真・解説・出典・住所・地図アプリへのリンク |

追加機能（必須機能の完成後）：スタンプ獲得、スタンプ帳、結果カード

---

## 🧭 使い方

<table>
<tr>
<td width="180" align="center">
<img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=8&data=https%3A%2F%2Fyuki566.github.io%2Ftogashi-app%2F" width="160" alt="アプリのURLのQRコード"><br>
<sub>スマホで読み取って開く</sub>
</td>
<td>

1. スマートフォンで **https://yuki566.github.io/togashi-app/** を開きます
2. 「診断をはじめる」を押して、6つの質問に答えます
3. 結果画面で、あなたのタイプとおすすめの史跡を確認します
4. 「ゆかりの地を見る」で、史跡の一覧を開きます
5. 史跡の木札を押すと、写真や解説が見られます。「地図アプリで開く」で道案内もできます

</td>
</tr>
</table>

> [!TIP]
> インストールやアカウント登録はいりません。ブラウザで開くだけで使えます。

---

## 💻 手元で動かす

開発するときは、自分のパソコンでアプリを動かして確認します。

### VS Code の「Live Server」で開く（おすすめ）

1. [VS Code](https://code.visualstudio.com/) に、拡張機能 **Live Server** を入れます
2. VS Code で、このフォルダ（`togashi-app`）を開きます
3. `index.html` を右クリックして **「Open with Live Server」** を選びます
4. ブラウザが開いて、アプリが表示されます。ファイルを保存すると、自動で画面が更新されます

<details>
<summary>Live Server が使えないとき（Python で開く）</summary>

このフォルダでターミナルを開き、次のコマンドを実行します。

```sh
python -m http.server 8000
```

ブラウザで http://localhost:8000/ を開きます。終わるときは、ターミナルで `Ctrl + C` を押します。

</details>

### 困ったとき

| 症状 | 原因と直し方 |
|---|---|
| 「データを読み込めませんでした」と出る | `index.html` をダブルクリックで直接開いています。上の **Live Server** で開いてください（ブラウザの決まりで、直接開くと `data/` のJSONを読み込めません） |
| 「データを読み込めませんでした」の下に `JSON` や `Unexpected token` と出る | `data/` のJSONの書き方が間違っています。最後の項目の後ろに余計な `,` がないか、`"` が全角になっていないかを確認してください |
| 「現在地から距離を表示」を押しても位置がとれない | 位置情報は **HTTPS** か **localhost** でしか使えません。スマホから `http://192.168.…` で開いたときは使えないので、公開URLで確認してください |
| 直したのに画面が変わらない | ブラウザが古いファイルを覚えています。`Ctrl + Shift + R`（Mac は `Cmd + Shift + R`）で再読み込みしてください |

---

## 📂 フォルダ構成

```
togashi-app/
├── index.html              画面の土台（#app という枠だけがある）
├── css/
│   └── style.css           見た目（色は一番上の :root にまとめてある）
├── js/
│   ├── data.js             data/ のJSONを読み込む
│   ├── storage.js          診断結果をスマホの中に保存する
│   ├── diagnosis.js        6問の答えからタイプを決める（アプリの「頭脳」）
│   ├── screens/
│   │   ├── home.js         S1 ホーム
│   │   ├── quiz.js         S2 診断
│   │   ├── result.js       S3 診断結果
│   │   ├── spots.js        S4 スポット一覧
│   │   └── spot-detail.js  S5 スポット詳細
│   └── app.js              画面の切り替え役（最後に読み込む）
├── data/
│   ├── questions.json      診断の質問（6問・各4択）
│   ├── types.json          4タイプの説明とおすすめスポット
│   └── spots.json          スポット8か所の情報
└── images/                 自分たちで撮影した写真
```

> [!NOTE]
> `index.html` の `<script>` は、**上から順番に**読み込まれます。下のファイルほど上のファイルの関数を使うので、順番を入れ替えないでください。新しい画面を作るときは、`js/screens/` にファイルを足し、`index.html` と `js/app.js` の `SCREENS` に1行ずつ足します。

---

## 🛠️ 使っている技術

<p>
<img src="https://skillicons.dev/icons?i=html,css,js,vscode,git,github,notion" alt="HTML, CSS, JavaScript, VS Code, Git, GitHub, Notion">
</p>

| 技術 | 使い道 |
|---|---|
| **HTML / CSS / JavaScript** | アプリのすべて。フレームワークもビルドも使わず、ブラウザがそのまま読めるファイルだけで作っています |
| **JSON** | 質問・タイプ・スポットのデータ（`data/` フォルダ）。プログラムを触らずに文章を直せます |
| **localStorage** | 前回の診断結果を、スマホの中にだけ保存します |
| **Geolocation API** | 「現在地から距離を表示」を押したときだけ、現在地を取得します |
| **GitHub Pages** | アプリの公開（HTTPS）。`main` ブランチの内容がそのまま公開されます |
| **VS Code + Live Server** | 開発と動作確認 |
| **Git / GitHub / GitHub Desktop** | 変更の記録と、Pull Request でのレビュー |
| **Notion** | 議事録、AIが書いたコードのレビューログ、開発環境の準備手順 |

**あえて使っていないもの**：フレームワーク（React など）、ビルドツール、サーバー、データベース、ログイン、外部のライブラリ。
チーム全員がプログラミング未経験なので、「ファイルを開けば全部読める」ことを優先しています。

---

## 🤝 開発の進め方

1. 変更は、`main` に直接ではなく、自分用のブランチで行う
2. GitHub Desktop で「Pull Request」を作る
3. 全員でレビューしてから `main` に取り込む

環境の準備は、Notionの「開発環境の準備」ページを見てください。

---

## 📏 授業のルール

- 生成AIが作ったコードは、実行前に全員でレビューし、担当教員に報告します（記録はNotionのレビューログ）
- 生成AIで作った画像・動画は、アプリにもポスターにも使いません
- 写真は自分たちで撮影したものを使います
