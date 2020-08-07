function memo() {
  const submit = document.getElementById("submit");
  // memoが起動したら変数submitにHTMLのIdがsubmitの全要素を取得順番にね
  submit.addEventListener("click", (e) => {
    // submitをクリックしたら(e)が起動
    const formData = new FormData(document.getElementById("form"));
    // sendを合わせて使いメモ投稿のフォームに入力された情報を送信しよう

    const XHR = new XMLHttpRequest();
    // 非同期通信を実現するために必要なXMLオブジェクトを生成するしXHRに代入
    XHR.open("POST", "/posts", true)
    // どのようなリクエストにするか(初期化する)openメソッドを使い、リクエストの内容を引数へ追記しましょう。HTTPメソッドはPOST、パスは/posts、非同期通信はtrueで有効に設定できます。
    XHR.responseType = "json";
    // レスポンスの様式をJSONに指定

    XHR.send(formData);
    // リクエストを送ることができるメソッド非同期通信がtrueの時レスポンスが返却される

    XHR.onload = () => {
      const item = XHR.response.post;
      // itemは、レスポンスとして返却されたメモのレコードデータを取得している
      const list = document.getElementById("list");
      // listはHTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの親要素を取得している
      const formText = document.getElementById("content");
      // formTextを取得する理由は、「メモの入力フォーム」をリセットするためこの処理が終了した時に「入力フォームの文字は入力されたまま」になってしまうためリセットする必要がある。ここではリセット対象の要素であるcontentという要素を取得しています。

      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // 「メモとして描画する部分のHTML」を定義しています。HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画されるわけです。

      list.insertAdjacentHTML("afterend", HTML);
      // listという要素に対して、insertAdjacentHTMLでHTMLを追加します。第一引数にafterendを指定することで、listの要素直後に挿入できます。

      formText.value = "";
      // このコードにより、「メモの入力フォームに入力されたままの文字」はリセットされます。正確には、空の文字列に上書きされるような仕組みです

      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
      // また、既読機能の実装時と同じように200以外のHTTPステータスが返却された場合の処理を書いておきましょう
    };

    XHR.onerror = function () {
      alert("Request failed");
    };
    // 失敗した場合にアラートを表示処理
    e.preventDefault();
  })
}
window.addEventListener("load", memo);