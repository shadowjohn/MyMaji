function isRegister(isNeedGUI)
{
	var me_data=json_decode(getMemory("me_data"));	
	if(me_data["is_registered"]=="NO")
	{
		if(isNeedGUI)
		{
			$("#t_register").show();
			$("#btn_new_login").unbind("click");
			$("#btn_new_login").click(function(){
				$(".show_div_class").hide();
				$("#t_register_new").show();
				new_register_init();
			});
			$("#btn_old_login").unbind("click");
			$("#btn_old_login").click(function(){
				$(".show_div_class").hide();
				$("#t_register_old").show();
				old_register_init();
			});	
			$("#btn_new_old_cancel").unbind("click");
			$("#btn_new_old_cancel").click(function(){
				$(".show_div_class").hide();
				$("#t_register").hide();
			});
		}
		return false;
	}
	else
	{
		return true;
	}
}
function new_register_init(){
	//新註冊表單
	$("#btn_register_done").css({
		'background-color':'#CCFF99'
	});
	$("#btn_register_done").unbind("click");
	$("#btn_register_done").click(function(){
		var message="";
		var 姓名=trim($("#text_register_name").val());
		var 手機號碼=trim($("#text_register_phone_number").val());
		var 匿稱=trim($("#text_register_nickname").val());
		var 密碼=trim($("#password_register_password").val());
		var 密碼_chk=trim($("#password_register_password_chk").val());
		if(姓名=="")
		{
			message+="姓名不可為空白...\n";
		}
		if(手機號碼=="")
		{
			message+="手機號碼不可為空白...\n";
		}
		if(匿稱=="")
		{
			message+="匿稱不可為空白...\n";
		}
		if(密碼=="")
		{
			message+="密碼不可為空白...\n";
		}
		else
		{
			if(密碼!=密碼_chk)
			{
				message+="密碼二次不相同...\n";
				$("#password_register_password").val('');
				$("#password_register_password_chk").val('');
			}
		}
		if(message!="")
		{
			alert(message);
			return false;
		}
		else
		{
			var URL=sprintf("%s?mode=register",window['webservice']);
			var m=new Object();
			m['login_id']=enPWD_string(手機號碼,window['PWD_CODE']);
			m['pwd']=enPWD_string(密碼,window['PWD_CODE']);
			m['nick']=enPWD_string(姓名,window['PWD_CODE']);
			m['nickname']=enPWD_string(匿稱,window['PWD_CODE']);
			dialogOn("註冊中...",function(){
				myAjax_async(URL,m,function(result){
					result = json_decode(result);
					if(result['status']=="YES")
					{						
						init_login(result);
						$(".show_div_class").hide();
						alert('註冊成功～歡迎你'+result['nickname']);
						dialogOff();
					}
					else
					{
						alert('註冊失敗～'+result['error_message']);
						dialogOff();
					}
				});
			});
		}
	});
	$("#btn_register_cancel").unbind("click");
	$("#btn_register_cancel").click(function(){
		$(".show_div_class").hide();
	});	
}
function old_register_init(){
	//登入表單
	var p = trim(getMeData("phone_number"));
	if(p!="")
	{
		$("#text_login_phone_number").val(p);
	}
	$("#btn_login_done").unbind("click");
	$("#btn_login_done").click(function(){
		var message="";
		var phone=trim($("#text_login_phone_number").val());
		var password=trim($("#password_login_password").val());
		if(phone=="")
		{
			message+="請輸入手機號碼...\n";
		}else
		{
			if(!ValidPhone(phone))
			{
				message+="手機號碼格式錯誤...\n";
			}
		}
		if(password=="")
		{
			message+="請輸入密碼...";
		}
		if(message!="")
		{
			alert(message);
			return false;
		}
		else
		{
			var m = new Object();
			m['login_id']=phone;
			m['pwd']=enPWD_string( password , window['PWD_CODE'] );
			var URL = sprintf("%s?mode=login",window['webservice']);
			//alert(URL);
			//alert(print_r(m,true));
			var info = myAjax(URL,m);
			var jinfo = json_decode(info,true);
			if(jinfo['status']=="YES")
			{
				init_login(jinfo);
				$(".show_div_class").hide();
				//取得使用者列表
			}
			else
			{
				alert('登入失敗...');
			}
		}
	});	
	$("#btn_login_cancel").unbind("click");
	$("#btn_login_cancel").click(function(){
		$(".show_div_class").hide();
	});
}
function init_login(info)
{
	/*
	window['me_data']['phone_number']="";
	window['me_data']['name']="";
	window['me_data']['nickname']="";
	window['me_data']['icon']="data:image/png;base64,R0lGODlhEwATAKIAAP//AMzMAGZmAP8zAAAAAP///wAAAAAAACH5BAEAAAUALAAAAAATABMAAANVWLrUTisyEoC1oUlFr8dQRHykFRad+Y0gdzlv86KVKdsskOUAjHu312rFK5GCRWDMJDACBKxGrTcFXTIo4CPY41QJgzAP69IWT14nWSL97DaiLVqRAAA7";
	window['me_data']['lat']="";
	window['me_data']['lon']="";
	window['me_data']['allow_update_place']=true;
	window['me_data']['is_registered']="NO";
	 */
	setMeData("id",info['id']);
	setMeData("phone_number",info['login_id']);
	setMeData("name",info['name']);
	setMeData("nickname",info['nickname']);
	setMeData("icon","data:image/png;base64,R0lGODlhEwATAKIAAP//AMzMAGZmAP8zAAAAAP///wAAAAAAACH5BAEAAAUALAAAAAATABMAAANVWLrUTisyEoC1oUlFr8dQRHykFRad+Y0gdzlv86KVKdsskOUAjHu312rFK5GCRWDMJDACBKxGrTcFXTIo4CPY41QJgzAP69IWT14nWSL97DaiLVqRAAA7");
	setMeData("allow_update_place",info['is_show_my_location']);
	setMeData("is_registered","YES");
}
function getMeData(key)
{
	var jdata = json_decode(getMemory("me_data"));
	//alert(print_r(jdata,true));
	return jdata[key];
}
function setMeData(key,value)
{
	var jdata = json_decode(getMemory("me_data"));
	jdata[key]=value;
	setMemory("me_data",json_encode(jdata));	
}
function showFriendsLists(){
	$("#t_FriendsLists").show();
}
function getFriendsLists()
{
	var en = enPWD_string( getMeData("phone_number"), window['PWD_CODE'] );
	var URL=sprintf("%s?mode=getFriendsLists",window['webservice']);
	myAjax_async(URL,"phone_number="+en,function(result){
		result = dePWD_string(result,window['PWD_CODE']);
		alert(result);
	});
}
