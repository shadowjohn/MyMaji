// 本程式是抓經緯度相關的
function geolocation_init() {
	//alert("fail...");
	filePlugin.get_gps().done(function(gps){
		//alert(gps);
		if(gps=="0,0")
		{
			setTimeout(function(){				
				geolocation_init();
			},5*1000);	
		}
		else
		{
			var m = explode(",",gps);
			window['g']['me_lat']=m[0];
			window['g']['me_lon']=m[1];	
			showMe(false);
			//檢查追蹤			
			if(window['g']['focus_me']==true)
			{
				//cleanAll();
				showMe(true);
				showRoad();
			}
			//回報位置
			/*if(isRegister(false))
			{
				if(window['g']['LAST_REPORT_PLACE_DATETIME']=="")
				{
					//updateMyPlace();
				}
				else
				{
					if(time()-strtotime(window['g']['LAST_REPORT_PLACE_DATETIME']) >= window['g']['HOW_LONG_REPORT_MY_PLACE'])
					{
						//updateMyPlace();
					}
				}
			}*/
			setTimeout(function(){
				geolocation_init();
			},1*1000);
		}
	}).fail(function(){
		setTimeout(function(){
          geolocation_init();
		},3*1000);
	});
}
function updateMyPlace(){
	//刷新我的位置1
	var URL=sprintf("%s?mode=updateMyPlace",window['webservice']);
	var m = new Object();
	m['lat']=enPWD_string(window['g']['me_lat'],window['PWD_CODE']);
	m['long']=enPWD_string(window['g']['me_lon'],window['PWD_CODE']);
	m['id'] = enPWD_string(getMeData('id'),window['PWD_CODE']);
	//myAjax_async(URL,m,function(result){
	//	window['g']['LAST_REPORT_PLACE_DATETIME']=date('Y-m-d H:i:s');
	//});
}
