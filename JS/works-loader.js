// works.jsonからデータを読み込んでworks.htmlに動的に表示するスクリプト

$(document).ready(function() {
    // works.jsonからデータを読み込む
    $.getJSON('Data/works.json', function(works) {
        // 既存のworks-boxの内容をクリア
        $('.works-box').empty();
        
        // 全作品データからHTMLを生成（元のpaginathingが非表示処理を行う）
        works.forEach(function(work) {
            var workHtml = createWorkHtml(work);
            $('.works-box').append(workHtml);
        });
        
        // ページネーションを初期化（元のpaginathingの処理を使用）
        $('.works-box').paginathing({
            perPage: 12,
            prevNext: false,
            activeClass: 'navi-active',
            firstText: '<i class="fas fa-angle-double-left"></i>',
            lastText: '<i class="fas fa-angle-double-right"></i>'
        });
        
    }).fail(function() {
        console.error('works.jsonの読み込みに失敗しました');
        // エラー時のフォールバック表示
        $('.works-box').html('<li class="works-container"><p>作品データの読み込みに失敗しました。</p></li>');
    });
});

// 作品データからHTMLを生成する関数
function createWorkHtml(work) {
    var linkHtml = '';
    var imgHtml = '';
    var titleHtml = '';
    
    // リンクがある場合とない場合でHTMLを分岐
    if (work.link) {
        // リンクがある場合
        linkHtml = '<a href="' + work.link + '">';
        imgHtml = linkHtml + '<img class="works-container-img" src="' + work.image + '"></a>';
        titleHtml = '<a href="' + work.link + '">' + work.title + '</a>';
    } else {
        // リンクがない場合
        imgHtml = '<img class="works-container-img" src="' + work.image + '">';
        titleHtml = '<p>' + work.title + '</p>';
    }
    
    return `
        <li class="works-container">
            <div class="works-container-img-box">
                ${imgHtml}
            </div>
            <div class="works-container-date">
                <p>${work.date}</p>
            </div>
            <div class="works-container-text">
                ${titleHtml}
            </div>
        </li>
    `;
}
