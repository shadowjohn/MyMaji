package tw.MyMaji;



//import org.apache.cordova.CordovaWebViewClient;
//import org.apache.cordova.DroidGap;

import java.util.Map;
import java.util.TreeMap;

import org.apache.cordova.*;

import tw.MyMaji.R;
import tw.MyMaji.GPSTracker;


import android.app.AlertDialog;
//import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.webkit.WebSettings;
import android.webkit.WebView;



//final public class myGoogleMapActivity extends DroidGap implements OnTouchListener {
final public class MyMajiActivity extends DroidGap {
	static public double latitude =0 ;
	static public double longitude=0 ;
	public static Map<String,Long> BBOX = new TreeMap<String,Long>();
	static public GPSTracker gps;
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// 修正 httpRequest httpGetPost 的問題
		// http://flipper.pixnet.net/blog/post/36169513-android-3.0-%E7%99%BC%E7%94%9F-android.os.networkonmainthreadexception

		
		//Use GPS
				CheckEnableGPS();
				
				
				// Create class object
		        gps = new GPSTracker(MyMajiActivity.this);

		        // Check if GPS enabled
		        if(gps.canGetLocation()) {

		             latitude = gps.getLatitude();
		             longitude = gps.getLongitude();

		            // \n is for new line
		           // Toast.makeText(getApplicationContext(), "Your Location is - \nLat: " + latitude + "\nLong: " + longitude, Toast.LENGTH_LONG).show();
		        } else {
		            // Can't get location.
		            // GPS or network is not enabled.
		            // Ask user to enable GPS/network in settings.
		            //gps.showSettingsAlert();
		        }
		
		super.init();
		super.appView.clearCache(true);
		WebSettings settings = this.appView.getSettings();
		settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
		super.setIntegerProperty("loadUrlTimeoutValue", 60000);
		// setContentView(R.layout.main);
		// super.appView.getSettings().setJavaScriptEnabled(true);
		// getScreenSize(); //取得螢幕大小 暫時好像用不到

		super.appView.setScrollBarStyle(0);
		super.appView.addJavascriptInterface(this, "ez");
		super.appView.setPadding(0, 0, 0, 0);
		super.appView.setInitialScale(100);
		settings.setSupportZoom(false);
		settings.setBuiltInZoomControls(false);
		//super.appView.setOnTouchListener((OnTouchListener) this);
		super.appView.setDrawingCacheEnabled(false);
		super.appView.setAlwaysDrawnWithCacheEnabled(false);
		super.appView.setLongClickable(true);
		super.appView.setClipChildren(false);
		super.appView.setKeepScreenOn(true);

		//super.appView.setLayerType(View.LAYER_TYPE_NONE, null);
		super.loadUrl("file:///android_asset/www/index.html");	
	    super.appView.setWebViewClient(new CordovaWebViewClient(this, super.appView) {
	        @Override
	        public boolean shouldOverrideUrlLoading(WebView view, String url) {
	            return false;
	        }
	    });  		
	}
	  private void CheckEnableGPS(){
		    String provider = Settings.Secure.getString(getContentResolver(),
		      Settings.Secure.LOCATION_PROVIDERS_ALLOWED);
		       if(!provider.equals("")){
		          //GPS Enabled
		          //Toast.makeText(this, "GPS Enabled: " + provider,
		          //Toast.LENGTH_LONG).show();
		       }else{
		          //Intent intent = new Intent(Settings.ACTION_SECURITY_SETTINGS);
		          // startActivity(intent);
		    	   new AlertDialog.Builder(MyMajiActivity.this)
					.setIcon(R.drawable.icon).setTitle(R.string.app_name)
					.setMessage("GPS尚未開啟，請您先「離開系統」到「設定」->「位置」，開啟GPS!!!")
					.setNegativeButton("確定", new DialogInterface.OnClickListener() {
						// @Override
						public void onClick(DialogInterface dialog, int which) {

						}
					}).show();
		       }

		   }
	@Override
	public void onDestroy(){
		android.os.Process.killProcess(android.os.Process.myPid());
		finish();
	}
	//@Override
	//public boolean onTouch(View v, MotionEvent event) {
	//	return false;
	//}

	//private void useJavascript(final String jsCode) {
	//	sendJavascript(jsCode);
	//}
}