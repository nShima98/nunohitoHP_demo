'use strict'
//-----ハンバーガーメニュー(PC)-----
{
    const openBtnPC = document.querySelector('.hbg-btn-open')
    const closeBtnPC = document.querySelector('.hbg-btn-close')
    const navPcActive = document.querySelector('.nav-pc')
    const mainActive = document.querySelector('main')
    const overlay = document.querySelector('.overlay')
    
    // 各ページのヘッダー要素を取得
    const ThBox = document.querySelector('#th-box')
    const NwBox = document.querySelector('#nw-box')
    const WoBox = document.querySelector('#wo-box')
    const PrBox = document.querySelector('#pr-box')
    const GaBox = document.querySelector('#ga-box')
    const FaBox = document.querySelector('#fa-box')
    
    // 現在のページのヘッダー要素を特定
    function getCurrentHeader() {
        if (ThBox) return ThBox;
        if (NwBox) return NwBox;
        if (WoBox) return WoBox;
        if (PrBox) return PrBox;
        if (GaBox) return GaBox;
        if (FaBox) return FaBox;
        return null;
    }
    
    // スクロール位置に応じてハンバーガーメニューボタンの位置を調整
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const currentHeader = getCurrentHeader();
        const headerHeight = currentHeader ? currentHeader.offsetHeight : 100; // ヘッダーの高さを取得（存在しない場合は100pxと仮定）
        
        // ヘッダーが画面外から完全に消えた時に切り替え
        if (scrollPosition >= headerHeight) {
            openBtnPC.classList.add('scrolled');
        } else {
            openBtnPC.classList.remove('scrolled');
        }
    });
    
    // ページ読み込み時にスクロール位置をチェック
    window.addEventListener('load', function() {
        const scrollPosition = window.scrollY;
        const currentHeader = getCurrentHeader();
        const headerHeight = currentHeader ? currentHeader.offsetHeight : 100;
        
        if (scrollPosition >= headerHeight) {
            openBtnPC.classList.add('scrolled');
        } else {
            openBtnPC.classList.remove('scrolled');
        }
    });
    
    //NemuOpen
    openBtnPC.addEventListener('click', () => {
        openBtnPC.classList.toggle('active');
        navPcActive.classList.toggle('active');
        overlay.classList.add('active');
    });
    //NemuClose
    closeBtnPC.addEventListener('click', () => {
        openBtnPC.classList.toggle('active');
        navPcActive.classList.toggle('active');
        overlay.classList.remove('active');
    });
    // オーバーレイをクリックしても閉じられるように
    overlay.addEventListener('click', () => {
        openBtnPC.classList.remove('active');
        navPcActive.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// ハンバーガーメニューの開閉
document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.querySelector('.hbg-btn-open');
    const closeBtn = document.querySelector('.hbg-btn-close');
    const nav = document.querySelector('.nav-pc');
    // オーバーレイ要素の参照を削除

    // メニューを開く
    openBtn.addEventListener('click', function() {
        nav.classList.add('active');
        overlay.classList.add('active');
    });

    // メニューを閉じる
    closeBtn.addEventListener('click', function() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
    });

    // オーバーレイクリック時のメニュー閉じる処理を削除
});

// 共通要素を生成する関数
function generateCommonElements() {
    return new Promise((resolve) => {
        // ナビゲーション要素の生成
        const navBox = document.querySelector('.nav-pc-box');
        const navHTML = `
            <div class="nav-pc-title">
                <h1>Hitomi Nunokawa<h1>
                <h2>OfficialWebsite</h2>
            </div>
            <div class="nav-pc-link">
                <a class="nav-pc-link-btn" href="index.html">Top</a>
                <a class="nav-pc-link-btn" href="news.html">News</a>
                <a class="nav-pc-link-btn" href="works.html">Works</a>
                <a class="nav-pc-link-btn" href="profile.html">Profile</a>
                <a class="nav-pc-link-btn" href="gallery.html">Gallery</a>
            </div>
            <div class="nav-pc-sns">
                <div class="nav-pc-sns-link">
                    <span>Follow</span>
                    <a href="https://x.com/h_T0m_1103" target="_blank" rel="noopener noreferrer"><img class="sns-logo" src="images/X_logo.png" alt="布川仁美X"></a>
                    <a href="https://www.instagram.com/ppppppppppooo___/?hl=ja" target="_blank" rel="noopener noreferrer"><img class="sns-logo" src="images/Instagram_logo.png" alt="布川仁美Instagram"></a>
                </div>
                <div class="nav-pc-sns-share">
                    <span>Share</span>
                    <a href="https://twitter.com/intent/tweet?text=布川仁美 official website&url=https://hitominunokawa.com/" rel="nofollow noopener" target="_blank"><img class="sns-logo" src="images/X_logo.png" alt="Xでシェア"></a>
                    <a href="http://www.facebook.com/share.php?u=https://hitominunokawa.com/" rel="nofollow noopener" target="_blank"><img class="sns-logo" src="images/Facebook_Logo_Secondary.png" alt="facebookでシェア"></a>
                    <a href="http://line.me/R/msg/text/?https://hitominunokawa.com/" target="_blank" rel="nofollow noopener"><img class="sns-logo" src="images/LINE_logo.png" alt="LINEでシェア"></a>
                </div>
            </div>
        `;
        navBox.innerHTML = navHTML;

        // フッター要素の生成
        const footer = document.querySelector('footer');
        const footerHTML = `
            <nav id="footer-link">
                <a href="index.html">Top</a>
                <a href="news.html">News</a>
                <a href="works.html">Works</a>
                <a href="profile.html">Profile</a>
                <a href="gallery.html">Gallery</a>
            </nav>
            <div id="footer-sns">
                <nav id="sns-link">
                    <span>Follow</span>
                    <a href="https://x.com/h_T0m_1103" target="_blank" rel="noopener noreferrer"><img class="sns-logo" src="images/X_logo.png" alt="布川仁美X"></a>
                    <a href="https://www.instagram.com/ppppppppppooo___/?hl=ja" target="_blank" rel="noopener noreferrer"><img class="sns-logo" src="images/Instagram_logo.png" alt="布川仁美Instagram"></a>
                </nav>
                <nav id="sns-share">
                    <span>Share</span>
                    <a href="https://twitter.com/intent/tweet?text=布川仁美 official website&url=https://hitominunokawa.com/" rel="nofollow noopener" target="_blank"><img class="sns-logo" src="images/X_logo.png" alt="Xでシェア"></a>
                    <a href="http://www.facebook.com/share.php?u=https://hitominunokawa.com/" rel="nofollow noopener" target="_blank"><img class="sns-logo" src="images/Facebook_Logo_Secondary.png" alt="facebookでシェア"></a>
                    <a href="http://line.me/R/msg/text/?https://hitominunokawa.com/" target="_blank" rel="nofollow noopener"><img class="sns-logo" src="images/LINE_logo.png" alt="LINEでシェア"></a>
                </nav>
            </div>
            <span id="footer-name">布川仁美 official</span>
        `;
        footer.innerHTML = footerHTML;

        resolve();
    });
}

// DOMContentLoadedイベントで実行
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 共通要素を生成
        await generateCommonElements();
        
        // ハンバーガーメニューを初期化
        initializeHamburgerMenu();
        
        // その他の初期化処理（必要に応じて）
        // ...
        
    } catch (error) {
        console.error('要素の生成に失敗しました:', error);
    }
});