// 此功能為指南針使用
function compass_init(frequency_value){
	navigator.compass.watchHeading( function( heading ) {
		window['g']['direct'].css(
				//'-webkit-transform','rotate('+(360-heading.magneticHeading)+'deg)'
				'-webkit-transform','rotate('+(heading.magneticHeading)+'deg)'
		);
		//alert('a');
	},function(error) {
	  //console.log('Error');
	},{
	  frequency: frequency_value
	});
}