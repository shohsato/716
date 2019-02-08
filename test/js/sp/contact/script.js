jQuery(function ($) {
	"use strict";
	/* 見出しに下線 */
	$('.ttl-section').wrapInner('<span class="section-word"></span>');

	/* ページアンカースクロール */
	$(".scroll-a").click(function () {
		$('html,body').animate({ scrollTop: $($(this).attr("href")).offset().top }, 'slow', 'swing');
		return false;
	});

	/* ページトップボタン表示・非表示 */
	var pageTopBtn = $('.btn-pagetop');
	$(window).scroll(function () {
		var docHeight = $(document).height();
		var scrollPosition = $(window).height() + $(window).scrollTop() + 100;
		if ($(this).scrollTop() > 400 && docHeight > scrollPosition) { // ページ上部から400px以下からページ最下部以上
			$(pageTopBtn).stop().animate({'bottom':'10px'}, 200);
		} else if(docHeight < scrollPosition) { // ページ最下部到達
			if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)) { // モバイルの場合
				$(pageTopBtn).stop().animate({'bottom':'-100px'}, 200);
			} else {
				$(pageTopBtn).stop().animate({'bottom':'10px'}, 200);
			}
		} else {
			$(pageTopBtn).stop().animate({'bottom':'-100px'}, 200);
		}
	});

	/* モーダルウィンドウ */
	$(".btn-ybox-open").click(function () {
		$(this).blur(); //ボタンからフォーカスを外す
		var bodyHeight = document.body.clientHeight; // ページの高さを取得
		$('<div class="ybox-overlay"></div>').prependTo("body").hide().fadeIn(300); // オーバーレイを生成
		$('<div class="ybox-container"><div class="ybox-content"></div><a href="javascript:;" class="ybox-close">×</a></div>').prependTo("body").hide().fadeIn(300); // ポップアップウィンドウを生成
		$(".ybox-overlay").css("height", bodyHeight); // オーバーレイの高さをウィンドウの高さに設定

		//表示するコンテンツを取得
		var targetContent = $(this).attr("href");
		if (targetContent.match(/.png|.gif|.jpg/i)) { //画像の場合
			$(".ybox-content").html('<img src="' + targetContent + '">');
		} else if (targetContent.match(/.html|http:\/\//i)) { //htmlの場合
			$(".ybox-content").html('<iframe src="' + targetContent + '"></iframe>');
		} else { //その他
			$(".ybox-content").html($(targetContent).html());
		}

		$(".ybox-content").css("height", $(".ybox-container").innerHeight()); // コンテンツボックスの高さ設定

		marginAdjust();

		// センタリング調整
		function marginAdjust() {
			var winbowHeight = $(window).height(); // ウィンドウの高さを取得
			var winbowWidth = $(window).width(); // ウィンドウの幅を取得
			var containerHeight = $(".ybox-container").outerHeight(true); // ポップアップウィンドウの高さを取得
			var containerWidth = $(".ybox-container").outerWidth(true); // ポップアップウィンドウの幅を取得
			var pxTop = ((winbowHeight - containerHeight) / 2);
			var pxLeft = ((winbowWidth - containerWidth) / 2);
			$(".ybox-container").css({
				"top": pxTop + "px",
				"left": pxLeft + "px"
			});
		}

		// 閉じる動作
		$(".ybox-overlay, .ybox-close, .ybox-close-func").click(function () {
			$(".ybox-overlay,.ybox-container").fadeOut(300,
				function () {
					$(".ybox-overlay, .ybox-container").remove();
				}
			);
		});
		$(window).resize(function () {
			marginAdjust();
		});
		return false;
	});

	// グローバルナビをタブレットで閉じられるようにする
	$('.global-nav-list').on('click', function () {
		var bodyHeight = document.body.clientHeight; // ページの高さを取得
		$('<div class="close-overlay"></div>').prependTo('body').show(); // オーバーレイを生成
		$('.close-overlay').css({'height':bodyHeight, 'position': 'absolute', width: '100%', 'background': 'transparent', 'z-index': '100'}); // オーバーレイの高さをウィンドウの高さとstyleの設定
		$(this).children('.extend-global-nav').show();
		$('.close-overlay').on('click', function(){
			assistantBoxHide();
		});
		function assistantBoxHide() {
			$('.extend-global-nav').hide();
			$('.close-overlay').remove();
		}
	});

	/* スライド切り替え */
	$("#nextButton1").click(function () {
		// 1画面目へ切り替え
		$("#step1").hide();
		$("#step2").animate({ opacity: "show" }, "slow");
		$('html,body').animate({ scrollTop: 0 }, 100);
	});

	$("#backButton1").click(function () {
		// 1画面目へ切り替え
		$("#step2").hide();
		$("#step1").animate({ opacity: "show" }, "slow");
		$('html,body').animate({ scrollTop: $($('#first-step')).offset().top + 10 }, 100);
	});
});