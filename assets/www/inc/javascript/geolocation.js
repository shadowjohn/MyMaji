// 本程式是抓經緯度相關的
function geolocation_init() {	
		navigator.geolocation.watchPosition(function(position) {
			window['g']['me_lat']=position.coords.latitude;
			window['g']['me_lng']=position.coords.longitude;	
			//檢查追蹤			
			if(window['g']['focus_me']==true)
			{
				cleanAll();
				showMe();
				showRoad();
			}
		}, function() {			
			//等待定位中
		}, {
			maximumAge : 3000,
			timeout : 15000,
			enableHighAccuracy : true
		});			
}
