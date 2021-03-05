package com.timelockr;

import android.content.Intent;
import android.content.res.Configuration;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
    return "timelockr";
    }

    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    //     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
    //         WindowManager.LayoutParams layoutParams = new WindowManager.LayoutParams();
    //         layoutParams.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
    //         getWindow().setAttributes(layoutParams);
    //         getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
    //         getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
    //     }
    //     super.onCreate(savedInstanceState);
    // }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        sendBroadcast(intent);
    }
}
