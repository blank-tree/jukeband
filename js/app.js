$(document).foundation();


$(function() {

	function introHeight() {
		$('#cover, #titleScreen').height($(window).height());
	}

	$(window).bind("load", introHeight);
	$(window).bind("resize", introHeight);




	function randomTitlePlacement($title) {
		var randomMarginTop = $(window).height() / 2 + Math.floor((Math.random() * $(window).height() / 4) - $(window).height() / 4);
		var randomPaddingLeft = $(window).width() / 2 + Math.floor((Math.random() * $(window).width() / 4) - $(window).width() / 4);

		$title.css({
			"padding-top" : randomMarginTop.toString() + "px",
			"margin-left" : randomPaddingLeft.toString() + "px"
		});

	}

	randomTitlePlacement($('#ts-bandname'));
	randomTitlePlacement($('#ts-songtitle'));


	$('#desctwo a.button').click(function() {

		var spoiler = $(this).parents('.spoiler-box').find('.spoiler-content').toggle('fast');
		if ( this.value == 'Hide' ) {
			this.value = 'Show'; }
		else {
			this.value = 'Hide';
		}
		return false;

	});

	$('a.button').click(function(event) {
		event.preventDefault();
	});

});


