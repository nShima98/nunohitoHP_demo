// 前後のニュースボタンを自動生成するスクリプト
// news.jsonからデータを読み込んで、現在のページの前後の有効なリンクを自動で生成

$(document).ready(function() {
    generateNewsNavigation();
});

// 前後のニュースボタンを自動生成する関数
function generateNewsNavigation() {
    // 現在のページのファイル名を取得
    const currentPage = window.location.pathname.split('/').pop();
    
    // news.jsonからデータを読み込み
    $.getJSON('Data/news.json', function(news) {
        // linkがnullでない項目のみをフィルタリング
        const validNews = news.filter(item => item.link !== null);
        
        // 現在のページのインデックスを検索（有効な項目のみで）
        let currentIndex = -1;
        for (let i = 0; i < validNews.length; i++) {
            if (validNews[i].link === currentPage) {
                currentIndex = i;
                break;
            }
        }
        
        if (currentIndex === -1) {
            console.log('現在のページが見つかりません:', currentPage);
            return;
        }
        
        // 前のニュース（有効な項目の配列内で次の要素、日付が新しい方）
        const prevNews = currentIndex < validNews.length - 1 ? validNews[currentIndex + 1] : null;
        
        // 次のニュース（有効な項目の配列内で前の要素、日付が古い方）
        const nextNews = currentIndex > 0 ? validNews[currentIndex - 1] : null;
        
        // HTMLを更新
        updateNavigationButtons(prevNews, nextNews);
        
    }).fail(function() {
        console.error('news.jsonの読み込みに失敗しました');
    });
}

// ナビゲーションボタンのHTMLを更新する関数
function updateNavigationButtons(prevNews, nextNews) {
    const newsBtnBox = $('.news-btn-box');
    
    // 既存の左右ボタンを削除
    $('.news-btn-left').remove();
    $('.news-btn-right').remove();
    
    // 次のニュースボタン（左側）
    if (nextNews) {
        const leftBtn = $('<div class="news-btn-left"><a href="' + nextNews.link + '">次のNewsへ</a></div>');
        newsBtnBox.prepend(leftBtn);
    }
    
    // 前のニュースボタン（右側）
    if (prevNews) {
        const rightBtn = $('<div class="news-btn-right"><a href="' + prevNews.link + '">前のNewsへ</a></div>');
        newsBtnBox.append(rightBtn);
    }
}
