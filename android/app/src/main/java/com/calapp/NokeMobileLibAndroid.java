/*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
REACT NATIVE HELPERS
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
getConstants()                | (n/a)
getName()                     | (n/a)
emitDeviceEvent()             | eventName,params

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
CORE MOBILE FUNCTIONALITY
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
initiateNokeService()         | Promise
mNokeServiceListener          | new NokeServiceListener() {...
mServiceConnection            | new ServiceConnection() {...
NokeMobileLibAndroid()        | ReactApplicationContext

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
LISTENERS
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
onBluetoothStatusChanged()    | int
onDataUploaded()              | int,String
onError()                     | NokeDevice,int,String
onNokeConnected()             | NokeDevice
onNokeConnecting()            | NokeDevice
onNokeDisconnected()          | NokeDevice noke
onNokeDiscovered()            | NokeDevice
onNokeShutdown()              | NokeDevice,Boolean,Boolean
onNokeSyncing()               | NokeDevice
onNokeUnlocked()              | NokeDevice
onServiceConnected()          | ComponentName,IBinder
onServiceDisconnected()       | ComponentName

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
REACT METHODS
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
EMITTED EVENTS
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
onBluetoothStatusChanged
onError
onNokeConnected
onNokeConnecting
onNokeDisconnected
onNokeDiscovered
onNokeShutdown
onNokeSyncing
onNokeUnlocked
onServiceConnected
onServiceDisconnected

*/
package com.calapp;

import java.util.Map;
import java.util.HashMap;
import java.nio.charset.Charset;

import android.annotation.TargetApi;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.ServiceConnection;
import android.Manifest;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import androidx.annotation.Nullable;
import android.util.Log;
import android.util.Log;
import android.view.View;

