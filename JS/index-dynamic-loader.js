/**
 * index.htmlのNewsとWorksセクションを動的に生成するJSファイル
 * JSONファイルから最新の3件を読み込んで表示
 */

document.addEventListener('DOMContentLoaded', function() {
    // NewsとWorksのデータを読み込んで表示
    loadNewsData();
    loadWorksData();
});

/**
 * Newsデータを読み込んで表示
 */
async function loadNewsData() {
    try {
        const response = await fetch('Data/news.json');
        const newsData = await response.json();
        
        // 最新の3件を取得
        const latestNews = newsData.slice(0, 3);
        
        // .tn-scrollコンテナを取得
        const newsContainer = document.querySelector('.tn-scroll');
        
        // 既存のコンテンツをクリア
        newsContainer.innerHTML = '';
        
        // 各ニュースアイテムを生成
        latestNews.forEach(news => {
            const newsElement = createNewsElement(news);
            newsContainer.appendChild(newsElement);
        });
        
    } catch (error) {
        console.error('Newsデータの読み込みに失敗しました:', error);
    }
}

/**
 * Worksデータを読み込んで表示
 */
async function loadWorksData() {
    try {
        const response = await fetch('Data/works.json');
        const worksData = await response.json();
        
        // 最新の3件を取得
        const latestWorks = worksData.slice(0, 3);
        
        // #tw-scrollコンテナを取得
        const worksContainer = document.querySelector('#tw-scroll');
        
        // 既存のコンテンツをクリア
        worksContainer.innerHTML = '';
        
        // 各ワークアイテムを生成
        latestWorks.forEach(work => {
            const workElement = createWorkElement(work);
            worksContainer.appendChild(workElement);
        });
        
    } catch (error) {
        console.error('Worksデータの読み込みに失敗しました:', error);
    }
}

/**
 * News要素を作成
 * @param {Object} news - ニュースデータ
 * @returns {HTMLElement} 生成されたニュース要素
 */
function createNewsElement(news) {
    const newsDiv = document.createElement('div');
    newsDiv.className = 'tn-contents';
    
    const link = document.createElement('a');
    link.href = news.link;
    
    // 日付とタイトルを設定
    link.innerHTML = `${news.date}<br>${news.title}<img class="tn-boximg" src="${news.image}">`;
    
    newsDiv.appendChild(link);
    return newsDiv;
}

/**
 * Work要素を作成
 * @param {Object} work - ワークデータ
 * @returns {HTMLElement} 生成されたワーク要素
 */
function createWorkElement(work) {
    const workDiv = document.createElement('div');
    workDiv.className = 'tw-contents';
    
    const link = document.createElement('a');
    
    // linkがnullの場合はworks.htmlにリンク
    if (work.link) {
        link.href = work.link;
    } else {
        link.href = 'works.html';
    }
    
    // 日付とタイトルを設定
    link.innerHTML = `${work.date}<br>${work.title}<img class="tw-boximg" src="${work.image}">`;
    
    workDiv.appendChild(link);
    return workDiv;
}
