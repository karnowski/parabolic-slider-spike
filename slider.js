$(document).ready(function() {
	/*Slider */
	$('.slider-input').each(function() {
		  var currVal = $(this).val();
		  if(currVal < 0){
			  currVal = 0;
		  }
		$(this).parent().children('.slider-content').slider({
			'animate': true, 
			'min': -1, 
			'max': 201,
			'value' : 201,
			'orientation' : 'vertical',
			'stop': function(e, ui){
				//$(this).prev('.slider-input').val(ui.value); //Set actual input field val, done during slide instead
				
				//pop handle back to top if we went out of bounds at bottom
				/* 
				if ( ui.value == -1 ) {
					ui.value = 201;
					$(this).children('.ui-slider-handle').css('bottom','100%');
				}
				*/
			},
			'slide': function(e, ui){
				var percentLeft;
				var submitValue;
				var Y = ui.value - 100; //Find center of Circle (We're using a max value and height of 200)
				var R = 100; //Circle's radius
				var skip = false;
				
				$(this).children('.ui-slider-handle').attr('href',' UI.val = ' + ui.value);
				
				//Show default/disabled/out of bounds state
				if ( ui.value > 0 && ui.value < 201 ) { //if in the valid slide rang
					$(this).children('.ui-slider-handle').addClass('is-active');
				}
				else {
					$(this).children('.ui-slider-handle').removeClass('is-active');
				}
				
				//Calculate slider's path on circle, put it there, by setting background-position
				if ( ui.value >= 0 && ui.value <= 200 ) { //if in valid range, these are one inside the min and max
					var X = Math.sqrt((R*R) - (Y*Y)); //X^2 + Y^2 = R^2. Find X.
					if ( X == 'NaN' ) {
						percentLeft = 0;
					}
					else {
						percentLeft = X;					
					}
				}
				else if ( ui.value == -1 || ui.value == 201 ) {
					percentLeft = 0;
					skip = true;
				}
				else {
					percentLeft = 0;
				}
				
				//Move handle
				if ( percentLeft > 100 ) { percentLeft = 100; } 
				$(this).children('.ui-slider-handle').css('background-position',percentLeft +'% 100%'); //set css sprite

				//Figure out and set input value
				if ( skip == true ) {
					submitValue = 'fail';
					$(this).children('.ui-slider-handle').css('background-position',percentLeft +'% 0%'); //reset css sprite					
				}
				else {
					submitValue = Math.round(ui.value / 2); //Clamp input value to range 0 - 100
				}			
				$('#display-only input').val(submitValue); //display selected value, demo only
				$('#slider-display').text(submitValue); //display selected value, demo only
				$(this).prev('.slider-input').val(ui.value); //Set actual input field val. jQuery UI hid it for us, but it will be submitted.
			}
		});
	});
	
	
});	