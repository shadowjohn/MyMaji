// 本程式是抓經緯度相關的
function geolocation_init() {	
	navigator.geolocation.getCurrentPosition(function(position) {
		window['g']['me_lat']=position.coords.latitude;
		window['g']['me_lng']=position.coords.longitude;	
		//檢查追蹤			
		if(window['g']['focus_me']==true)
		{
			cleanAll();
			showMe();
			showRoad();
		}
		//回報位置
		if(isRegister(false))
		{
			if(window['g']['LAST_REPORT_PLACE_DATETIME']=="")
			{
				updateMyPlace();
			}
			else
			{
				if(time()-strtotime(window['g']['LAST_REPORT_PLACE_DATETIME']) >= window['g']['HOW_LONG_REPORT_MY_PLACE'])
				{
					updateMyPlace();
				}
			}
		}
		//檢查追蹤			
		setTimeout(function(){		
			geolocation_init();
		},2500);
	}, function() {			
		//等待定位中
		setTimeout(function(){			
			  //alert('GPS 失敗');
			  geolocation_init();
		},3000);
	}, {
		maximumAge : 3000,
		timeout : 15000,
		enableHighAccuracy : false
	});			
}
function updateMyPlace(){
	//刷新我的位置
	var URL=sprintf("%s?mode=updateMyPlace",window['webservice']);
	var m = new Object();
	m['lat']=enPWD_string(window['g']['me_lat'],window['PWD_CODE']);
	m['long']=enPWD_string(window['g']['me_lng'],window['PWD_CODE']);
	m['id'] = enPWD_string(window['me_data']['id'],window['PWD_CODE']);
	myAjax_async(URL,m,"",function(){
		
	});
}
