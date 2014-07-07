package tw.MyMaji;



//import org.apache.cordova.CordovaWebViewClient;
//import org.apache.cordova.DroidGap;

import org.apache.cordova.*;

import tw.myGoogleMap.R;

//import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.webkit.WebSettings;
import android.webkit.WebView;



//final public class myGoogleMapActivity extends DroidGap implements OnTouchListener {
final public class MyMajiActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// 修正 httpRequest httpGetPost 的問題
		// http://flipper.pixnet.net/blog/post/36169513-android-3.0-%E7%99%BC%E7%94%9F-android.os.networkonmainthreadexception

		
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
		//super.appView.setLayerType(View.LAYER_TYPE_NONE, null);
		super.loadUrl("file:///android_asset/www/index.html");	
	    super.appView.setWebViewClient(new CordovaWebViewClient(this, super.appView) {
	        @Override
	        public boolean shouldOverrideUrlLoading(WebView view, String url) {
	            return false;
	        }
	    });  		
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