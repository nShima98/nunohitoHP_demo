// works.jsonからデータを読み込んでworks.htmlに動的に表示し、ページネーション機能も統合したスクリプト

/*! paginathing 2018-01-31 */

!(function (t, a, e) {
  "use strict";
  var i = function (a, e) {
    return (
      (this.el = t(a)),
      (this.options = t.extend({}, t.fn.paginathing.defaults, e)),
      (this.startPage = 1),
      (this.currentPage = this.getSavedPage() || 1), // 保存されたページを取得
      (this.totalItems = this.el.children().length),
      (this.totalPages = Math.max(
        Math.ceil(this.totalItems / this.options.perPage),
        this.options.limitPagination
      )),
      (this.container = t("<nav></nav>").addClass(this.options.containerClass)),
      (this.ul = t("<ul></ul>").addClass(this.options.ulClass)),
      this.show(this.currentPage), // 保存されたページで開始
      this
    );
  };
  (i.prototype = {
    // 保存されたページ番号を取得
    getSavedPage: function () {
      // 他のページから遷移してきた場合は1ページ目から開始
      var referrer = document.referrer;
      var currentPage = window.location.pathname.split('/').pop();
      
      // リファラーが存在し、かつ現在のページと同じでない場合（他のページから遷移）
      if (referrer && !referrer.includes(currentPage)) {
        return 1;
      }
      
      // 同じページからのリロードの場合は保存されたページを取得
      // URLハッシュからページ番号を取得
      var hash = window.location.hash;
      if (hash && hash.match(/#page-(\d+)/)) {
        return parseInt(hash.match(/#page-(\d+)/)[1]);
      }
      
      // ローカルストレージからページ番号を取得
      var savedPage = localStorage.getItem('worksCurrentPage');
      if (savedPage) {
        return parseInt(savedPage);
      }
      
      return 1;
    },
    
    // ページ番号を保存
    savePage: function (pageNum) {
      // URLハッシュに保存
      window.location.hash = '#page-' + pageNum;
      
      // ローカルストレージにも保存
      localStorage.setItem('worksCurrentPage', pageNum.toString());
    },
    
    pagination: function (a, e) {
      var i = this,
        n = t("<li></li>"),
        s = t("<a></a>").attr("href", "#"),
        r = "number" === a ? i.options.liClass : a,
        o = "";
      return (
        (o =
          "number" === a
            ? e
            : "pageNumbers" === a
            ? i.paginationNumbersText()
            : i.paginationText(a)),
        n.addClass(r),
        n.data("pagination-type", a),
        n.data("page", e),
        n.append(s.html(o)),
        n
      );
    },
    // 省略記号用のページネーション要素を作成
    paginationEllipsis: function () {
      var i = this,
        n = t("<li></li>"),
        s = t("<span></span>");
      return (
        n.addClass("ellipsis"),
        n.append(s.html("...")),
        n
      );
    },
    paginationText: function (t) {
      return this.options[t + "Text"];
    },
    paginationNumbersText: function () {
      return "Page " + this.currentPage + "/" + this.totalPages;
    },
    buildPagination: function () {
      var t,
        a,
        e = this,
        i = [],
        n = e.currentPage - 1 < e.startPage ? e.startPage : e.currentPage - 1,
        s = e.currentPage + 1 > e.totalPages ? e.totalPages : e.currentPage + 1,
        r = e.options.limitPagination;
      
      // 省略記号を表示するかどうかの判定
      var showEllipsis = e.totalPages > 7; // 7ページ以上で省略記号を表示
      
      if (showEllipsis) {
        // 省略記号付きのページネーション
        if (e.currentPage <= 4) {
          // 現在のページが前半の場合
          for (var o = 1; o <= 5; o++) {
            i.push(e.pagination("number", o));
          }
          if (e.totalPages > 5) {
            i.push(e.paginationEllipsis());
            i.push(e.pagination("number", e.totalPages));
          }
        } else if (e.currentPage >= e.totalPages - 3) {
          // 現在のページが後半の場合
          i.push(e.pagination("number", 1));
          i.push(e.paginationEllipsis());
          for (var o = e.totalPages - 4; o <= e.totalPages; o++) {
            i.push(e.pagination("number", o));
          }
        } else {
          // 現在のページが中央の場合
          i.push(e.pagination("number", 1));
          i.push(e.paginationEllipsis());
          for (var o = e.currentPage - 1; o <= e.currentPage + 1; o++) {
            i.push(e.pagination("number", o));
          }
          i.push(e.paginationEllipsis());
          i.push(e.pagination("number", e.totalPages));
        }
      } else {
        // 通常のページネーション（省略記号なし）
        r
          ? e.currentPage <= Math.ceil(r / 2) + 1
            ? ((t = 1), (a = r))
            : e.currentPage + Math.floor(r / 2) >= e.totalPages
            ? ((t = e.totalPages + 1 - r), (a = e.totalPages))
            : ((t = e.currentPage - Math.ceil(r / 2)),
              (a = e.currentPage + Math.floor(r / 2)))
          : ((t = e.startPage), (a = e.totalPages));
        
        for (var o = t; o <= a; o++) i.push(e.pagination("number", o));
      }
      
      // 前後ボタンと最初・最後ボタンを追加
      e.options.prevNext && i.unshift(e.pagination("prev", n));
      e.options.firstLast && i.unshift(e.pagination("first", e.startPage));
      e.options.prevNext && i.push(e.pagination("next", s));
      e.options.firstLast && i.push(e.pagination("last", e.totalPages));
      e.options.pageNumbers &&
        i.push(e.pagination("pageNumbers", e.currentPage));
      
      return i;
    },
    render: function (a) {
      var e = this,
        i = e.options,
        n = e.buildPagination();
      e.ul.children().remove(), e.ul.append(n);
      var s = 1 === a ? 0 : (a - 1) * i.perPage,
        r = a * i.perPage;
      e.el.children().hide(),
        e.el.children().slice(s, r).show(),
        e.ul.children().each(function () {
          var n = t(this);
          switch (n.data("pagination-type")) {
            case "number":
              n.data("page") === a && n.addClass(i.activeClass);
              break;
            case "first":
              a === e.startPage && n.toggleClass(i.disabledClass);
              break;
            case "last":
              a === e.totalPages && n.toggleClass(i.disabledClass);
              break;
            case "prev":
              a - 1 < e.startPage && n.toggleClass(i.disabledClass);
              break;
            case "next":
              a + 1 > e.totalPages && n.toggleClass(i.disabledClass);
          }
        }),
        i.insertAfter
          ? e.container.append(e.ul).insertAfter(t(i.insertAfter))
          : e.el.after(e.container.append(e.ul));
    },
    handle: function () {
      var a = this;
      a.container.find("li").each(function () {
        var e = t(this);
        // 省略記号はクリック不可
        if (e.hasClass("ellipsis")) {
          return;
        }
        e.click(function (t) {
          t.preventDefault();
          var i = e.data("page");
          a.currentPage = i;
          a.show(i);
          
          // ページ番号を保存
          a.savePage(i);
    
          // ページの上部に即座に移動する処理
          window.scrollTo(0, 0);  // 即座にスクロールを実行
        });
      });
    },
    show: function (t) {
      this.render(t), this.handle();
    },
  }),
    (t.fn.paginathing = function (t) {
      return this.each(function () {
        return new i(this, t);
      });
    }),
    (t.fn.paginathing.defaults = {
      perPage: 10,
      limitPagination: !1,
      prevNext: !0,
      firstLast: !0,
      prevText: "&laquo;",
      nextText: "&raquo;",
      firstText: "First",
      lastText: "Last",
      containerClass: "pagination-container",
      ulClass: "pagination",
      liClass: "page",
      activeClass: "active",
      disabledClass: "disabled",
      insertAfter: null,
      pageNumbers: !1,
    });

    // works.jsonからデータを読み込んでworks.htmlに動的に表示する処理
    $(document).ready(function() {
        // works.jsonからデータを読み込む
        $.getJSON('Data/works.json', function(works) {
            // 既存のworks-boxの内容をクリア
            $('.works-box').empty();
            
            // ページネーション設定
            var perPage = 9;
            var totalPages = Math.ceil(works.length / perPage);
            
            // 現在のページを取得
            var currentPage = getCurrentPage(works.length, perPage);
            
            // 表示するページのデータのみを取得
            var startIndex = (currentPage - 1) * perPage;
            var endIndex = startIndex + perPage;
            var currentPageWorks = works.slice(startIndex, endIndex);
            
            // 現在のページの作品データのみをHTMLに変換
            currentPageWorks.forEach(function(work) {
                var workHtml = createWorkHtml(work);
                $('.works-box').append(workHtml);
            });
            
            // ページネーションボタンを生成
            generatePaginationButtons(currentPage, totalPages);
            
            // 初回アクセス時にハッシュを設定
            if (!window.location.hash) {
                window.location.hash = '#page-1';
            }
            
        }).fail(function() {
            console.error('works.jsonの読み込みに失敗しました');
            // エラー時のフォールバック表示
            $('.works-box').html('<li class="works-container"><p>作品データの読み込みに失敗しました。</p></li>');
        });
    });
    
    // 現在のページを取得する関数
    function getCurrentPage(totalItems, perPage) {
        // 他のページから遷移してきた場合は1ページ目から開始
        var referrer = document.referrer;
        var currentPage = window.location.pathname.split('/').pop();
        
        // リファラーが存在し、かつ現在のページと同じでない場合（他のページから遷移）
        if (referrer && !referrer.includes(currentPage)) {
            return 1;
        }
        
        // 同じページからのリロードの場合は保存されたページを取得
        // URLハッシュからページ番号を取得
        var hash = window.location.hash;
        if (hash && hash.match(/#page-(\d+)/)) {
            var pageNum = parseInt(hash.match(/#page-(\d+)/)[1]);
            var totalPages = Math.ceil(totalItems / perPage);
            return Math.min(pageNum, totalPages); // 最大ページ数を超えないように
        }
        
        // ローカルストレージからページ番号を取得
        var savedPage = localStorage.getItem('worksCurrentPage');
        if (savedPage) {
            var pageNum = parseInt(savedPage);
            var totalPages = Math.ceil(totalItems / perPage);
            return Math.min(pageNum, totalPages); // 最大ページ数を超えないように
        }
        
        return 1;
    }
    
    // ページネーションボタンを生成する関数
    function generatePaginationButtons(currentPage, totalPages) {
        if (totalPages <= 1) return; // 1ページ以下の場合はページネーションを表示しない
        
        var paginationHtml = '<nav class="pagination-container"><ul class="pagination">';
        
        // 最初ページボタン
        if (currentPage > 1) {
            paginationHtml += '<li class="first"><a href="#" data-page="1"><i class="fas fa-angle-double-left"></i></a></li>';
        }
        
        // ページ番号ボタン
        var showEllipsis = totalPages > 7;
        
        if (showEllipsis) {
            // 省略記号付きのページネーション
            if (currentPage <= 4) {
                // 現在のページが前半の場合
                for (var i = 1; i <= 5; i++) {
                    var activeClass = (i === currentPage) ? ' navi-active' : '';
                    paginationHtml += '<li class="page' + activeClass + '"><a href="#" data-page="' + i + '">' + i + '</a></li>';
                }
                if (totalPages > 5) {
                    paginationHtml += '<li class="ellipsis"><span>...</span></li>';
                    paginationHtml += '<li class="page"><a href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
                }
            } else if (currentPage >= totalPages - 3) {
                // 現在のページが後半の場合
                paginationHtml += '<li class="page"><a href="#" data-page="1">1</a></li>';
                paginationHtml += '<li class="ellipsis"><span>...</span></li>';
                for (var i = totalPages - 4; i <= totalPages; i++) {
                    var activeClass = (i === currentPage) ? ' navi-active' : '';
                    paginationHtml += '<li class="page' + activeClass + '"><a href="#" data-page="' + i + '">' + i + '</a></li>';
                }
            } else {
                // 現在のページが中央の場合
                paginationHtml += '<li class="page"><a href="#" data-page="1">1</a></li>';
                paginationHtml += '<li class="ellipsis"><span>...</span></li>';
                for (var i = currentPage - 1; i <= currentPage + 1; i++) {
                    var activeClass = (i === currentPage) ? ' navi-active' : '';
                    paginationHtml += '<li class="page' + activeClass + '"><a href="#" data-page="' + i + '">' + i + '</a></li>';
                }
                paginationHtml += '<li class="ellipsis"><span>...</span></li>';
                paginationHtml += '<li class="page"><a href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
            }
        } else {
            // 通常のページネーション（省略記号なし）
            for (var i = 1; i <= totalPages; i++) {
                var activeClass = (i === currentPage) ? ' navi-active' : '';
                paginationHtml += '<li class="page' + activeClass + '"><a href="#" data-page="' + i + '">' + i + '</a></li>';
            }
        }
        
        // 最後ページボタン
        if (currentPage < totalPages) {
            paginationHtml += '<li class="last"><a href="#" data-page="' + totalPages + '"><i class="fas fa-angle-double-right"></i></a></li>';
        }
        
        paginationHtml += '</ul>';
        
        // ページ入力フィールドを追加
        paginationHtml += '<div class="page-input-container">';
        paginationHtml += '<div class="page-input-wrapper">';
        paginationHtml += '<input type="number" id="pageInput" class="page-input" min="1" max="' + totalPages + '" value="' + currentPage + '">';
        paginationHtml += '<span class="page-total">/' + totalPages + '</span>';
        paginationHtml += '</div>';
        paginationHtml += '<button type="button" id="goToPageBtn" class="go-to-page-btn">移動</button>';
        paginationHtml += '</div>';
        
        paginationHtml += '</nav>';
        
        // ページネーションを追加
        $('.works-box').after(paginationHtml);
        
        // ページネーションボタンのクリックイベントを設定
        $('.pagination a').click(function(e) {
            e.preventDefault();
            var pageNum = parseInt($(this).data('page'));
            loadPage(pageNum);
        });
        
        // ページ入力フィールドのイベントハンドラーを設定
        $('#goToPageBtn').click(function() {
            var inputPage = parseInt($('#pageInput').val());
            
            // 入力値の検証
            if (isNaN(inputPage) || inputPage < 1 || inputPage > totalPages) {
                alert('1から' + totalPages + 'の範囲でページ番号を入力してください。');
                $('#pageInput').val(currentPage); // 現在のページに戻す
                return;
            }
            
            loadPage(inputPage);
        });
        
        // Enterキーでもページ移動できるようにする
        $('#pageInput').keypress(function(e) {
            if (e.which === 13) { // Enterキー
                $('#goToPageBtn').click();
            }
        });
        
        // 入力値が変更されたときにリアルタイムで検証
        $('#pageInput').on('input', function() {
            var inputPage = parseInt($(this).val());
            
            if (inputPage > totalPages) {
                $(this).val(totalPages);
            } else if (inputPage < 1 && $(this).val() !== '') {
                $(this).val(1);
            }
        });
    }
    
    // 指定されたページを読み込む関数
    function loadPage(pageNum) {
        // URLハッシュに保存
        window.location.hash = '#page-' + pageNum;
        
        // ローカルストレージにも保存
        localStorage.setItem('worksCurrentPage', pageNum.toString());
        
        // ページの上部に移動
        window.scrollTo(0, 0);
        
        // ページを再読み込み
        window.location.reload();
    }
    
    // ブラウザバック/フォワード時の処理
    $(window).on('hashchange', function() {
        var hash = window.location.hash;
        if (hash && hash.match(/#page-(\d+)/)) {
            var pageNum = parseInt(hash.match(/#page-(\d+)/)[1]);
            // ページを再読み込みして状態を同期
            window.location.reload();
        }
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
      
})(jQuery, window, document);
