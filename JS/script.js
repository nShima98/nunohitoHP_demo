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

// Footerの生成
function createFooter() {
    const footer = document.getElementById('footer');
    
    // ナビゲーションリンク
    const navLinks = document.createElement('nav');
    navLinks.id = 'footer-link';
    
    const links = [
        { href: 'index.html', text: 'Top' },
        { href: 'news.html', text: 'News' },
        { href: 'works.html', text: 'Works' },
        { href: 'profile.html', text: 'Profile' },
        { href: 'gallery.html', text: 'Gallery' }
    ];
    
    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        navLinks.appendChild(a);
    });
    
    // SNSリンク
    const footerSns = document.createElement('div');
    footerSns.id = 'footer-sns';
    
    // Followリンク
    const snsLink = document.createElement('nav');
    snsLink.id = 'sns-link';
    
    const followSpan = document.createElement('span');
    followSpan.textContent = 'Follow';
    snsLink.appendChild(followSpan);
    
    const followLinks = [
        { href: 'https://x.com/h_T0m_1103', src: 'images/X_logo.png', alt: '布川仁美X' },
        { href: 'https://www.instagram.com/ppppppppppooo___/?hl=ja', src: 'images/Instagram_logo.png', alt: '布川仁美Instagram' }
    ];
    
    followLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        
        const img = document.createElement('img');
        img.className = 'sns-logo';
        img.src = link.src;
        img.alt = link.alt;
        
        a.appendChild(img);
        snsLink.appendChild(a);
    });
    
    // Shareリンク
    const snsShare = document.createElement('nav');
    snsShare.id = 'sns-share';
    
    const shareSpan = document.createElement('span');
    shareSpan.textContent = 'Share';
    snsShare.appendChild(shareSpan);
    
    const shareLinks = [
        { href: 'https://twitter.com/intent/tweet?text=布川仁美 official website&url=https://nshima98.github.io/HitomiHP2/', src: 'images/X_logo.png', alt: 'Xでシェア' },
        { href: 'http://www.facebook.com/share.php?u=https://nshima98.github.io/HitomiHP2/', src: 'images/Facebook_Logo_Secondary.png', alt: 'facebookでシェア' },
        { href: 'http://line.me/R/msg/text/?https://nshima98.github.io/HitomiHP2/', src: 'images/LINE_logo.png', alt: 'LINEでシェア' }
    ];
    
    shareLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.rel = 'nofollow noopener';
        
        const img = document.createElement('img');
        img.className = 'sns-logo';
        img.src = link.src;
        img.alt = link.alt;
        
        a.appendChild(img);
        snsShare.appendChild(a);
    });
    
    // フッター名
    const footerName = document.createElement('span');
    footerName.id = 'footer-name';
    footerName.textContent = '布川仁美 official';
    
    // 要素の組み立て
    footerSns.appendChild(snsLink);
    footerSns.appendChild(snsShare);
    
    footer.appendChild(navLinks);
    footer.appendChild(footerSns);
    footer.appendChild(footerName);
}

// ページ読み込み時にフッターを生成
document.addEventListener('DOMContentLoaded', createFooter);

// ナビゲーションメニューの生成
function createNavPcBox() {
    const navPcBox = document.querySelector('.nav-pc-box');
    
    // タイトル部分
    const navPcTitle = document.createElement('div');
    navPcTitle.className = 'nav-pc-title';
    
    const h1 = document.createElement('h1');
    h1.textContent = 'Hitomi Nunokawa';
    
    const h2 = document.createElement('h2');
    h2.textContent = 'OfficialWebsite';
    
    navPcTitle.appendChild(h1);
    navPcTitle.appendChild(h2);
    
    // ナビゲーションリンク
    const navPcLink = document.createElement('div');
    navPcLink.className = 'nav-pc-link';
    
    const links = [
        { href: 'index.html', text: 'Top' },
        { href: 'news.html', text: 'News' },
        { href: 'works.html', text: 'Works' },
        { href: 'profile.html', text: 'Profile' },
        { href: 'gallery.html', text: 'Gallery' }
    ];
    
    links.forEach(link => {
        const a = document.createElement('a');
        a.className = 'nav-pc-link-btn';
        a.href = link.href;
        a.textContent = link.text;
        navPcLink.appendChild(a);
    });
    
    // SNSリンク
    const navPcSns = document.createElement('div');
    navPcSns.className = 'nav-pc-sns';
    
    // Followリンク
    const snsLink = document.createElement('div');
    snsLink.className = 'nav-pc-sns-link';
    
    const followSpan = document.createElement('span');
    followSpan.textContent = 'Follow';
    snsLink.appendChild(followSpan);
    
    const followLinks = [
        { href: 'https://x.com/h_T0m_1103', src: 'images/X_logo.png', alt: '布川仁美X' },
        { href: 'https://www.instagram.com/ppppppppppooo___/?hl=ja', src: 'images/Instagram_logo.png', alt: '布川仁美Instagram' }
    ];
    
    followLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        
        const img = document.createElement('img');
        img.className = 'sns-logo';
        img.src = link.src;
        img.alt = link.alt;
        
        a.appendChild(img);
        snsLink.appendChild(a);
    });
    
    // Shareリンク
    const snsShare = document.createElement('div');
    snsShare.className = 'nav-pc-sns-share';
    
    const shareSpan = document.createElement('span');
    shareSpan.textContent = 'Share';
    snsShare.appendChild(shareSpan);
    
    const shareLinks = [
        { href: 'https://twitter.com/intent/tweet?text=布川仁美 official website&url=https://nshima98.github.io/HitomiHP2/', src: 'images/X_logo.png', alt: 'Xでシェア' },
        { href: 'http://www.facebook.com/share.php?u=https://nshima98.github.io/HitomiHP2/', src: 'images/Facebook_Logo_Secondary.png', alt: 'facebookでシェア' },
        { href: 'http://line.me/R/msg/text/?https://nshima98.github.io/HitomiHP2/', src: 'images/LINE_logo.png', alt: 'LINEでシェア' }
    ];
    
    shareLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.rel = 'nofollow noopener';
        
        const img = document.createElement('img');
        img.className = 'sns-logo';
        img.src = link.src;
        img.alt = link.alt;
        
        a.appendChild(img);
        snsShare.appendChild(a);
    });
    
    // 要素の組み立て
    navPcSns.appendChild(snsLink);
    navPcSns.appendChild(snsShare);
    
    navPcBox.appendChild(navPcTitle);
    navPcBox.appendChild(navPcLink);
    navPcBox.appendChild(navPcSns);
}

// ページ読み込み時にナビゲーションメニューを生成
document.addEventListener('DOMContentLoaded', createNavPcBox);