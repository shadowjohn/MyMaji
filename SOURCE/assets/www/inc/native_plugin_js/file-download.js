//此程式是用在檔案下載，詳細使用可以直接呼叫 fileDownloadUi
function download_file(url,dirName,fileName,success,error)
{
	cordova.exec(function(win) {
		success(win); 	
	}, function(err) {
		error(err); 
	}, "Downloader", "downloadFile", [ url,dirName,fileName,{overwrite:true} ]);		
}



function fileDownloadUi(url,dirName,fileName,doSomeThingSuccess,doSomeThingFailure)
{
	$.blockUI({
		message : "<table border='0' cellpadding='0' cellspacing='0' align='center' style='width:400px;border:0px solid #fff;'>" +
				"			<tr>" +
				"				<td width='70%'>" +
				"					<img src='images/busy.gif' align='left'>" +
				"						檔案下載中..." +
				"				</td>" +
				"				<td align='right'>" +
				"					<div id='progress_value'></div>" +
				"				</td>" +
				"			</tr>" +
				"			<tr>" +
				"				<td colspan='2'>" +
				"					<div id='progressbar' class='ui-progressbar ui-widget ui-widget-content ui-corner-all'>" +
				"						<div id='progress_value_div' style='width: 0%;' class='ui-progressbar-value ui-widget-header ui-corner-left'></div>" +
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
			width: 450,
			padding:'15px'
		},
		onBlock : function() {
			
			download_file(url,dirName,fileName,function(res) {		        
		        var values=sprintf("%d",res['progress']);
		        $("#progressbar").progressbar({
		        		"value":values,
		        		'background': 'Orange' 
		        });
		        $("#progress_value_div").css({
		        	'width':values+"%"
		        });
		        $("#progress_detail_div").html(sprintf("%s / %s",res['totalReaded'],res['total']));
		        
		        //$("#progress_value").html(values+"%");
		        //$("#progress_value").html(values+"%");
		        //debug("res="+print_r(res,true));
		        if(res['status']==1)
	        	{
		        	//下載成功時
		        	doSomeThingSuccess();
	        	}
			 }, function(error) {
			    	//下載失敗時
				 	alert('下載失敗...'+error);
			    	doSomeThingFailure(error);
			    	
			 	 }
 			 );				
		}						
	});
}