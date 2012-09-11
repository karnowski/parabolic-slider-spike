$(function() {
	$(".target").click(function(event) {
		event.preventDefault();
		$(".target").removeClass("selected");
		$(this).addClass("selected");

		// var position = $(this).position();
		// var coords = {left: position.left+100, top: position.top+170};
		// $(".marker").offset(coords)
	});	
});

