jQuery(function ($) {
	"use strict";
	/* 見出しに下線 */
	if(!$('.ttl-section').hasClass('wrap-multiple')) {
		$('.ttl-section').wrapInner('<span class="section-word"></span>');
	} else if($('.ttl-section').hasClass('wrap-multiple')) {
		$('.ttl-section').find('h1,h2,h3,h4,h5,h6').wrapInner('<span class="section-word"></span>');
	}

	/* ページアンカースクロール */
	$(".scroll-a").click(function () {
		$('html,body').animate({ scrollTop: $($(this).attr("href")).offset().top }, 'slow', 'swing');
		return false;
	});

	/* ページトップボタン表示・非表示 */
	var pageTopBtn = $('.btn-pagetop');
	var showFlag = false;
	var pageTopBtnH = pageTopBtn.innerHeight();
	var windowWidth = $(window).width();
	$(window).resize(function() {
		var windowResized = $(window).width();
		if(windowWidth !== windowResized) {
			setTimeout(function(){
				pageTopBtnH = pageTopBtn.innerHeight();
			}, 300);
		}
		windowWidth = $(window).width();
	});
	$(window).scroll(function () {
		if($(pageTopBtn).length){
			var docHeight = $(document).height();
			var scrollPosition = $(window).height() + $(window).scrollTop() + 100;
			if ($(this).scrollTop() > 400 && docHeight > scrollPosition) { // ページ上部から400px以下からページ最下部以上
				if (showFlag == false) {
					showFlag = true;
					$(pageTopBtn).stop().animate({'bottom':'10px'}, 200);
				}
			} else if(docHeight < scrollPosition) { // ページ最下部到達
				if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)) { // モバイルの場合
					if (showFlag) {
						showFlag = false;
						$(pageTopBtn).stop().animate({'bottom': - (pageTopBtnH + 10)}, 200);
					}
				} else {
					if (showFlag == false) {
						showFlag = true;
						$(pageTopBtn).stop().animate({'bottom':'10px'}, 200);
					}
				}
			} else {
				if (showFlag) {
					showFlag = false;
					$(pageTopBtn).stop().animate({'bottom':- (pageTopBtnH + 10)}, 200);
				}
			}
		}
	});

	/* モーダルウィンドウ */
	var scrollPosition;

	$(".btn-ybox-open").click(function () {
		$(this).blur(); //ボタンからフォーカスを外す
		var bodyHeight = document.body.clientHeight; // ページの高さを取得
		$('<div class="ybox-overlay"></div>').prependTo("body").hide().fadeIn(300); // オーバーレイを生成
		$('<div class="ybox-container"><div class="ybox-content"></div><a href="javascript:;" class="ybox-close">×</a></div>').prependTo("body").hide().fadeIn(300); // ポップアップウィンドウを生成
		$(".ybox-overlay").css("height", bodyHeight); // オーバーレイの高さをウィンドウの高さに設定

		scrollPosition = $(window).scrollTop();
		$('body').css({
			'position': 'fixed',
			'top': - scrollPosition,
			'width': '100%',
			'height': '100%'
		});

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
			$(".ybox-content").css("height", $(".ybox-container").innerHeight()); // コンテンツボックスの高さ設定
		}

		// 閉じる動作
		$(".ybox-overlay, .ybox-close, .ybox-close-func").click(function () {
			$('body').attr({style:""});
			window.scrollTo( 0 , scrollPosition );
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

	/* タブ切り替え */
	$('.nav').children(':first-child').addClass('active');
	$('.tab').children().not(':first-child').hide();
	// タブ切替処理
	$('.nav').children().click(function () {
		$(this).next().removeClass("active");
		$(this).prev().removeClass("active");
		$(this).addClass("active");
		$(this).parent().next().children().hide();
		$(this).parent().next().children().eq($(this).parent().children().index(this)).fadeIn();
	});

	/* その他メーカー見る・加盟店口コミを見るの詳細展開など */

	var advancedElement = '.advanced-element';
	var openTxt;
	var closeTxt;

	$(advancedElement).each(function () {
		if($(this).hasClass('advanced-maker-list')) {
			openTxt = 'その他のメーカーを見る';
		} else if ($(this).hasClass('advanced-shop-review')) {
			openTxt = '詳細を見る';
		}
		$(this).hide();
		$(this).after('<p class="advanced-switch"><span class="advanced-link"><span class="ficon-keyboard_arrow_down ico-arrow"></span><span class="switch-txt">' + openTxt + '</span></span></p>');
		if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
			$('.advanced-switch').css({
				'width': '100%',
				'margin': '10px 0',
				'text-align': 'center'
			});
		} else {
			$('.advanced-switch').css({
				'text-align': 'right'
			});
		}
		$('.advanced-link').css({
			'color': '#6b96fa',
			'text-decoration': 'underline',
			'cursor': 'pointer'
		});
		$(this).next('.advanced-switch').click(function () {
			if ($(this).prev().css('display') === 'none') {
				if($(this).prev().hasClass('advanced-maker-list')) {
					closeTxt = '閉じる';
				} else if ($(this).prev().hasClass('advanced-shop-review')) {
					closeTxt = '詳細を閉じる';
				}
				$(this).prev().slideDown('slow');
				if($(this).prev().find('td,th').attr('data-mh') !== undefined) { // 高さを揃えるscriptのマークがあったら
					$.fn.matchHeight._update(); // 高さを揃えるscriptを再実行
				}
				$(this).children('.advanced-link').children('.switch-txt').text(closeTxt);
				$(this).children('.advanced-link').children('.ico-arrow').removeClass('ficon-keyboard_arrow_down').addClass('ficon-keyboard_arrow_up');
			} else if ($(this).prev().css('display') === 'block') {
				if($(this).prev().hasClass('advanced-maker-list')) {
					openTxt = 'その他のメーカーを見る';
				} else if ($(this).prev().hasClass('advanced-shop-review')) {
					openTxt = '詳細を見る';
				}
				$(this).prev().slideUp('slow');
				$(this).children('.advanced-link').children('.switch-txt').text(openTxt);
				$(this).children('.advanced-link').children('.ico-arrow').removeClass('ficon-keyboard_arrow_up').addClass('ficon-keyboard_arrow_down');
			}
		});
	});

	/* 追従査定モジュール */
	var fixedTarget = $('.fixed-module'); // 固定するターゲットの指定
	if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0) || navigator.userAgent.indexOf('iPad') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') == -1) || navigator.userAgent.indexOf('A1_07') > 0 || navigator.userAgent.indexOf('SC-01C') > 0) {
		fixedTarget.css({position: 'static', top: 'auto'});
	} else {
		if (fixedTarget.length){

			var maxMove = $('.footer-area');
			var targetHeight = fixedTarget.outerHeight(true);
			var targetWidth = fixedTarget.width();
			var targetTop = fixedTarget.offset().top;
			var windowHeight = $(document).height();

			fixedTarget.css({'z-index': '20'});

			if (windowHeight > fixedTarget.height()) {
				$(window).scroll(function () {
					if (targetWidth !== fixedTarget.parents('.sub-content').width()) {
						targetWidth = fixedTarget.width();
					}
					if (fixedTarget.offset().top !== targetTop && fixedTarget.css('position') !== 'fixed') {
						targetTop = fixedTarget.offset().top;
					}
					var scrollTop = $(this).scrollTop();
					if(scrollTop > targetTop){

						var maxMoveTop = maxMove.offset().top - 30; // footerとcontentの間をマイナス

						if (scrollTop + targetHeight > maxMoveTop) {
							var customTopPosition = maxMoveTop - (scrollTop + targetHeight);
							fixedTarget.css({position: 'fixed', top: customTopPosition + 'px', width: targetWidth + 'px'});
						} else {
							fixedTarget.css({position: 'fixed', top: '0', width: targetWidth + 'px'});
						}
					}else{
						fixedTarget.css({position: 'static', top: 'auto', width: 'auto'});
					}
				});
			}
		}
	}
});