import com.noke.nokemobilelibrary.NokeDefines;
import com.noke.nokemobilelibrary.NokeDeviceManagerService;
import com.noke.nokemobilelibrary.NokeDevice;
import com.noke.nokemobilelibrary.NokeMobileError;
import com.noke.nokemobilelibrary.NokeServiceListener;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class NokeMobileLibAndroid extends ReactContextBaseJavaModule {
    public static final String TAG = MainActivity.class.getSimpleName();
    private NokeDeviceManagerService mNokeService = null;
    private NokeDevice currentNoke;
    static ReactApplicationContext reactContext;

    NokeMobileLibAndroid(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        Log.d("NokeMobileLibAndroid", "🔸🔸 ReactApplicationContext()");
    }

    @Override
    public String getName() {
        return "NokeMobileLibAndroid";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Charset charset = Charset.forName("UTF-8");
        final Map<String, Object> constants = new HashMap<>();
        constants.put("NOKE_LOCK_STATE_UNKNOWN", "Unknown"); // NOKE_LOCK_STATE_UNKNOWN.NokeDefines (int -1)
        constants.put("NOKE_LOCK_STATE_UNLOCKED", "Unlocked"); // NOKE_LOCK_STATE_UNLOCKED.NokeDefines (int 0)
        constants.put("NOKE_LOCK_STATE_UNSHACKLED", "Unshackled"); // NOKE_LOCK_STATE_UNSHACKLED.NokeDefines (int 2)
        constants.put("NOKE_LOCK_STATE_LOCKED", "Locked"); // NOKE_LOCK_STATE_LOCKED.NokeDefines (int 3)
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

    private void emitDeviceEvent(String eventName, @Nullable WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

    @ReactMethod
    public void initiateNokeService(Promise promise) {
        Log.d("NokeMobileLibAndroid", "🔸🔸 initiateNokeService()");
        try {
            // ReactApplicationContext reactApplicationContext = super.getReactApplicationContextIfActiveOrWarn();
            // Intent nokeServiceIntent = new Intent(reactApplicationContext, NokeDeviceManagerService.class);
            // reactApplicationContext.bindService(nokeServiceIntent, mServiceConnection, Context.BIND_AUTO_CREATE);
            // boolean event = true;
            // promise.resolve(event);
            Intent nokeServiceIntent = new Intent(reactContext, NokeDeviceManagerService.class);
            reactContext.bindService(nokeServiceIntent, mServiceConnection, Context.BIND_AUTO_CREATE);
            boolean event = true;
            promise.resolve(event);
        } catch (Exception e) {
            promise.reject("RNNM_ERROR", "initiateMokeService() failed.", e);
        }
    }

    private ServiceConnection mServiceConnection = new ServiceConnection() {
        public void onServiceConnected(ComponentName className, IBinder rawBinder) {
            Log.w(TAG, "ON SERVICE CONNECTED");

            //Store reference to service
            mNokeService = ((NokeDeviceManagerService.LocalBinder) rawBinder).getService(NokeDefines.NOKE_LIBRARY_SANDBOX);

            // mNokeService.setAllowAllDevices(true); // Uncomment to allow devices that aren't in the device array
            // String[] macs = { "D0:07:69:1B:8A:3A", "D6:B1:8B:99:A7:D3", "EA:EC:51:08:21:CF" };
            String[] macs = { "D6:B1:8B:99:A7:D3" };

            // Register callback listener
            mNokeService.registerNokeListener(mNokeServiceListener);

            for (String mac:macs) {
                // Add locks to device manager
                NokeDevice nokeA = new NokeDevice("LOCK A", mac);
                mNokeService.addNokeDevice(nokeA);
                // NokeDevice nokeB = new NokeDevice("LOCK B", mac);
                // mNokeService.addNokeDevice(nokeB);
                // NokeDevice nokeLegacy = new NokeDevice("LEGACY LOCK", mac);
                // mNokeService.addNokeDevice(nokeLegacy);
            }

            // Start bluetooth scanning
            mNokeService.startScanningForNokeDevices();
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
            // maybe console whole map...
            Log.d("NokeServiceListener", "NOKE DISCOVERED: " + noke.getName());
            final WritableMap event = Arguments.createMap();
            event.putString("name", noke.getName());
            event.putString("mac", noke.getMac());
            event.putString("hwVersion", noke.getVersion());
            event.putInt("lockState", noke.getLockState());
            event.putInt("connectionState", noke.getConnectionState());
            emitDeviceEvent("onNokeDiscovered", event);
        }

        @Override
        public void onNokeConnecting(NokeDevice noke) {
            Log.d("NokeServiceListener", "NOKE CONNECTING: " + noke.getName());
            final WritableMap event = Arguments.createMap();
            event.putString("name", noke.getName());
            event.putString("mac", noke.getMac());
            event.putString("hwVersion", noke.getVersion());
            emitDeviceEvent("onNokeConnecting", event);
        }

        @Override
        public void onNokeConnected(NokeDevice noke) {
          final WritableMap event = Arguments.createMap();
          event.putString("name", noke.getName());
          event.putString("mac", noke.getMac());
          event.putString("session", noke.getSession());
          event.putInt("battery", noke.getBattery());
          event.putString("hwVersion", noke.getVersion());
          emitDeviceEvent("onNokeConnected", event);
        }

        @Override
        public void onNokeSyncing(NokeDevice noke) {
          final WritableMap event = Arguments.createMap();
          event.putString("name", noke.getName());
          event.putString("mac", noke.getMac());
          event.putString("session", noke.getSession());
          emitDeviceEvent("onNokeSyncing", event);
        }

        @Override
        public void onNokeUnlocked(NokeDevice noke) {
          final WritableMap event = Arguments.createMap();
          event.putString("name", noke.getName());
          event.putString("mac", noke.getMac());
          event.putString("session", noke.getSession());
          emitDeviceEvent("onNokeUnlocked", event);
        }

        @Override
        public void onNokeDisconnected(NokeDevice noke) {
          final WritableMap event = Arguments.createMap();
          event.putString("name", noke.getName());
          event.putString("mac", noke.getMac());
          event.putString("session", noke.getSession());
          emitDeviceEvent("onNokeDisconnected", event);
          mNokeService.uploadData();
        }

        @Override
        public void onNokeShutdown(NokeDevice noke, Boolean isLocked, Boolean didTimeout) {
          final WritableMap event = Arguments.createMap();
          event.putString("name", noke.getName());
          event.putString("mac", noke.getMac());
          event.putBoolean("isLocked", isLocked);
          event.putBoolean("didTimeout", didTimeout);
          emitDeviceEvent("onNokeShutdown", event);
        }

        @Override
        public void onDataUploaded(int i, String s) {
        }

        @Override
        public void onBluetoothStatusChanged(int bluetoothStatus) {
          final WritableMap event = Arguments.createMap();
          event.putInt("code", bluetoothStatus);
          emitDeviceEvent("onBluetoothStatusChanged", event);
        }

        @Override
        public void onError(NokeDevice noke, int error, String message) {
            Log.e(TAG, "NOKE SERVICE ERROR " + error + ": " + message);
        }

    };
};
