$(function(){
 
    var href =location.href; //1.URLを取得しエンコードする
    var getTitle = $('.news_title').text(); //2.ページのタイトルを取得（HTMLタグを除去）
     
    //3.URLを取得しエンコードする
    var snsUrl = encodeURIComponent(href);
    var snsTitle = encodeURIComponent(getTitle);
     
    $('.share_button').each(function(){
     
      var sns_obj = $(this).attr('id');　//4.ID名を取得
      var snsCase = sns_obj;
     
      //5.IDを判定してリンク先を出力する
      switch (snsCase){
        //X.FB.LINEでシェア
        //LINE
        case 'page-share-line':
        $(this).attr('href','http://line.me/R/msg/text/?'+ snsTitle +'%0A'+ snsUrl);
        break;
        //FB
        case 'page-share-facebook':
        $(this).attr('href','http://www.facebook.com/sharer.php?u='+ snsUrl);
        break;
        //X
        case 'page-share-X':
        $(this).attr('href','https://twitter.com/intent/tweet?text='+ snsTitle + '%0A' + snsUrl);
        break;
      }
      });
    });

    function copyUrl() {
        var url = location.href;
        navigator.clipboard.writeText(url).then(function() {
            // メッセージ表示用の要素を作成
            var message = $('<div class="copy-message">リンクをコピー<br class="br-mobile">しました！</div>');
            
            // メッセージのスタイルを設定
            message.css({
                'position': 'fixed',
                'top': '50%',
                'left': '50%',
                'transform': 'translate(-50%, -50%)',
                'background-color': 'rgba(243, 149, 24, 0.75)',
                'color': '#fff',
                'padding': '15px 25px',
                'border-radius': '8px',
                'font-size': '16px',
                'font-weight': 'bold',
                'z-index': '9999',
                'box-shadow': '0 4px 12px rgba(0,0,0,0.3)',
                'opacity': '0',
                'transition': 'opacity 0.3s ease-in-out',
                'text-align': 'center',
                'white-space': 'nowrap'
            });
            
            // モバイル用のメディアクエリスタイルを追加
            var mobileStyle = document.createElement('style');
            mobileStyle.textContent = `
                .br-mobile {
                    display: none;
                }
                @media screen and (max-width: 767px) {
                    .copy-message {
                        white-space: normal !important;
                        line-height: 1.4 !important;
                        padding: 12px 20px !important;
                        font-size: 14px !important;
                    }
                    .br-mobile {
                        display: block;
                    }
                }
            `;
            document.head.appendChild(mobileStyle);
            
            // メッセージをbodyに追加
            $('body').append(message);
            
            // フェードイン効果
            setTimeout(function() {
                message.css('opacity', '1');
            }, 10);
            
            // 1.5秒後にフェードアウトして削除
            setTimeout(function() {
                message.css('opacity', '0');
                setTimeout(function() {
                    message.remove();
                }, 300);
            }, 1500);
        }).catch(function(err) {
            console.error('リンクのコピーに失敗しました:', err);
        });
    }