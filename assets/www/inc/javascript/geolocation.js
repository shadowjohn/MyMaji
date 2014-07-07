// 本程式是抓經緯度相關的
function geolocation_init(timeout_value) {	
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
			setTimeout(function(){		
				geolocation_init(15000);
			},1000);
		}, function() {			
			setTimeout(function(){			
				geolocation_init(15000);
			},3000);
		}, {
			maximumAge : 5000,
			timeout : timeout_value,
			enableHighAccuracy : true
		});			
}
