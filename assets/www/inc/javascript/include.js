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
	setTimeout(function(){
		$.unmybox();
	},500);
}
//我的ajax
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