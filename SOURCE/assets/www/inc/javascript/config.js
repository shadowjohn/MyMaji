//Debug mode
setMemory("debug_mode", "0");
window['version']=1.0;
window['PWD_CODE'] = "3WA_IS_GOOD";
window['webservice']="http://123.241.3.31/MyMaji/MyMaji_api.php";
window['sd_root']="";
window['basedirName']="MyMaji";
window['dirs']=["upload"]; //window['basedir']+"/upload"
window['basedir']=""; //sdroot / MyMaji

//自身註冊資料
//getMemory("me_data"); //是json，解出來格式如下
//alert((getMemory("me_data")==null));
/*alert(getMemory("me_data"));
 * 
 */
if(getMemory("me_data")==null)
{
	//初次使用
	window['me_data'] = {};
	window['me_data']['id']="";
	window['me_data']['phone_number']="";
	window['me_data']['name']="";
	window['me_data']['nickname']="";
	window['me_data']['icon']="data:image/png;base64,R0lGODlhEwATAKIAAP//AMzMAGZmAP8zAAAAAP///wAAAAAAACH5BAEAAAUALAAAAAATABMAAANVWLrUTisyEoC1oUlFr8dQRHykFRad+Y0gdzlv86KVKdsskOUAjHu312rFK5GCRWDMJDACBKxGrTcFXTIo4CPY41QJgzAP69IWT14nWSL97DaiLVqRAAA7";
	window['me_data']['lat']="";
	window['me_data']['lon']="";
	window['me_data']['allow_update_place']="YES";
	window['me_data']['is_registered']="NO";
	setMemory("me_data",json_encode(window['me_data']));
}


//G圖台
window['g']={};
window['g']['token']='token';
window['g']['online_status']=false;
window['g']['me_lat']='';
window['g']['me_lon']='';
window['g']['road']='';
window['g']['focus_me']=false;
window['g']['direct']='';
window['g']['gmap']='';
//好友列表
window['g']['friends']=new Array();
//圖台最後位置
window['g']['MAP_T_LAT']='';
window['g']['MAP_T_LON']='';
window['g']['MAP_B_LAT']='';
window['g']['MAP_B_LON']='';

//多久回報一次我的位置
window['g']['HOW_LONG_REPORT_MY_PLACE']=30; // 30秒一次
window['g']['LAST_REPORT_PLACE_DATETIME']=""; //最後回報時間
