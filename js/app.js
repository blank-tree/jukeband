$(document).foundation();


$(function() {

	function introHeight() {
		$('#cover').height($(window).height());
	}

	$(window).bind("load", introHeight);
	$(window).bind("resize", introHeight);

});


