package tw.MyMaji.utils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.util.Base64;

public class utils {	
	public static String get_root_path(){
		String sd_root_path = "";
		/*String Try_PATH = "/storage/sdcard1";
		String m[] = Try_PATH.split(",");
		
		for(int i =0 ,max_i=m.length;i<max_i;i++)
		{
			if(new File(m[i]).exists())
			{
				sd_root_path=m[i].trim();
				break;
			}
		}*/
		if(sd_root_path=="")
		{
			File extStore = Environment.getExternalStorageDirectory();
			sd_root_path = extStore.toString().trim();
		}
		return sd_root_path;
	}
	public static String implode(String delim, String[] ary) {
		// 陣列轉成字串，delim 是組成間隔之符號
		StringBuilder out = new StringBuilder("");
		for (int i = 0, max_i = ary.length; i < max_i; i++) {
			if (i != 0) {
				out.append(delim);
			}
			out.append(ary[i]);
		}
		return out.toString();
	}
	public static boolean mkdirs(String path){
		return new File(path).mkdirs();
	}
	public static void logs(String input) {
		//System.out.println("GIS DEBUG: " + input);
	}
	public static byte[] image2byte(String path) throws IOException{
		Bitmap bitmapOrg = BitmapFactory.decodeFile(path);
		ByteArrayOutputStream bao = new ByteArrayOutputStream();
		bitmapOrg.compress(Bitmap.CompressFormat.PNG, 80, bao);
		byte [] buffer = bao.toByteArray();
		bitmapOrg.recycle();
        return buffer;
	}
	public static String addSlashes(String s) {
		// java將資料要放到 javascript 時常會因為跳脫符號造成塞不下或斷行，可以用這個解決
		s = s.replaceAll("\\\\", "\\\\\\\\");
		s = s.replaceAll("\\n", "\\\\n");
		s = s.replaceAll("\\r", "\\\\r");
		s = s.replaceAll("\\00", "\\\\0");
		s = s.replaceAll("'", "\\\\'");
		return s;
	}

	public static String mainname(String filename) {
		File theFile = new File(filename);
		return theFile.getName().replace("." + subname(filename), "");
	}

	public static String subname(String filename) {
		int dot = filename.lastIndexOf('.');
		return filename.substring(dot + 1);
	}

	public static String str_replace(String search, String replace,
			String subject) {
		StringBuffer result = new StringBuffer(subject);
		int pos = 0;
		while (true) {
			pos = result.indexOf(search, pos);
			if (pos != -1)
				result.replace(pos, pos + search.length(), replace);
			else
				break;
		}
		return result.toString();
	}

