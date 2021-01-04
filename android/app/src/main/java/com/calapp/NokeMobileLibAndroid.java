package com.calapp;

import java.util.Map;
import java.util.HashMap;
import java.nio.charset.Charset;

import android.os.Handler;
import android.content.ComponentName;
import android.os.Build;
import android.util.Log;
import android.os.IBinder;
import android.content.Intent;
import android.content.Context;
import android.content.ServiceConnection;


import android.Manifest;
import android.annotation.TargetApi;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.os.Looper;
// import android.support.annotation.NonNull;
// import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
// import android.widget.EditText;
// import android.widget.LinearLayout;
// import android.widget.TextView;


import com.noke.nokemobilelibrary.NokeDefines;
import com.noke.nokemobilelibrary.NokeDeviceManagerService;
import com.noke.nokemobilelibrary.NokeDevice;
import com.noke.nokemobilelibrary.NokeMobileError;
import com.noke.nokemobilelibrary.NokeServiceListener;

// import com.facebook.react.bridge.Arguments;
// import com.facebook.react.bridge.ReadableMap;
// import com.facebook.react.bridge.WritableMap;
// import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NokeMobileLibAndroid extends ReactContextBaseJavaModule {
    public static final String TAG = MainActivity.class.getSimpleName();
    // TextView lockNameText, statusText;
    // LinearLayout lockLayout;
    private NokeDeviceManagerService mNokeService = null;
    // private static final int PERMISSION_REQUEST_COARSE_LOCATION = 1;
    private NokeDevice currentNoke;

    NokeMobileLibAndroid(ReactApplicationContext reactContext) {
        super(reactContext);

        Log.d("NokeMobileLibAndroid", "🔸🔸🔸 ReactApplicationContext()");
    }

    @Override
    public String getName() {
        return "NokeMobileLibAndroid";
    }

    @ReactMethod
    public void createNokeEvent(String name, String location) {
        Log.d("NokeMobileLibAndroid", "🔸🔸 Create event called with name: " + name + " and location: " + location);
    }

    @ReactMethod
    public void initiateNokeService(Promise promise) {
        Log.d("NokeMobileLibAndroid", "🔸🔸🔸 initiateNokeService()");
        try {
            ReactApplicationContext reactApplicationContext = super.getReactApplicationContextIfActiveOrWarn();
            Intent nokeServiceIntent = new Intent(reactApplicationContext, NokeDeviceManagerService.class);
            reactApplicationContext.bindService(nokeServiceIntent, mServiceConnection, Context.BIND_AUTO_CREATE);
            boolean event = true;
            promise.resolve(event);
        } catch (Exception e) {
            promise.reject("RNNM_ERROR", "initiateMokeService() failed.", e);
        }
    }

    @Override
    public Map<String, Object> getConstants() {
        final Charset charset = Charset.forName("UTF-8");
        final Map<String, Object> constants = new HashMap<>();

        constants.put("NOKE_LOCK_STATE_UNKNOWN", NokeDefines.NOKE_LOCK_STATE_UNKNOWN); // [int]
        constants.put("NOKE_LOCK_STATE_UNLOCKED", NokeDefines.NOKE_LOCK_STATE_UNLOCKED); // [int]
        constants.put("NOKE_LOCK_STATE_UNSHACKLED", NokeDefines.NOKE_LOCK_STATE_UNSHACKLED); // [int]
        constants.put("NOKE_LOCK_STATE_LOCKED", NokeDefines.NOKE_LOCK_STATE_LOCKED); // [int]
        constants.put("NOKE_HW_TYPE_1ST_GEN_PADLOCK", NokeDefines.NOKE_HW_TYPE_1ST_GEN_PADLOCK); // [String]
        constants.put("NOKE_HW_TYPE_2ND_GEN_PADLOCK", NokeDefines.NOKE_HW_TYPE_2ND_GEN_PADLOCK); // [String]
        constants.put("NOKE_HW_TYPE_ULOCK", NokeDefines.NOKE_HW_TYPE_ULOCK); // [String]
        constants.put("NOKE_HW_TYPE_HD_LOCK", NokeDefines.NOKE_HW_TYPE_HD_LOCK); // [String]
        constants.put("NOKE_HW_TYPE_DOOR_CONTROLLER", NokeDefines.NOKE_HW_TYPE_DOOR_CONTROLLER); // [String]
        constants.put("NOKE_HW_TYPE_PB12", NokeDefines.NOKE_HW_TYPE_PB12); // [String]
        constants.put("NOKE_LIBRARY_SANDBOX", NokeDefines.NOKE_LIBRARY_SANDBOX); // [int]
        constants.put("NOKE_LIBRARY_PRODUCTION", NokeDefines.NOKE_LIBRARY_PRODUCTION); // [int]
        constants.put("NOKE_LIBRARY_DEVELOP", NokeDefines.NOKE_LIBRARY_DEVELOP); // [int]
        constants.put("NOKE_LIBRARY_OPEN", NokeDefines.NOKE_LIBRARY_OPEN); // [int]

        return constants;
    }

    private ServiceConnection mServiceConnection = new ServiceConnection() {
        public void onServiceConnected(ComponentName className, IBinder rawBinder) {
            Log.w(TAG, "ON SERVICE CONNECTED");

            //Store reference to service
            mNokeService = ((NokeDeviceManagerService.LocalBinder) rawBinder).getService(NokeDefines.NOKE_LIBRARY_SANDBOX);

            //Uncomment to allow devices that aren't in the device array
            // mNokeService.setAllowAllDevices(true);

            //Register callback listener
            mNokeService.registerNokeListener(mNokeServiceListener);

            // String[] macs = { "D6:B1:8B:99:A7:D3", "D0:07:69:1B:8A:3A", "EA:EC:51:08:21:CF" };
            String[] macs = { "D6:B1:8B:99:A7:D3" };

            for (String mac:macs
                 ) {
                // Add locks to device manager
                NokeDevice noke1 = new NokeDevice(mac, mac);
                mNokeService.addNokeDevice(noke1);
            }

            // Start bluetooth scanning
            mNokeService.startScanningForNokeDevices();
            // setStatusText("Scanning for Noke Devices");
            Log.d("mServiceConnection", "Scanning for Noke Devices");


            if (!mNokeService.initialize()) {
                Log.e(TAG, "Unable to initialize Bluetooth");
            }
        }

        public void onServiceDisconnected(ComponentName classname) {
            mNokeService = null;
        }
    };

    private NokeServiceListener mNokeServiceListener = new NokeServiceListener() {
        @Override
        public void onNokeDiscovered(NokeDevice noke) {


            // setLockLayoutColor(getResources().getColor(R.color.nokeBlue));

            String lockState = "";
            switch (noke.getLockState()){
                case NokeDefines.NOKE_LOCK_STATE_LOCKED:
                    lockState = "Locked";
                    break;
                case NokeDefines.NOKE_LOCK_STATE_UNLOCKED:
                    lockState = "Unlocked";
                    break;
                case NokeDefines.NOKE_LOCK_STATE_UNSHACKLED:
                    lockState = "Unshackled";
                    break;
                case NokeDefines.NOKE_LOCK_STATE_UNKNOWN:
                    lockState = "Unknown";
                    break;
            }

            currentNoke = noke;
            // setStatusText("NOKE DISCOVERED: " + noke.getName() + " (" + lockState + ")");
            Log.d("NokeServiceListener", "NOKE DISCOVERED: " + noke.getName() + " (" + lockState + ")");
            mNokeService.connectToNoke(currentNoke);

        }

        @Override
        public void onNokeConnecting(NokeDevice noke) {
            // setStatusText("NOKE CONNECTING: " + noke.getName());
            Log.d("onNokeConnecting", "NOKE CONNECTING: " + noke.getName());
        }

        @Override
        public void onNokeConnected(NokeDevice noke) {
            // setStatusText("NOKE CONNECTED: " + noke.getName());
            Log.d("onNokeConnected", "NOKE CONNECTED: " + noke.getName());
            // setLockNameText(noke.getName());
            Log.d("onNokeConnected", "setLockNameText(): " + noke.getName());
            // setLockLayoutColor(getResources().getColor(R.color.nokeBlue));
            currentNoke = noke;
            mNokeService.stopScanning();
        }

        @Override
        public void onNokeSyncing(NokeDevice noke) {
            // setStatusText("NOKE SYNCING: " + noke.getName());
            Log.d("onNokeSyncing", "NOKE SYNCING: " + noke.getName());

        }

        @Override
        public void onNokeUnlocked(NokeDevice noke) {
            // setStatusText("NOKE UNLOCKED: " + noke.getName());
            Log.d("onNokeUnlocked", "NOKE UNLOCKED: " + noke.getName());
            // setLockLayoutColor(getResources().getColor(R.color.unlockGreen));
        }

        @Override
        public void onNokeShutdown(NokeDevice noke, Boolean isLocked, Boolean didTimeout) {
            // setStatusText("NOKE SHUTDOWN: " + noke.getName() + " LOCKED: " + isLocked + " TIMEOUT: " + didTimeout);
            Log.d("onNokeShutdown", "NOKE SHUTDOWN: " + noke.getName() + " LOCKED: " + isLocked + " TIMEOUT: " + didTimeout);
        }

        @Override
        public void onNokeDisconnected(NokeDevice noke) {
            // setStatusText("NOKE DISCONNECTED: " + noke.getName());
            Log.d("onNokeDisconnected", "NOKE DISCONNECTED: " + noke.getName());
            // setLockLayoutColor(getResources().getColor(R.color.disconnectGray));
            // setLockNameText("No Lock Connected");
            Log.d("onNokeConnected", "setLockNameText(): No Lock Connected");
            currentNoke = null;
            //mNokeService.uploadData();
            mNokeService.startScanningForNokeDevices();
            mNokeService.setBluetoothScanDuration(8000);
        }

        @Override
        public void onDataUploaded(int result, String message) {
            Log.w(TAG, "DATA UPLOADED: " + message);
            // setStatusText(message);
            Log.d("onDataUploaded", message);
        }

        @Override
        public void onBluetoothStatusChanged(int bluetoothStatus) {

        }

        @Override
        public void onError(NokeDevice noke, int error, String message) {
            Log.e(TAG, "NOKE SERVICE ERROR " + error + ": " + message);
            // switch (error){
            //     case NokeMobileError.ERROR_LOCATION_PERMISSIONS_NEEDED:
            //         break;
            //     case NokeMobileError.ERROR_LOCATION_SERVICES_DISABLED:
            //         if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
            //         {
            //             Handler handler = new Handler(Looper.getMainLooper());
            //             handler.post(new Runnable() {
            //                 @Override @TargetApi(23)
            //                 public void run() {
            //                     android.support.v7.app.AlertDialog alertDialog = new android.support.v7.app.AlertDialog.Builder(MainActivity.this).create();
            //                     alertDialog.setTitle(getString(R.string.location_access_required));
            //                     alertDialog.setMessage(getString(R.string.location_permission_request_message));
            //                     alertDialog.setButton(android.support.v7.app.AlertDialog.BUTTON_NEUTRAL, "OK",
            //                             new DialogInterface.OnClickListener() {
            //                                 public void onClick(DialogInterface dialog, int which) {
            //                                     dialog.dismiss();
            //                                 }
            //                             });
            //                     alertDialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
            //                         @Override
            //                         public void onDismiss(DialogInterface dialog)
            //                         {
            //                             requestPermissions(new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, PERMISSION_REQUEST_COARSE_LOCATION);

            //                         }
            //                     });
            //                     alertDialog.show();
            //                 }
            //             });
            //         }
            //         break;
            //     case NokeMobileError.ERROR_BLUETOOTH_DISABLED:
            //         break;
            //     case NokeMobileError.ERROR_BLUETOOTH_GATT:
            //         break;
            //     case NokeMobileError.DEVICE_ERROR_INVALID_KEY:
            //         break;
            // }
        }
    };

    // public void setStatusText(final String message) {
    //     Log.d(TAG, message);
    //     Handler handler = new Handler(Looper.getMainLooper());
    //     handler.post(new Runnable() {
    //         @Override
    //         public void run() {
    //             statusText.setText(message);
    //         }
    //     });
    // }

    // public void setLockNameText(final String message){
    //     Handler handler = new Handler(Looper.getMainLooper());
    //     handler.post(new Runnable() {
    //         @Override
    //         public void run() {
    //             lockNameText.setText(message);
    //         }
    //     });
    // }

    // public void setLockLayoutColor(final int color){
    //     Handler handler = new Handler(Looper.getMainLooper());
    //     handler.post(new Runnable() {
    //         @Override
    //         public void run() {
    //             lockLayout.setBackgroundColor(color);
    //         }
    //     });
    // }

}
