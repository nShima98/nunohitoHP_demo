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

// ナビゲーション要素を生成する関数
function generateNavigation() {
    const navPcBox = document.querySelector('.nav-pc-box');
    if (!navPcBox) return;

    // タイトル部分の生成
    const titleHTML = `
        <div class="nav-pc-title">
            <h1>Hitomi Nunokawa</h1>
            <h2>OfficialWebsite</h2>
        </div>
    `;

    // ナビゲーションリンクの生成
    const navLinks = [
        { href: 'index.html', text: 'Top' },
        { href: 'news.html', text: 'News' },
        { href: 'works.html', text: 'Works' },
        { href: 'profile.html', text: 'Profile' },
        { href: 'gallery.html', text: 'Gallery' }
    ];

    const navLinksHTML = `
        <div class="nav-pc-link">
            ${navLinks.map(link => `
                <a class="nav-pc-link-btn" href="${link.href}">${link.text}</a>
            `).join('')}
        </div>
    `;

    // SNSセクションの生成
    const snsHTML = `
        <div class="nav-pc-sns">
            <div class="nav-pc-sns-link">
                <span>Follow</span>
                <a href="https://x.com/h_T0m_1103" target="_blank" rel="noopener noreferrer">
                    <img class="sns-logo" src="images/X_logo.png" alt="布川仁美X">
                </a>
                <a href="https://www.instagram.com/ppppppppppooo___/?hl=ja" target="_blank" rel="noopener noreferrer">
                    <img class="sns-logo" src="images/Instagram_logo.png" alt="布川仁美Instagram">
                </a>
            </div>
            <div class="nav-pc-sns-share">
                <span>Share</span>
                <a href="https://twitter.com/intent/tweet?text=布川仁美 official website&url=https://nshima98.github.io/HitomiHP2/" rel="nofollow noopener" target="_blank">
                    <img class="sns-logo" src="images/X_logo.png" alt="Xでシェア">
                </a>
                <a href="http://www.facebook.com/share.php?u=https://nshima98.github.io/HitomiHP2/" rel="nofollow noopener" target="_blank">
                    <img class="sns-logo" src="images/Facebook_Logo_Secondary.png" alt="facebookでシェア">
                </a>
                <a href="http://line.me/R/msg/text/?https://nshima98.github.io/HitomiHP2/" target="_blank" rel="nofollow noopener">
                    <img class="sns-logo" src="images/LINE_logo.png" alt="LINEでシェア">
                </a>
            </div>
        </div>
    `;

    // 全要素の挿入
    navPcBox.innerHTML = titleHTML + navLinksHTML + snsHTML;
}

// ハンバーガーメニューの機能を初期化する関数
function initializeHamburgerMenu() {
    const hamburgerOpen = document.querySelector('.hbg-btn-open');
    const hamburgerClose = document.querySelector('.hbg-btn-close');
    const nav = document.querySelector('.nav-pc');
    const overlay = document.querySelector('.overlay');

    if (!hamburgerOpen || !hamburgerClose || !nav || !overlay) return;

    hamburgerOpen.addEventListener('click', () => {
        nav.classList.add('active');
        overlay.classList.add('active');
    });

    hamburgerClose.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
    });
}

// フッター要素を生成する関数
function generateFooter() {
    const footer = document.querySelector('footer');
    
    // フッターの内容を生成
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
                <a href="https://twitter.com/intent/tweet?text=布川仁美 official website&url=https://nshima98.github.io/HitomiHP2/" rel="nofollow noopener" target="_blank"><img class="sns-logo" src="images/X_logo.png" alt="Xでシェア"></a>
                <a href="http://www.facebook.com/share.php?u=https://nshima98.github.io/HitomiHP2/" rel="nofollow noopener" target="_blank"><img class="sns-logo" src="images/Facebook_Logo_Secondary.png" alt="facebookでシェア"></a>
                <a href="http://line.me/R/msg/text/?https://nshima98.github.io/HitomiHP2/" target="_blank" rel="nofollow noopener"><img class="sns-logo" src="images/LINE_logo.png" alt="LINEでシェア"></a>
            </nav>
        </div>
        <span id="footer-name">布川仁美 official</span>
    `;
    
    footer.innerHTML = footerHTML;
}

// DOMContentLoadedイベントで実行
document.addEventListener('DOMContentLoaded', () => {
    // 1. まずナビゲーション要素を生成
    generateNavigation()
        .then(() => {
            // 2. フッター要素を生成
            generateFooter();
            // 3. ハンバーガーメニューを初期化
            initializeHamburgerMenu();
        })
        .catch(error => {
            console.error('ナビゲーションの生成に失敗しました:', error);
        });
});