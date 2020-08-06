function check() {
  // 関数checkの作成,使ったときの処理を定義

  const posts = document.getElementsByClassName("post");
  // 関数式使って、変数postsにClassNameがpostのhtmlの要素全て取得

  postsA = Array.from(posts);
  // 取得したDOMを配列へ変換。取得したpostsが取得したHTMLcollectionオブジェクトを配列にするArray.fromメソッドを使った

  postsA.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // このままでは1秒に1回のペースでメモの投稿にaddEventListenerがセットされる。重複するので1回のクリックでも複数回処理が実行されてしまいます。1度でも読み込んでいればpost.setAttribute("data-load", "true");を実行しdata-loadという要素を追加。2回目以降はdata-loadがnullではないもの、すなわち読み込まれたことのある投稿の場合には、処理を中断させる記述をします
    post.addEventListener("click", (e) => {
      const postId = post.getAttribute("data-id");
        // クリックしたらpostIdにpostに格納されてる属性名data-idを取得する。これでメモのidゲット。このidは後ほどurlパラメータでサーバーにパラメーターとして送る。
        const XHR = new XMLHttpRequest();
        // エンドポイントを呼ぶためXMLHttpRequestを使用してHTTPリクエストを行う。そのためのオブジェクト生成。変数XHRから、XMLHttpRequestのメソッドを使用できるようにした
        XHR.open("GET", `/posts/${postId}`, true);
        // 定義したXHR変数にリクエストの詳細な設定をしてもらう。もうわけわからん
        XHR.responseType = "json";
        // リクエストを送る際にあらかじめ、レスポンスとして欲しい情報の形式を指定する必要ある。今回のレスポンスはデータで、形式はJSONで送る。レスポンスの形式はJSON
        XHR.send();
        // リクエストを送信するメソッド。このメソッドで初めてリクエストが行える。openメソッドで非同期通信をtrueにしている場合すぐに返す。
        XHR.onload = () => {
          const item = XHR.response.post;
          // XHR.responseでレスポンスされてきたJSONにアクセスできます。コントローラーのcheckedアクションで返却したitemは、XHR.response.postで取得できる
          if (item.checked === true) {
            post.setAttribute("data-check", "true");
            // 既読であれば先ほどのHTMLに定義したぞくせであるdata-checkの属性値にtrueをセットします。
          } else if (item.checked === false) {
            post.removeAttribute("data-check");
          }
          // 逆に未読であればdata-checkは属性ごと削除します。これでレスポンスに対応する記述が完了しました。
          if (XHR.status != 200) {
            alert(`Error ${XHR.status}: ${XHR.statusText}`);
          } else {
            return null;
          }
          // 200以外はアラート、うまく読み込まれてませんよ
          XHR.onerror = () => {
            alert("Request failed");
          };
          // リクエストが失敗してJSONが受信できなかった場合。レスポンスそのものが返却されなかった時、すなわちリクエストそのものに失敗したときの処理。
        };

        e.preventDefault();
        // イベントハンドラーが実行し終わったら今回のイベントをキャンセルする記述
      });
  });
  // forEachを使いpostsAの配列を繰り返し処理します。
  // 処理内容は要素をクリックした時に引数eを使った関数で処理をします　lesson要素を1つずつに対して、『クリック』した時に動作するイベント駆動、、投稿をクリックした時になんらかの処理を行う
}

setInterval(check, 1000);
// 1秒に一回読み込むように設定。check関数が1秒に1度実行されるようになった
// window.addEventListener("load",check);
// windowを読み込んだら(loadしたら)イベント発火しますcheck関数を起動させます