	public static void file_put_contents(String filename, String data)
			throws IOException {
		BufferedWriter out = new BufferedWriter(new FileWriter(filename));
		try {
			out.write(data);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		out.close();
	}

	/**
	 * @param filePath
	 *            the name of the file to open. Not sure if it can accept URLs
	 *            or just filenames. Path handling could be better, and buffer
	 *            sizes are hardcoded
	 */
	public static String readFileAsString(String filePath)
			throws java.io.IOException {
		/*
		 * FileReader fr = new FileReader(file); BufferedReader br = new
		 * BufferedReader(fr); StringBuilder tmp=new StringBuilder(""); String
		 * s;
		 * 
		 * while((s = br.readLine()) != null) { tmp.append(s); } br.close();
		 * fr.close();
		 */
		StringBuffer fileData = new StringBuffer("");
		BufferedReader reader = new BufferedReader(new FileReader(filePath));
		char[] buf = new char[8192];
		int numRead = 0;
		while ((numRead = reader.read(buf)) != -1) {
			// String readData = String.valueOf(buf, 0, numRead);
			fileData.append(String.valueOf(buf, 0, numRead));
			buf = new char[8192];
		}
		reader.close();
		return fileData.toString();
	}
	public static String convertStreamToString(InputStream is) throws Exception {
	    BufferedReader reader = new BufferedReader(new InputStreamReader(is));
	    StringBuilder sb = new StringBuilder();
	    String line = null;
	    while ((line = reader.readLine()) != null) {
	      sb.append(line).append("\n");
	    }
	    return sb.toString();
	}
	public static String file_get_contents(String filename) throws Exception {
		File fl = new File(filename);
		if(fl.exists())
		{
		    FileInputStream fin = new FileInputStream(fl);
		    String ret = utils.convertStreamToString(fin);
		    //utils.logs("filename output:"+ret);
		    //Make sure you close all streams.
		    fin.close();        
		    return ret;
		}
		else
		{
			return "";
		}
	}	
	public static String base64_encode(byte[] data)
	{
		return Base64.encodeToString(data,Base64.NO_WRAP);
	}
	public static boolean twoRectCross(double x1_left, double y1_top,
			double x1_right, double y1_bottom, double x2_left, double y2_top,
			double x2_right, double y2_bottom) {
		double tmp_left = max(x1_left, x2_left);
		double tmp_top = max(y1_top, y2_top);
		double tmp_right = min(x1_right, x2_right);
		double tmp_bottom = min(y1_bottom, y2_bottom);
		return (tmp_right >= tmp_left && tmp_bottom >= tmp_top);
	}

	public static double min(double a, double b) {
		if (a < b)
			return a;
		else
			return b;
	}

	public static double max(double a, double b) {
		if (a > b)
			return a;
		else
			return b;
	}

	public static void fileCopy(String srFile, String dtFile) throws IOException {
		  File f1 = new File(srFile);
		  File f2 = new File(dtFile);
		  InputStream in = new FileInputStream(f1);
		  
		  //For Append the file.
		//  OutputStream out = new FileOutputStream(f2,true);

		  //For Overwrite the file.
		  OutputStream out = new FileOutputStream(f2);

		  byte[] buf = new byte[1024];
		  int len;
		  while ((len = in.read(buf)) > 0){
			  out.write(buf, 0, len);
		  }
		  in.close();
		  out.close();
		  //System.out.println("File copied.");
		  //utils.logs("file copy :"+srFile+","+dtFile);
	}

	public static boolean fileMove(String srcFile, String destPath) {
		// File (or directory) to be moved
		File file = new File(srcFile);

		// Destination directory
		File dir = new File(destPath);

		// Move file to new directory
		boolean success = file.renameTo(new File(dir, file.getName()));
		//utils.logs("file move :"+srcFile+","+destPath);
		return success;
	}
    /**
     * Issue a POST request to the server.
     * @param url POST address.
     * @param params request parameters.
     *  
     *  List postData = new ArrayList();
		postData.add(new BasicNameValuePair("login_user", "sswu"));
		postData.add(new BasicNameValuePair("login_pw", "0123"));
     */	
	public static String file_get_contents_post(String aUrl,  List<NameValuePair> aArgList, Boolean aAppend) {
		String result = "";
		String url = aUrl;

		if (aArgList != null) {
			url += (aAppend ? "&" : "?") + URLEncodedUtils.format(aArgList, HTTP.UTF_8);
		}
		//if (SystemConfig.DebugMode) {
		//	System.out.println(url);
		//}
		HttpParams httpParameters = new BasicHttpParams();
		HttpConnectionParams.setConnectionTimeout(httpParameters, 30000);
		HttpConnectionParams.setSoTimeout(httpParameters, 30000);
		DefaultHttpClient httpClient = new DefaultHttpClient(httpParameters);

		HttpGet get = new HttpGet(url);
		result+="=5";
		get.setHeader("User-Agent", "Mozilla/5.0 (Linux; U; Android 2.2; zh-tw; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1)");
		result+="=6";
		HttpResponse response;
		try {
			result+="=7";
			response = httpClient.execute(get);
			result+="=8";
			// result = new String(EntityUtils.toString(response.getEntity()).getBytes("ISO-8859-1"), "UTF-8");
			result = EntityUtils.toString(response.getEntity());
			//result+="=9";
			//if (SystemConfig.DebugMode) {
			//	System.out.println(result);
			//}
			// result = new String(EntityUtils.toString(response.getEntity()).getBytes("UTF-8"),"UTF-8");
		} catch (ClientProtocolException e) {
			result+="ex1="+e.getMessage();
			e.printStackTrace();
		} catch (IOException e) {
			result+="ex2="+e.getMessage();
			e.printStackTrace();
		} catch (Exception e) {
			result+="ex3="+e.getMessage();
			e.printStackTrace();
		}finally{
			//result+="=finally=";
		}
		
		return result;
	}
	
}
