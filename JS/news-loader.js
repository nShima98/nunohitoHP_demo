// news.jsonからデータを読み込んでnews.htmlに動的に表示するスクリプト

$(document).ready(function() {
    // news.jsonからデータを読み込む
    $.getJSON('Data/news.json', function(news) {
        // 既存のlatest-news-listの内容をクリア
        $('.latest-news-list').empty();
        
        // 全ニュースデータからHTMLを生成（元のpaginathingが非表示処理を行う）
        news.forEach(function(newsItem) {
            var newsHtml = createNewsHtml(newsItem);
            $('.latest-news-list').append(newsHtml);
        });
        
        // ページネーションを初期化（元のpaginathingの処理を使用）
        $('.latest-news-list').paginathing({
            perPage: 8,
            prevNext: false,
            activeClass: 'navi-active',
            firstText: '<i class="fas fa-angle-double-left"></i>',
            lastText: '<i class="fas fa-angle-double-right"></i>'
        });
        
    }).fail(function() {
        console.error('news.jsonの読み込みに失敗しました');
        // エラー時のフォールバック表示
        $('.latest-news-list').html('<li id="latest-news-box"><p>ニュースデータの読み込みに失敗しました。</p></li>');
    });
});

// ニュースデータからHTMLを生成する関数
function createNewsHtml(newsItem) {
    var linkHtml = '';
    var imgHtml = '';
    var titleHtml = '';
    
    // リンクがある場合とない場合でHTMLを分岐
    if (newsItem.link) {
        // リンクがある場合
        linkHtml = '<a href="' + newsItem.link + '">';
        imgHtml = linkHtml + '<img id="latest-news-img" src="' + newsItem.image + '"></a>';
        titleHtml = '<a href="' + newsItem.link + '">' + newsItem.title + '</a>';
    } else {
        // リンクがない場合
        imgHtml = '<img id="latest-news-img" src="' + newsItem.image + '">';
        titleHtml = '<p>' + newsItem.title + '</p>';
    }
    
    return `
        <li id="latest-news-box">
            <div id="latest-news-img-box">
                ${imgHtml}
            </div>
            <div id="latest-news-date">
                <p>${newsItem.date}</p>
            </div>
            <div id="latest-news-ct">
                ${titleHtml}
            </div>
        </li>
    `;
}
