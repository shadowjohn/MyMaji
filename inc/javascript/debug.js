function debug_init() {	
	if ($("#debug").size() == 0) {
		$("body").append("<div id='debug'></div>");		
		$("#debug").css({
			'position' : 'fixed',
			'width' : 300*window['whrw']+'px',
			'height' : 300*window['whrh']+'px',
			'overflow' : 'auto',
			'background-color' : 'orange',
			'border' : '2px solid #000',			
			'left' : window['wh']['width']-(15+300)*window['whrw']+'px',
			'top' : 5*window['whrh']+'px',
			'color' : '#000',
			'z-index':'999',
			'word-break':'break-all',
			'margin-top':'15px',
			'margin-bottom':'15px',
			'font-size':'16px'
		});
		//$("#debug").addClass("cantTouch");
		$("body").append("<div id='debug_controller'>除錯開關</div>");
		$("#debug_controller").css({
			'position':'fixed',
			'width':150*window['whrw']+'px',
			'height':30*window['whrh']+'px',
			'text-align':'center',
			'line-height':30*window['whrh']+'px',
			'left':2*window['whrw']+'px',
			'top':2*window['whrh']+'px',
			'z-index':'999',
			'background-color' : 'orange',
			'border' : '2px solid #000'
		});
		//$("#debug").corner();
		//$("#debug_controller").corner();
		$("#debug_controller").unbind("click");
		$("#debug_controller").click(function(event){
			$("#debug").toggle();
			event.stopPropagation();
		});
		$("#others_div").show();
		//$("#debug").draggable();
	}
}

function debug(messages) {	
	if (getMemory('debug_mode') == "1") {
		debug_init();
		$("#debug").prepend(
				sprintf("[%s]：%s<br><br>", date('Y-m-d H:i:s'), messages));
	}
}

//debug("開始Debug嘍^_^");
