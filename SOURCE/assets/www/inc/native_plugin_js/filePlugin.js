//請參考:https://github.com/hazemhagrass/phonegap-dropbox-sync-plugin
//https://github.com/hazemhagrass/phonegap-dropbox-sync-plugin/blob/master/example/assets/www/js/app.js
/*
 * 使用的方法如下
 dropbox.readData(filePath).done(function(result) {
                var bytes = new Uint8Array(result);
                $('#image').attr('src', "data:image/jpeg;base64," + encode(bytes));
                $("#image").show();
                $("#text").hide();
            });
    所以我們的要用
    filePlugin.(get_sd_root_path).done(function(result){
    }),fail(function(result){
    });
  
 */
var filePlugin = (function() {
	var pluginName = "filePlugin";
	var register_device_id = function(phoneNum){
		var deferred = $.Deferred();
		Cordova.exec(function(result) {	
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);
		}, pluginName, "register_device_id", [phoneNum]);		 
		return deferred.promise();		
	}
	var get_sd_root_path  = function() {		
		var deferred = $.Deferred();
		Cordova.exec(function(result) {	
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);
		}, pluginName, "get_sd_root_path", []);		 
		return deferred.promise();
	}

	var file_get_contents = function(filename){
		//取得檔案內容	
		var deferred = $.Deferred();
		Cordova.exec(function(result) {
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);
		}, pluginName, "file_get_contents", [ filename ]);
		return deferred.promise();
	}

	var file_to_base64 = function(filename){	
		//輸入檔案路徑，取回base64字串	
		var deferred = $.Deferred();
		Cordova.exec(function(result) {
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);		
		}, pluginName, "file_to_base64", [ filename ]);
		return deferred.promise();
	}

	var file_put_contents = function(filename,data){
		//Todo：寫入失敗也有所回應～
		var deferred = $.Deferred();
		Cordova.exec(function(result) {
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);		
		}, pluginName, "file_put_contents", [ filename,data ]);	
		return deferred.promise();
	}

	var file_size=function(filename) {
		//取得檔案大小
		var deferred = $.Deferred();
		Cordova.exec(function(result) {
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);		
		}, pluginName, "file_size", [ filename ]);
		return deferred.promise();
	}

	var unzip = function(src_filename,dest_filename) {
		//檔案解壓縮
		var deferred = $.Deferred();
		Cordova.exec(function(result) {
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);
		}, pluginName, "unzip", [ src_filename,dest_filename ]);
		return deferred.promise();
	}

	var file_copy = function(src_filename,dest_filename) {	
		var deferred = $.Deferred();
		Cordova.exec(function(result) {	
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);
		}, pluginName, "file_copy", [ src_filename,dest_filename ]);	
		return deferred.promise();
	}

	var file_move = function(src_filename,dest_filename) {	
		var deferred = $.Deferred();
		Cordova.exec(function(result) {	
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);
		}, pluginName, "file_move", [ src_filename,dest_filename ]);	
		return deferred.promise();
	}

	var file_exists = function(filename) {	
		var deferred = $.Deferred();
		Cordova.exec(function(result) {	
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);
		}, pluginName, "file_exists", [ filename ]);	
		return deferred.promise();
	}

	var mkdir = function(dirpath) {
		//建立目錄
		var deferred = $.Deferred();
		var input = [];
		if($.isArray(dirpath)) {
		    input = dirpath;
		} else {
		    array_push(input,dirpath);
		}		
		//alert(print_r(input,true));
		Cordova.exec(function(result) {				
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);
		}, pluginName, "mkdir", [ json_encode(input) ]);
		return deferred.promise();
	}

	var unlink = function(filename) {
		//移除檔案	
		var deferred = $.Deferred();
		Cordova.exec(function(result) {	
			deferred.resolve(result);
		}, function(err) {
			deferred.reject(err);
		}, pluginName, "unlink", [ filename ]);
		return deferred.promise();
	}

	var get_file_from_asset_to_base64_data = function(filename) {
		//輸入asset檔案路徑，取回base64字串		
		var deferred = $.Deferred();
		Cordova.exec(function(result) {	
			deferred.resolve("data:image/png;base64,"+result);
		}, function(err) {
			deferred.reject(err);
		}, pluginName, "get_file_from_asset_to_base64", [ filename ]);
		return deferred.promise();
	}
	
	var get_file_from_asset_to_base64 = function(dom,filename) {
		//輸入asset檔案路徑，直接設定dom元件	
		var deferred = $.Deferred();
		Cordova.exec(function(result) {						
			deferred.resolve(result);
			$(dom).attr('src',"data:image/png;base64,"+result);
		}, function(err) {
			deferred.reject(err);		
		}, pluginName, "get_file_from_asset_to_base64", [ filename ]);
		return deferred.promise();
	}
	
	return {
		register_device_id:register_device_id,
		get_sd_root_path:get_sd_root_path,
		file_get_contents:file_get_contents,
		file_to_base64:file_to_base64,
		file_put_contents:file_put_contents,
		file_size:file_size,
		unzip:unzip,
		file_copy:file_copy,
		file_move:file_move,
		file_exists:file_exists,
		mkdir:mkdir,
		unlink:unlink,
		get_file_from_asset_to_base64_data:get_file_from_asset_to_base64_data,
		get_file_from_asset_to_base64:get_file_from_asset_to_base64
	}
	
}());
