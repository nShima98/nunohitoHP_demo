document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('customVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');
    const thumbnailOverlay = document.querySelector('.video-thumbnail-overlay');
    const playButtonOverlay = document.querySelector('.play-button-overlay');
    const progressFill = document.querySelector('.progress-fill');
    const progressHandle = document.querySelector('.progress-handle');
    const progressContainer = document.querySelector('.progress-container');

    let isDragging = false;

    // 時間をフォーマットする関数
    function formatTime(seconds) {
        if (isNaN(seconds) || !isFinite(seconds)) {
            return '0:00';
        }
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // 時間表示を更新する関数
    function updateTimeDisplay() {
        currentTimeDisplay.textContent = formatTime(video.currentTime);
        totalTimeDisplay.textContent = formatTime(video.duration);
    }

    // サムネイル表示制御関数
    function showThumbnail() {
        if (thumbnailOverlay) {
            thumbnailOverlay.classList.remove('hidden');
        }
    }

    function hideThumbnail() {
        if (thumbnailOverlay) {
            thumbnailOverlay.classList.add('hidden');
        }
    }

    // 音量レベルに応じた視覚的フィードバック
    function updateVolumeVisual() {
        const volume = video.muted ? 0 : video.volume;
        const percentage = Math.round(volume * 100);
        
        // 既存のクラスを削除
        volumeSlider.classList.remove('volume-muted', 'volume-low', 'volume-medium', 'volume-high');
        
        // CSS変数を更新
        volumeSlider.style.setProperty('--volume-percentage', percentage + '%');
        
        // 音量レベルに応じたクラスを追加
        if (video.muted || volume === 0) {
            volumeSlider.classList.add('volume-muted');
        } else if (volume <= 0.3) {
            volumeSlider.classList.add('volume-low');
        } else if (volume <= 0.7) {
            volumeSlider.classList.add('volume-medium');
        } else {
            volumeSlider.classList.add('volume-high');
        }
    }

    // サムネイルの再生ボタンクリック
    if (playButtonOverlay) {
        playButtonOverlay.addEventListener('click', function() {
            video.play();
            playPauseBtn.textContent = '⏸';
            hideThumbnail();
        });
    }

    // 再生/一時停止
    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸';
            hideThumbnail();
        } else {
            video.pause();
            playPauseBtn.textContent = '▶';
        }
    });

    // 動画クリックで再生/一時停止
    video.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸';
            hideThumbnail();
        } else {
            video.pause();
            playPauseBtn.textContent = '▶';
        }
    });

    // ミュート切り替え
    muteBtn.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteBtn.textContent = '🔊';
            volumeSlider.value = video.volume;
            updateVolumeVisual();
        } else {
            video.muted = true;
            muteBtn.textContent = '🔇';
            updateVolumeVisual();
        }
    });

    // 音量調整
    volumeSlider.addEventListener('input', function() {
        video.volume = parseFloat(this.value);
        updateVolumeVisual();
        if (video.volume > 0) {
            video.muted = false;
            muteBtn.textContent = '🔊';
        } else {
            video.muted = true;
            muteBtn.textContent = '🔇';
        }
    });

    // 音量スライダーをミュートボタンと連動
    video.addEventListener('volumechange', function() {
        if (!video.muted) {
            volumeSlider.value = video.volume;
        }
        updateVolumeVisual();
    });

    // 全画面切り替え
    fullscreenBtn.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            video.requestFullscreen().catch(err => {
                console.log('全画面モードにできませんでした:', err);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // 進捗バー更新
    video.addEventListener('timeupdate', function() {
        if (!isDragging) {
            const progress = (video.currentTime / video.duration) * 100;
            progressFill.style.width = progress + '%';
            progressHandle.style.left = progress + '%';
        }
        updateTimeDisplay();
    });

    // シークバークリック
    progressContainer.addEventListener('click', function(e) {
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * video.duration;
        video.currentTime = newTime;
    });

    // ドラッグ開始
    progressHandle.addEventListener('mousedown', function(e) {
        isDragging = true;
        e.preventDefault();
    });

    // ドラッグ中
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(1, clickX / rect.width));
            const newTime = percentage * video.duration;
            video.currentTime = newTime;
        }
    });

    // ドラッグ終了
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // タッチデバイス対応
    progressHandle.addEventListener('touchstart', function(e) {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            const rect = progressContainer.getBoundingClientRect();
            const touch = e.touches[0];
            const clickX = touch.clientX - rect.left;
            const percentage = Math.max(0, Math.min(1, clickX / rect.width));
            const newTime = percentage * video.duration;
            video.currentTime = newTime;
        }
    });

    document.addEventListener('touchend', function() {
        isDragging = false;
    });

    // 動画のメタデータが読み込まれた時
    video.addEventListener('loadedmetadata', function() {
        updateTimeDisplay();
    });

    // 動画終了時の処理
    video.addEventListener('ended', function() {
        playPauseBtn.textContent = '▶';
        progressFill.style.width = '0%';
        progressHandle.style.left = '0%';
        updateTimeDisplay();
        showThumbnail();
    });

    // 全画面モード変更時の処理
    document.addEventListener('fullscreenchange', function() {
        if (document.fullscreenElement) {
            fullscreenBtn.textContent = '⛶';
        } else {
            fullscreenBtn.textContent = '⛶';
        }
    });

    // 初期化時に音量の視覚的フィードバックと時間表示を設定
    updateVolumeVisual();
    updateTimeDisplay();
});
