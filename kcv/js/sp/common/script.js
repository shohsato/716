jQuery(function ($) {
	"use strict";
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

	/* スライダー */
	$('.bxslider').bxSlider({
		auto: true,
		pause: 7000,
		nextSelector: '.next-arrow',
		prevSelector: '.prev-arrow',
		nextText: '＞',
		prevText: '＜'
	});
	// ピックアップ口コミ用
	$('.bxslider-pickup').bxSlider({
		nextSelector: '.next-arrow-pickup',
		prevSelector: '.prev-arrow-pickup',
		nextText: '＞',
		prevText: '＜'
	});
});


//------------------------------------------------------------
// hamburger menu
//------------------------------------------------------------
$(function(){
	// open menu
	function openMenu(event) {
		// event.preventDefault();

		var $shade = $('<div></div>');
		$shade
		.attr('class', 'gnav-shade')
		.on('click', closeMenu);

		var $this = $(this);
		var $modalWin = $('.gnav-area--sp');

		$modalWin
		.before($shade)
		.addClass('appearance');
	}
	// close menu
	function closeMenu() {
		$('.gnav-shade').remove();
		$('.hamburger-menu').removeClass('open');
		$('.gnav-area--sp').removeClass('appearance');
	}
	$('.hamburger-menu').on('click', function(){
		var $this = $(this);
		$this.toggleClass('open');
		if($('.gnav-area--sp').hasClass('appearance')){
			closeMenu();
		} else {
			openMenu();
		}
		return false;
	});
});

//------------------------------------------------------------
// Gnav hamburger dropdown
//------------------------------------------------------------
$(function(){
	$('.dropdown > .mega-menu-child-ttl').on('click', function(event){
		event.preventDefault();
		event.stopPropagation();
		var $this = $(this);

		//複数のドロップダウンメニューがあるときの対策
		$this.parent().siblings('.hamburger-menu-item.dropdown').removeClass('appearance');

		if($this.parent('.hamburger-menu-item.dropdown').hasClass('appearance')) {
			$this.parent('.hamburger-menu-item.dropdown').removeClass('appearance');
		} else {
			$this.parent('.hamburger-menu-item.dropdown').addClass('appearance');
		}
	});
});


//------------------------------------------------------------
// blur accordion
//------------------------------------------------------------
$(function(){
	$('.css-accordion-blur__btn').on('click', function(event){
		event.preventDefault();
		event.stopPropagation();
		var $this = $(this);
		var $accordionParent = $this.parent('.css-accordion-blur');

		if ($accordionParent.hasClass('appearance')) {
			// アコーディオン閉じるときに見出しに戻す
			if($this.hasClass('accrordion-scroll')) {
				$accordionParent.removeClass('appearance');
				var linkTo = $this.attr('href');
				var $target = $(linkTo);
				var offset = $target.data('offsettop');
				var pos = $target.offset().top - offset;
				$('html,body').animate({scrollTop: pos}, 400);
				return false;
			} else {
				$accordionParent.removeClass('appearance');
			}
		} else {
			$accordionParent.addClass('appearance');
		}
	});
});


//------------------------------------------------------------
// Smooth Scroll
//------------------------------------------------------------

// smooth_scroll(関数化)
function smooth_scroll(event) {
	var $this = $(this);
	var linkTo = $this.attr('href');
	var $target = $(linkTo);
	var offset = $target.data('offsettop');
	var pos = $target.offset().top - offset;
	$('html,body').animate({scrollTop: pos}, 400);
	return false;
}

// 'a.smooth-scroll'用イベント処理
$(function(){
	$('a.smooth-scroll').on('click', smooth_scroll);
});