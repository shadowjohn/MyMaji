package com.phonegap.plugins.filePlugin;


//import java.io.ByteArrayOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.zip.ZipInputStream;
//import java.io.FileInputStream;


import org.json.*;


//import android.graphics.Bitmap;
//import android.graphics.BitmapFactory;
//import android.annotation.SuppressLint;
//import android.annotation.SuppressLint;
//import android.util.Base64;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;

import android.R;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Environment;

import tw.MyMaji.MyMajiActivity;
import tw.MyMaji.utils.utils;



public class filePlugin  extends CordovaPlugin {
	//@SuppressLint("NewApi")
	public boolean  execute(String action, JSONArray args,
			final CallbackContext callbackContext) {
		// PluginResult
		try {
			if (action.equals("file_get_contents")) {
				//讀出檔案內容
				//args[0]=檔名
				//return new PluginResult(PluginResult.Status.OK,  utils.file_get_contents(args.getString(0)));
				callbackContext.success(utils.file_get_contents(args.getString(0)));
			}
			else if (action.equals("file_to_base64")){
				/*String filename=args.getString(0).trim();
				Bitmap bm = BitmapFactory.decodeFile(filename);
				ByteArrayOutputStream baos = new ByteArrayOutputStream();  
				bm.compress(Bitmap.CompressFormat.JPEG, 60, baos); //bm is the bitmap object   
				byte[] b = baos.toByteArray(); 
				//原本 Base64.DEFAULT
				//改成不要斷行的應該較好
				String encodedImage = Base64.encodeToString(b, Base64.NO_WRAP);*/
			    //FileInputStream in = new FileInputStream(args.getString(0).trim());
			    //File file = new File(args.getString(0));
	            //byte[] buffer = new byte[(int) file.length()];
				//Bitmap bitmapOrg = BitmapFactory.decodeFile(args.getString(0));
				//ByteArrayOutputStream bao = new ByteArrayOutputStream();
				//bitmapOrg.compress(Bitmap.CompressFormat.PNG, 80, bao);
				//byte [] buffer = bao.toByteArray();
	            //int length = in.read(buffer);    
	            //String data = Base64.encodeToString(buffer, 0, length, Base64.NO_WRAP);
	            //String data = Base64.encodeToString(buffer, 0, length,Base64.NO_WRAP);
				//byte[] buffer = utils.image2byte(args.getString(0));
	            //String data = utils.base64_encode(buffer);	           
	            //buffer=null;
	            //in.close();
				//return new PluginResult(PluginResult.Status.OK, utils.base64_encode(utils.image2byte(args.getString(0))));
				callbackContext.success(utils.base64_encode(utils.image2byte(args.getString(0))));
			}	
			else if(action.equals("get_file_from_asset_to_base64"))
			{
				//目錄會從 www 開始
				String filename=args.getString(0).trim();
				InputStream stream = cordova.getActivity().getAssets().open("www/"+filename);
		        int size = stream.available();
		        byte[] buffer = new byte[size];
		        stream.read(buffer);
		        stream.close();
		        //tContents = new String(buffer);
		        //return new PluginResult(PluginResult.Status.OK, utils.base64_encode(buffer));
		        callbackContext.success( utils.base64_encode(buffer));
			}
			else if (action.equals("image2json2file"))
			{
				String img_filename=args.getString(0).trim();
				String lat=args.getString(1).trim();
				String lon=args.getString(2).trim();
				String output_filename=args.getString(3).trim();
				String jdata = "{ \"data\":\""+utils.base64_encode(utils.image2byte(img_filename))+"\", \"lat\":\""+lat+"\",\"lon\":\""+lon+"\"}  ";
				utils.file_put_contents(output_filename, jdata);
				callbackContext.success(output_filename);
			}
			else if (action.equals("get_sd_root_path"))
			{
				try{
					String sd_root_path = utils.get_root_path();
					//System.out.println("SD CARD Choice...:"+sd_root_path);
					utils.logs("SD CARD Choice...:"+sd_root_path);
						    //return new PluginResult(PluginResult.Status.OK,sd_root_path);
					callbackContext.success(sd_root_path);
				}catch(Exception ex){
					//return new PluginResult(PluginResult.Status.ERROR,"");
					callbackContext.error("");
				}
				
			}
			else if (action.equals("file_move"))
			{
				utils.fileMove(args.getString(0).trim(), args.getString(1).trim());
				//return new PluginResult(PluginResult.Status.OK, "");
				callbackContext.success("");
			}
			else if (action.equals("file_size"))
			{
				File f = new File(args.getString(0).trim());
				long size = f.length();
				//return new PluginResult(PluginResult.Status.OK, "{\"size\":"+size+",\"filename\":\""+args.getString(0).trim()+"\"}");
				callbackContext.success("{\"size\":"+size+",\"filename\":\""+args.getString(0).trim()+"\"}");
			}
			else if (action.equals("file_copy"))
			{
				utils.fileCopy(args.getString(0).trim(), args.getString(1).trim());
				//return new PluginResult(PluginResult.Status.OK, "");
				callbackContext.success("");
			}else if (action.equals("unzip"))
			{				
				String source = args.getString(0).trim();
				String target = args.getString(1).trim();
				File targetFile = new File(target);
				if (targetFile.exists())
					targetFile.delete();

				try {
					FileInputStream file = new FileInputStream(source);
					ZipInputStream sourceZip = new ZipInputStream(file);
					
					sourceZip.getNextEntry();

					byte[] buffer = new byte[65535];
					int length;

					OutputStream writeFile = new FileOutputStream(targetFile);

					while ((length = sourceZip.read(buffer)) > 0) {
						writeFile.write(buffer, 0, length);
					}

					writeFile.flush();
					writeFile.close();
					sourceZip.close();
					//return new PluginResult(PluginResult.Status.OK, "{\"status\":true,\"filename\":\""+target+"\"}");
					callbackContext.success("{\"status\":true,\"filename\":\""+target+"\"}");
				} catch (Exception e) {
					e.printStackTrace();
					//return new PluginResult(PluginResult.Status.ERROR, "{\"status\":false,\"filename\":\""+target+"\"}");
					callbackContext.error("{\"status\":false,\"filename\":\""+target+"\"}");
				}
			}
			else if (action.equals("file_put_contents")) {
				//將資料寫入檔案
				// args[0]=檔名
				// args[1]=datas...
				utils.file_put_contents(args.getString(0).trim(), args.getString(1).trim());
				//return new PluginResult(PluginResult.Status.OK, "");
				callbackContext.success("");

			}else if(action.equals("file_exists")){
				//檢查檔案是否存在
				String fn = args.getString(0).trim();
				File f = new File(fn);
				
				if(f.exists()){
					utils.logs("Check File Exists:"+args.getString(0).trim() + ": True...");
					//return new PluginResult(PluginResult.Status.OK,
					//		"{\"status\":\"true\",\"filename\":\""+utils.addSlashes(fn)+"\"}");
					callbackContext.success("{\"status\":\"true\",\"filename\":\""+utils.addSlashes(fn)+"\"}");
				}else
				{
					utils.logs("Check File Exists:"+args.getString(0).trim() + ": False...");
					//return new PluginResult(PluginResult.Status.ERROR,
					//		"{\"status\":\"false\",\"filename\":\""+utils.addSlashes(fn)+"\"}");
					callbackContext.error("{\"status\":\"false\",\"filename\":\""+utils.addSlashes(fn)+"\"}");
				}					
			} 
			else if (action.equals("get_gps"))
			{
				// Create class object
				utils.logs("Run get_gps...");
				
		        // Check if GPS enabled
				MyMajiActivity.gps.getLocation();
		        if(MyMajiActivity.gps.canGetLocation()) {
		        	//super.webView.sendJavascript("alert('can');");
		        	MyMajiActivity.latitude = MyMajiActivity.gps.getLatitude();
		        	MyMajiActivity.longitude = MyMajiActivity.gps.getLongitude();
		        	utils.logs("Run get_gps canGetLocation...");	
		            // \n is for new line
		           // Toast.makeText(getApplicationContext(), "Your Location is - \nLat: " + latitude + "\nLong: " + longitude, Toast.LENGTH_LONG).show();
		        } else {
		            // Can't get location.
		            // GPS or network is not enabled.
		            // Ask user to enable GPS/network in settings.
		            //gps.showSettingsAlert();
		        	utils.logs("Run get_gps can not getGetLocation...");
		        }
				String GPS = MyMajiActivity.latitude+","+MyMajiActivity.longitude;
				utils.logs(GPS);
				//return new PluginResult(PluginResult.Status.OK, GPS);
				callbackContext.success(GPS);
			}
			else if(action.equals("unlink")){
				//檔案移除
				File f = new File(args.getString(0).trim());
				f.delete();				
				//return new PluginResult(PluginResult.Status.OK, "");
				callbackContext.success("");
			}else if(action.equals("mkdir")){
				//建立目錄
				//可以予許傳入多個資料夾路徑
				boolean status=true;
				JSONArray jArray = new JSONArray(args.getString(0).trim());				
				for(int i=0,max=jArray.length();i<max;i++)
				{
					//status &= new File(jArray.getString(i)).mkdirs();
					File fn = new File(jArray.getString(i));
					if(!fn.exists() && !fn.isDirectory())
					{
						utils.logs("Mkdir : "+jArray.getString(i));						
						utils.mkdirs(jArray.getString(i));
					}
				}				
				if(status)
				{
					//return new PluginResult(PluginResult.Status.OK, "true");
					utils.logs("Mkdir Success");
					callbackContext.success("true");
				}
				else
				{
					//return new PluginResult(PluginResult.Status.ERROR, "false");
					utils.logs("Mkdir Failure");
					callbackContext.error("false");
				}
			} else {
				//return new PluginResult(PluginResult.Status.INVALID_ACTION,
				//		"File Open False...: unknow file action.");
				callbackContext.error("");
			}
		} catch (Exception e) {
			//return new PluginResult(PluginResult.Status.INVALID_ACTION,
			//		"File Open False...:" + e.getMessage());
			callbackContext.error("File Open False...:" + e.getMessage());
		}
		return true;
	}

	public boolean isSynch(String action) {
		//return true; // always do async... 如果我哪天不寫 ios ，我覺得還是 return true 比較好用~_~
		return false;
	}


}