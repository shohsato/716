var app = app || {};

app.init = function () {
	app.tabs();
}

app.top_page = function() {
	if($(".sec-top-video").length) {
		$(window).on("load resize", function() {
			var element_height = $(window).height() - 80;
			$(".sec-top-video").height(element_height);
		})
	}
}

app.tabs = function() {
	$(".js-tabs").each(function(){
		var $active, $content, $links = $(this).find("a");
		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		$active.addClass("active");
		$content = $($active.attr("href"));
		$links.not($active).each(function () {
			$($(this).attr("href")).hide();
		});
		$(this).on("click", "a", function(e){
		$active.removeClass("active");
		$content.hide();
		$active = $(this);
		$content = $($(this).attr("href"));
		$active.addClass("active");
		$content.show();
		e.preventDefault();
		});
	});
}


$(function() {

	app.init();

});

jQuery(function(){
	if($("#bgndVideo").length) {
		jQuery("#bgndVideo").YTPlayer();
	}
});