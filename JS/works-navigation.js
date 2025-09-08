// 前後のWorksボタンを自動生成するスクリプト
// works.jsonからデータを読み込んで、現在のページの前後の有効なリンクを自動で生成

$(document).ready(function() {
    generateWorksNavigation();
});

// 前後のWorksボタンを自動生成する関数
function generateWorksNavigation() {
    // 現在のページのファイル名を取得
    const currentPage = window.location.pathname.split('/').pop();
    
    // works.jsonからデータを読み込み
    $.getJSON('Data/works.json', function(works) {
        // linkがnullでない項目のみをフィルタリング
        const validWorks = works.filter(item => item.link !== null);
        
        // 現在のページのインデックスを検索（有効な項目のみで）
        let currentIndex = -1;
        for (let i = 0; i < validWorks.length; i++) {
            if (validWorks[i].link === currentPage) {
                currentIndex = i;
                break;
            }
        }
        
        if (currentIndex === -1) {
            console.log('現在のページが見つかりません:', currentPage);
            return;
        }
        
        // 前のWorks（有効な項目の配列内で次の要素、日付が新しい方）
        const prevWorks = currentIndex < validWorks.length - 1 ? validWorks[currentIndex + 1] : null;
        
        // 次のWorks（有効な項目の配列内で前の要素、日付が古い方）
        const nextWorks = currentIndex > 0 ? validWorks[currentIndex - 1] : null;
        
        // HTMLを更新
        updateWorksNavigationButtons(prevWorks, nextWorks);
        
    }).fail(function() {
        console.error('works.jsonの読み込みに失敗しました');
    });
}

// ナビゲーションボタンのHTMLを更新する関数
function updateWorksNavigationButtons(prevWorks, nextWorks) {
    const worksBtnBox = $('.works-btn-box');
    
    // 既存の左右ボタンを削除
    $('.works-btn-left').remove();
    $('.works-btn-right').remove();
    
    // 次のWorksボタン（左側）
    if (nextWorks) {
        const leftBtn = $('<div class="works-btn-left"><a href="' + nextWorks.link + '">次のWorkへ</a></div>');
        worksBtnBox.prepend(leftBtn);
    }
    
    // 前のWorksボタン（右側）
    if (prevWorks) {
        const rightBtn = $('<div class="works-btn-right"><a href="' + prevWorks.link + '">前のWorkへ</a></div>');
        worksBtnBox.append(rightBtn);
    }
}
