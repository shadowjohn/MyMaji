function chat_room_INIT(){
	//alert('gg');
	//alert(window['wh']['height']*80/100);
	window['g']['isChatOpen']=false;
	$("#chat_room_div").css({
		'position':'fixed',
		'background-color':'rgb(200,200,200)',
		'color':'black',		
		'padding':'5px',
		'width':(window['wh']['width']*90/100)+'px',
		'height':(window['wh']['height']*80/100)+'px',
		'top':(window['wh']['height']*5/100)+'px',
		'border':'3px dashed #f00',
		'left':(window['wh']['width']*95/100)+'px',
		'z-index':1,
		'overflow':'visible',
		'opacity':0.6,
		'display':'none'
	});
	//alert('gg1');
	$("#chat_room_div").corner();
	//號呆的按鈕
	$("#chat_room_div").append("<img id='chat_gate' src='images/gate.png'>");
	$("#chat_gate").css({
		'width':window['wh']['width']*10/100+'px',
		'height':window['wh']['height']*15/100+'px'
	});
	$("#chat_gate").css({
		'position':'absolute',
		'top':($("#chat_room_div").height()/2-$("#chat_gate").height()/2)+'px',
		'left':'-15px'		
	});
	$("#chat_gate").unbind("click");
	$("#chat_gate").click(function(){
		switch(window['g']['isChatOpen'])
		{
			case false:
				$("#chat_room_div").animate({
					'left':window['wh']['width']*20/100+'px',
				} , 300, 'easeInCubic');
				window['g']['isChatOpen']=true;
				break;
			case true:
				$("#chat_room_div").animate({
					'left':window['wh']['width']*95/100+'px',
				} , 300, 'easeInCubic');
				window['g']['isChatOpen']=false;
				break;
		}
	});
	//放入框架
	$("#char_room_div").prepend("GG");
	return;
	$("#char_room_div").append("GG \
	<table id='chat_room_table'> \
		<tr> \
			<td colspan='2' id='chat_table_says'>gg</td> \
		</tr> \
		<tr> \
			<td id='chat_room_table_say'>aa</td> \
			<td id='chat_room_table_photo'>bb</td> \
		</tr> \
	</table>");
	alert('test');
	$("#chat_room_table").css({
		'position':'absolute',
		'width':'80%',
		'height':'80%',
		'background-color':'rgb(230,230,230)',
		'top':'0px',
		'left':'0px',
		'text-align':'left'
	});
	alert('test1');
	return;
	$("chat_table_says").css({
		'background-color':'rgb(220,220,220)',
		'text-align':'left',
		'width':'100%',
		'height':'80%'		
	});
	//放入聊天框
	$("chat_table_says").append("<div id='chat_room'></div>");
	$("chat_room").css({
		'position':'absolute',
		'width':'100%',
		'height':'100%',
		'left':'15px',
		'top':'5px',
		'padding':'3px',
		'background-color':'rgb(230,230,230)',
		'text-align':'left',
		'overflow':'scroll'
	});
	//放入輸入
	$("#chat_room_table_say").css({
		'text-align':'center'
	});
	$("#chat_room_table_say").append("<input type='button' id='chat_room_say' value='聊天'>");
	
	$("#chat_room_say").unbind("click");
	$("#chat_room_say").click(function(){
	});
	//放入臉圖
	//放入拍照
	$("chat_room_table_photo").css({
		'text-align':'center'
	});
	$("chat_room_table_photo").append("<input type='button' id='chat_room_photo' value='拍照'>");
	
	$("chat_room_photo").unbind("click");
	$("chat_room_photo").click(function(){
	});		
}
function chat_init(){
	//持續一個聊天
}