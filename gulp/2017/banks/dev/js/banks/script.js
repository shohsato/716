//------------------------------------------------------------
// Smooth Scroll
//------------------------------------------------------------
$(function(){
	$('a.smooth-scroll').on('click', function(event){
		event.preventDefault();
		var $this = $(this);
		var linkTo = $this.attr('href');
		var $target = $(linkTo);
		var offset = $target.data('offsettop');
		var pos = $target.offset().top - offset;
		$('html,body').animate({scrollTop: pos}, 400);
		return false;
	});
});