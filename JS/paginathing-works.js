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
      // セッションストレージを使ってページの初回訪問かどうかを判定
      var sessionKey = 'worksPageVisited';
      var isFirstVisit = !sessionStorage.getItem(sessionKey);
      
      // 初回訪問（他のページから遷移）の場合は1ページ目から開始
      if (isFirstVisit) {
        sessionStorage.setItem(sessionKey, 'true');
        return 1;
      }
      
      // 同じページ内でのリロードの場合は保存されたページを取得
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

    $(function() {
      $('.works-box').paginathing({
      perPage: 12,
      prevNext: false,
      activeClass: 'navi-active',
      firstText: '<i class="fas fa-angle-double-left"></i>', // "最初ページ"に移動するボタンのテキスト
      lastText: '<i class="fas fa-angle-double-right"></i>', // "最後のページ"に移動するボタンのテキスト

      })
      });
      
})(jQuery, window, document);
