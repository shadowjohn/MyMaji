function getWindowSize() {	
	var myWidth = 0, myHeight = 0;
	if (typeof (window.innerWidth) == 'number') {
		// Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if (document.documentElement
			&& (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		// IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} else if (document.body
			&& (document.body.clientWidth || document.body.clientHeight)) {
		// IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	var a = new Object();
	a['width'] = parseInt(myWidth);
	a['height'] = parseInt(myHeight);
	return a;
}
function dialogOn(message,functionAction)
{
	$.mybox({
		 is_background_touch_close:false,
		message : message,
		css : {
			backgroundColor : '#000',
			color : '#fff',
			padding:'15px'
		},		
		onBlock : function() {      
			functionAction();      
		}						
	});
}
function dialogOff()
{	
	//setTimeout(function(){
	$.unmybox();
	//},500);
}
//我的ajax
function myAjaxGETOnly(url)
{
  var tmp = $.ajax({
      url: url,
      type: "GET",      
      crossDomain :true,
      async: false
   }).responseText;
  return tmp;
}
function myAjax(url,postdata)
{
  var tmp = $.ajax({
      url: url,
      type: "POST",
      data: postdata,
      async: false
   }).responseText;
  return tmp;
}
function myAjax_async(url,postdata,func)
{
  $.ajax({
      url: url,
      type: "POST",
      data: postdata,
      async: true,
      success: function(html){
        func(html);        
      }
  });  
}
//加密與解密
function enPWD_string( $str, $key ) {
  $str = base64_encode($str);
  $key = base64_encode($key); 
  $xored = "";
  for ($i=0,$max_i=strlen($str);$i<$max_i;$i++) {
    $a = ord(substr($str,$i,1));      
    for ($j=0,$max_j=strlen($key);$j<$max_j;$j++) {      
      $k = ord(substr($key,$j,1));
      $a = $a ^ $k;
    }
    $xored = sprintf("%s%s",$xored,chr($a));
  }       
  return base64_encode($xored);
}
function dePWD_string( $str, $key ) {
  $str = base64_decode($str);    
  $key = base64_encode($key);
  $xored = "";
  for ($i=0,$max_i=strlen($str);$i<$max_i;$i++) {
    $a = ord(substr($str,$i,1));
    for ($j=strlen($key)-1;$j>=0;$j--) {    
      $k = ord(substr($key,$j,1));
      $a = $a ^ $k;
    }
    $xored = sprintf("%s%s",$xored,chr($a));
  }   
  $xored = base64_decode($xored);
  return $xored;
}
function ValidPhone(phonenum)
{
  //驗證電話號碼 09xxxxxxxx
  var tel=/^(09)\d{8}$/;
  if(!tel.test(phonenum))
  {    
    return false;
  } 
  else
  {
    return true;
  }
}
function smallComment(message,is_need_motion)
{
	//畫面的1/15	
	if($("#mysmallComment").size()==0)
	{
		$("body").append("<div id='mysmallComment'><div class='' id='mysmallCommentContent'></div></div>");
		$("#mysmallComment").css({
			'display':'none',
			'position':'fixed',
			'left':'0px',
			'right':'0px',
			'bottom':'4em',
			'z-index':new Date().getTime(),
			'text-align':'center',
			'opacity':0.8,
			'padding':'5px'
		});
		$("#mysmallCommentContent").css({			
			'display': 'inline-block',	
			'color':'#fff',
			'background-color':'#000'			
		});

		/*
		$("#mysmallComment").css({
			'left': (wh['width']-$("#mysmallComment").width())/2+'px' 
		});
		*/

		//$("#mysmallComment").corner();
	}		
	$("#mysmallCommentContent").html(message);
	if(is_need_motion==true)
	{
		$("#mysmallComment").stop();
		$("#mysmallComment").fadeIn("slow");
		setTimeout(function(){
			$("#mysmallComment").fadeOut('fast');
		},5000);
	}
	else
	{
		$("#mysmallComment").show();
		setTimeout(function(){
			$("#mysmallComment").hide();
		},5000);
	}
}
function size_hum_read($size){
    /* Returns a human readable size */
	$size = parseInt($size);
  var $i=0;
  var $iec = new Array();
  var $iec_kind="B,KB,MB,GB,TB,PB,EB,ZB,YB";
  $iec=explode(',',$iec_kind);
  while (($size/1024)>1) {
    $size=$size/1024;
    $i++;
  }
  return sprintf("%s%s",substr($size,0,strpos($size,'.')+4),$iec[$i]);
}