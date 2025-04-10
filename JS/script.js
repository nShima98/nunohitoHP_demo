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