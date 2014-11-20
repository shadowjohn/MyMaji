/**
 * Phonegap File Upload plugin Copyright (c) Matt Kane 2010
 * https://github.com/phonegap/phonegap-plugins/tree/master/Android/FileUploader
 */
/*var FileUploader = function() {

}*/

/**
 * Given a content:// uri, uploads the file to the server as a multipart/mime
 * request
 * 
 * @param server
 *            URL of the server that will receive the file
 * @param file
 *            content:// uri of the file to upload
 * @param fileKey
 *            Object with key: value params to send to the server
 * @param params
 *            Parameter name of the file
 * @param fileName
 *            Filename to send to the server. Defaults to image.jpg
 * @param mimeType
 *            Mimetype of the uploaded file. Defaults to image/jpeg
 * @param callback
 *            Success callback. Also receives progress messages during upload.
 * @param fail
 *            Error callback
 */
function file_uploadByUri(server, file, params, fileKey,
		fileName, mimeType, callback, fail) 
{
	cordova.exec(function(win) {	
			callback(win);
		}, function(err) {			
			fail(err);			
		}, 'FileUploader', 'uploadByUri', [ server, file, params, fileKey,
				fileName, mimeType ]
	);
}

/**
 * Given absolute path, uploads the file to the server as a multipart/mime
 * request
 * 
 * @param server
 *            URL of the server that will receive the file
 * @param file
 *            Absolute path of the file to upload
 * @param fileKey {json}
 *            Object with key: value params to send to the server
 * @param params
 *            Parameter name of the file
 * @param fileName
 *            Filename to send to the server. Defaults to image.jpg
 * @param mimeType
 *            Mimetype of the uploaded file. Defaults to image/jpeg
 * @param callback
 *            Success callback. Also receives progress messages during upload.
 * @param fail
 *            Error callback
 */
function file_upload(server, file, params, fileKey,
		fileName, mimeType, callback, fail) 
{
	cordova.exec(function(win) {	
			callback(win);			
		}, function(err) {		
			fail(err);
		}, 'FileUploader', 'upload', [ server, file, params, fileKey, fileName,mimeType ]
	);
};

/*FileUploader.Status = {
	PROGRESS : "PROGRESS",
	COMPLETE : "COMPLETE"
}*/



function fileUploadUi(URL,PARAMS,fileName,doSomeThingSuccess,doSomeThingFailure)
{
	$.mybox({
		message : "<table border='0' cellpadding='0' cellspacing='0' align='center' style='width:90%;border:0px solid #fff;'>" +
				"			<tr>" +
				"				<td width='70%'>" +
				"					<img src='images/busy.gif' align='left'>" +
				"						資料上傳中..." +
				"				</td>" +
				"				<td align='right'>" +
				"					<div id='progress_value'></div>" +
				"				</td>" +
				"			</tr>" +
				"			<tr>" +
				"				<td colspan='2' style='text-align:center;'>" +
				"					<div id='progressbar' style='width:100%;height:10px;'>" +
				"						<div id='progress_value_div' style='width: 0%;height:10px;'></div>" +
				"					</div>" +
				"				</td>" +
				"			</tr>" +
				"			<tr>" +
				"				<td colspan='2' align='right'>" +
				"					<div id='progress_detail_div'></div>" +
				"				</td>" +
				"			</tr>" +
				"		</table>",
		css : {
			backgroundColor : '#000',
			color : '#fff',
			width: '80%',
			padding:'5px'
		},
		onBlock : function() {			
			file_upload(URL,fileName,PARAMS,'uploads',basename(fileName),'text/plain',function(res) {
		        //alert(print_r(res,true));
		        var values=sprintf("%.02d",res['progress']);
		        values=sprintf("%.02d",(values/parseInt(res['total']))*100);
		       /* $("#progressbar").progressbar({
		        		"value":values,
		        		'background-color': 'orange' 
		        });*/
		        $("#progress_value_div").css({
		        	'width':values+"%",
	        		'background-color': 'orange' 
		        });
		        //size_hum_read in inc/javascript/include.js
		        $("#progress_detail_div").html(sprintf("%s / %s",size_hum_read(res['progress']),size_hum_read(res['total'])));
		        
		        $("#progress_value").html(values+"%");
		        if(res['status']=='COMPLETE')
	        	{
		        	//下載成功時
		        	doSomeThingSuccess(res);
	        	}
			 }, function(error) {
			    	//下載失敗時
				 	//alert(print_r(error,true));
			    	doSomeThingFailure(error);				    	
			 	 }
 			 );				
		}						
	});
}

