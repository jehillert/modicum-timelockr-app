/*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
REACT NATIVE HELPERS
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
getConstants()               public | (n/a)
getName()                    public | (n/a)
emitDeviceEvent()           private | eventName,params

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
CORE MOBILE FUNCTIONALITY
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
initiateNokeService()        public | Promise ==> void
mNokeServiceListener         Initialized immediately in Android.
mServiceConnection           Initialized immediately in Android.

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
NOKE SERVICE LISTENER - Private NokeServiceListener()
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
onBluetoothStatusChanged()    public | int
onDataUploaded()              public | int,String
onError()                     public | NokeDevice,int,String
onNokeConnected()             public | NokeDevice
onNokeConnecting()            public | NokeDevice
onNokeDisconnected()          public | NokeDevice noke
onNokeDiscovered()            public | NokeDevice
onNokeShutdown()              public | NokeDevice,Boolean,Boolean
onNokeSyncing()               public | NokeDevice
onNokeUnlocked()              public | NokeDevice

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
REACT METHODS (all void)
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
setBluetoothDelayDefault()            public | int,Promise
setBluetoothDelayBackgroundDefault()  public | int,Promise
setBluetoothScanDuration()            public | int,Promise
startScan()                           public | Promise
stopScan()                            public | Promise
sendCommands()                        public | String,String,Promise
addNokeDevice()                       public | ReadableMap,Promise
addNokeOfflineValues()                public | ReadableMap,Promise
connect()                             public | String,Promise
disconnect()                          public | String,Promise
removeAllNokes()                      public | Promise
removeNokeDevice()                    public | String,Promise
offlineUnlock()                       public | String,Promise

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
SERVICE CONNECTION - private ServiceConnection...
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
onServiceConnected()          public | ComponentName,IBinder
onServiceDisconnected         public | ComponentName

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
HELPERS
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
createCommonEvents       private | NokeDevice => WritableMap

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
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class NokeAndroidMobileLibrary extends ReactContextBaseJavaModule {
    // public static final String TAG = "NOKE_ANDROID";
    public static final String TAG = "🔸🔸🔸 @RN_NOKE_ANDROID";
    public static final String TAG_LISTEN = "🔹🔹🔹 @RN_Listen";
    public static final String TAG_RN_METHOD = "🔸🔸🔸 @RN_Method";
    private NokeDeviceManagerService mNokeService = null;
    private NokeDevice currentNoke;
    static ReactApplicationContext reactContext;

    NokeAndroidMobileLibrary(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        Log.i(TAG, "BINDING REACT_APPLICATION_CONTEXT");
    }

    @Override
    public String getName() {
        return "NokeAndroidMobileLibrary";
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
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @ReactMethod
    public void initiateNokeService(Promise promise) {
        Log.i(TAG, "NOKE SERVICE INITIATED");
        try {
            Intent nokeServiceIntent = new Intent(reactContext, NokeDeviceManagerService.class);
            reactContext.bindService(nokeServiceIntent, mServiceConnection, Context.BIND_AUTO_CREATE);
            boolean event = true;
            promise.resolve(event);
        } catch (Exception e) {
            promise.reject("RNNM_ERROR", "initiateMokeService() failed.", e);
        }
    }

    @ReactMethod
    private void setBluetoothDelayDefault(int delay, Promise promise) {
        Log.i(TAG_RN_METHOD, "setBluetoothDelayDefault()");
        try {
            if (mNokeService == null) {
                promise.reject("message", "mNokeService is null");
                return;
            }
            mNokeService.setBluetoothDelayDefault(delay);
            final WritableMap event = Arguments.createMap();
            event.putBoolean("status", true);

            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    private void setBluetoothDelayBackgroundDefault(int delay, Promise promise) {
        Log.i(TAG_RN_METHOD, "setBluetoothDelayBackgroundDefault()");
        try {
            if (mNokeService == null) {
                promise.reject("message", "mNokeService is null");
                return;
            }
            mNokeService.setBluetoothDelayBackgroundDefault(delay);
            final WritableMap event = Arguments.createMap();
            event.putBoolean("status", true);

            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    private void setBluetoothScanDuration(int duration, Promise promise) {
        Log.i(TAG_RN_METHOD, "setBluetoothScanDuration()");
        try {
            if (mNokeService == null) {
                promise.reject("message", "mNokeService is null");
                return;
            }
            mNokeService.setBluetoothScanDuration(duration);
            final WritableMap event = Arguments.createMap();
            event.putBoolean("status", true);

            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void startScan(Promise promise) {
        Log.i(TAG_RN_METHOD, "STARTING SCAN");
        try {
            mNokeService.startScanningForNokeDevices();
            final WritableMap event = Arguments.createMap();
            event.putBoolean("status", true);

            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void stopScan(Promise promise) {
        Log.i(TAG_RN_METHOD, "STOPPING SCAN");
        try {
            mNokeService.stopScanning();
            final WritableMap event = Arguments.createMap();
            event.putBoolean("status", true);

            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    // @ReactMethod
    // public
    @ReactMethod
    public void addNokeDevice(ReadableMap data, Promise promise) {
        Log.i(TAG_RN_METHOD, "ADDING NOKE DEVICE");
        try {
            /**
             * name: "Lock Name"
             * mac: "XX:XX:XX:XX:XX:XX"
             */
            if (data == null) {
                promise.reject("message", "data is null");
                return;
            }

            NokeDevice noke = new NokeDevice(data.getString("name"), data.getString("mac"));

            if (mNokeService == null) {
                promise.reject("message", "mNokeService is null");
                return;
            }
            mNokeService.addNokeDevice(noke);

            final WritableMap event = Arguments.createMap();
            event.putBoolean("status", true);

            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void addNokeOfflineValues(ReadableMap data, Promise promise) {
        Log.i(TAG_RN_METHOD, "ADDING NOKE OFFLINE VALUES");
        try {
            /**
             * name: "Lock Name"
             * mac: "XX:XX:XX:XX:XX:XX"
             * key: "OFFLINE_KEY"
             * cmd: "OFFLINE_COMMAND"
             */
            if (data == null) {
                promise.reject("message", "data is null");
                return;
            }

            NokeDevice noke = new NokeDevice(data.getString("name"), data.getString("mac"));
            noke.setOfflineKey(data.getString("key"));
            noke.setOfflineUnlockCmd(data.getString("cmd"));

            if (mNokeService == null) {
                promise.reject("message", "mNokeService is null");
                return;
            }
            mNokeService.addNokeDevice(noke);

            final WritableMap event = Arguments.createMap();
            event.putBoolean("status", true);

            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void sendCommands(String mac, String command, Promise promise) {
        Log.i(TAG_RN_METHOD, "SENDING COMMAND " + command + " FOR DEVICE WITH MAC ADDRESS " + mac);
        try {
            NokeDevice daNoke = mNokeService.nokeDevices.get(mac);
            if (daNoke == null) {
                promise.reject("message", "unable to sendCommands, noke not found");
                return;
            }
            daNoke.sendCommands(command);
            promise.resolve(createCommonEvents(daNoke));
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void connect(String mac, Promise promise) {
        Log.i(TAG_RN_METHOD, "CONNECTING");
        if (mNokeService == null) {
            promise.reject("message", "mNokeService is null");
            return;
        }
        NokeDevice daNoke = mNokeService.nokeDevices.get(mac);
        if (daNoke == null) {
            promise.reject("message", "unable to connect, noke not found");
            return;
        }

        mNokeService.connectToNoke(daNoke);

        final WritableMap event = Arguments.createMap();
        event.putBoolean("status", true);
        promise.resolve(event);
    }

    @ReactMethod
    public void disconnect(String mac, Promise promise) {
        Log.i(TAG_RN_METHOD, "DISCONNECTING");
        if (mNokeService == null) {
            promise.reject("message", "mNokeService is null");
            return;
        }
        NokeDevice daNoke = mNokeService.nokeDevices.get(mac);
        if (daNoke == null) {
            promise.reject("message", "unable to disconnect, noke not found");
            return;
        }

        mNokeService.disconnectNoke(daNoke);

        final WritableMap event = Arguments.createMap();
        event.putBoolean("status", true);
        promise.resolve(event);
    }

    @ReactMethod
    public void removeAllNokes(Promise promise) {
        Log.i(TAG_RN_METHOD, "REMOVING ALL NOKES");
        try {
            mNokeService.removeAllNoke();
            final WritableMap event = Arguments.createMap();
            event.putBoolean("status", true);

            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void removeNokeDevice(String mac, Promise promise) {
        Log.i(TAG_RN_METHOD, "REMOVING NOKE DEVICE");
        try {
            mNokeService.removeNokeDevice(mac);

            final WritableMap event = Arguments.createMap();
            event.putBoolean("status", true);

            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void offlineUnlock(String mac, Promise promise) {
        Log.i(TAG_RN_METHOD, "UNLOCKING OFFLINE");
        try {
            NokeDevice daNoke = mNokeService.nokeDevices.get(mac);
            if (daNoke == null) {
                promise.reject("message", "unable to offlineUnlock, noke not found");
                return;
            }

            WritableMap event = createCommonEvents(daNoke);

            if (daNoke == null) {
                event.putBoolean("success", false);
            } else {
                event.putBoolean("success", true);
                daNoke.offlineUnlock();
            }
            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    private ServiceConnection mServiceConnection = new ServiceConnection() {
        public void onServiceConnected(ComponentName className, IBinder rawBinder) {
            Log.i(TAG, "ON SERVICE CONNECTED");

            mNokeService = ((NokeDeviceManagerService.LocalBinder) rawBinder)
                    .getService(NokeDefines.NOKE_LIBRARY_SANDBOX);
            mNokeService.setAllowAllDevices(true);
            mNokeService.registerNokeListener(mNokeServiceListener);

            String message = "Service is connected";

            if (!mNokeService.initialize()) {
                Log.e(TAG, "Unable to initialize Bluetooth");
                message = "Unable to initialize Bluetooth";
            }
            final WritableMap event = Arguments.createMap();
            event.putString("message", message);
            event.putBoolean("status", true);
            emitDeviceEvent("onServiceConnected", event);
        }

        public void onServiceDisconnected(ComponentName classname) {
            mNokeService = null;
            final WritableMap event = Arguments.createMap();
            event.putBoolean("status", true);
            emitDeviceEvent("onServiceDisconnected", event);
        }
    };

    // LISTEN & FORWARD (to RN)
    private NokeServiceListener mNokeServiceListener = new NokeServiceListener() {
        @Override
        public void onNokeDiscovered(NokeDevice noke) {
            // maybe console whole map...
            Log.i(TAG_LISTEN, "NOKE DISCOVERED: " + noke.getName());
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
            Log.i(TAG_LISTEN, "NOKE CONNECTING: " + noke.getName());
            final WritableMap event = Arguments.createMap();
            event.putString("name", noke.getName());
            event.putString("mac", noke.getMac());
            event.putString("hwVersion", noke.getVersion());
            emitDeviceEvent("onNokeConnecting", event);
        }

        @Override
        public void onNokeConnected(NokeDevice noke) {
            Log.i(TAG_LISTEN, "NOKE CONNECTED: " + noke.getName());
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
            Log.i(TAG_LISTEN, "NOKE SYNCING");
            final WritableMap event = Arguments.createMap();
            event.putString("name", noke.getName());
            event.putString("mac", noke.getMac());
            event.putString("session", noke.getSession());
            emitDeviceEvent("onNokeSyncing", event);
        }

        @Override
        public void onNokeUnlocked(NokeDevice noke) {
            Log.i(TAG_LISTEN, "NOKE UNLOCKED");
            final WritableMap event = Arguments.createMap();
            event.putString("name", noke.getName());
            event.putString("mac", noke.getMac());
            event.putString("session", noke.getSession());
            emitDeviceEvent("onNokeUnlocked", event);
        }

        @Override
        public void onNokeDisconnected(NokeDevice noke) {
            Log.i(TAG_LISTEN, "DISCONNECTED");
            final WritableMap event = Arguments.createMap();
            event.putString("name", noke.getName());
            event.putString("mac", noke.getMac());
            event.putString("session", noke.getSession());
            emitDeviceEvent("onNokeDisconnected", event);
            mNokeService.uploadData();
        }

        @Override
        public void onNokeShutdown(NokeDevice noke, Boolean isLocked, Boolean didTimeout) {
            Log.i(TAG_LISTEN, "SHUT DOWN");
            final WritableMap event = Arguments.createMap();
            event.putString("name", noke.getName());
            event.putString("mac", noke.getMac());
            event.putBoolean("isLocked", isLocked);
            event.putBoolean("didTimeout", didTimeout);
            emitDeviceEvent("onNokeShutdown", event);
        }

        @Override
        public void onDataUploaded(int i, String s) {
            Log.i(TAG_LISTEN, "DATA UPLOADED");
        }

        @Override
        public void onBluetoothStatusChanged(int bluetoothStatus) {
            Log.i(TAG_LISTEN, "BLUETOOTH STATUS CHANGE");
            final WritableMap event = Arguments.createMap();
            event.putInt("code", bluetoothStatus);
            emitDeviceEvent("onBluetoothStatusChanged", event);
        }

        @Override
        public void onError(NokeDevice noke, int error, String message) {
            Log.e(TAG, "NOKE SERVICE ERROR " + error + ": " + message);
            switch (error) {
                case NokeMobileError.ERROR_LOCATION_PERMISSIONS_NEEDED:
                    break;
                case NokeMobileError.ERROR_LOCATION_SERVICES_DISABLED:
                    break;
                case NokeMobileError.ERROR_BLUETOOTH_DISABLED:
                    break;
                case NokeMobileError.ERROR_BLUETOOTH_GATT:
                    break;
            }
            final WritableMap event = Arguments.createMap();
            event.putInt("code", error);
            String mac = "";
            String name = "";
            if (noke != null) {
                mac = noke.getMac();
                name = noke.getName();
            }
            event.putString("mac", mac);
            event.putString("name", name);
            event.putString("message", message);
            emitDeviceEvent("onError", event);
        }
    };

    private WritableMap createCommonEvents(NokeDevice nokeDevice) {
        final WritableMap event = Arguments.createMap();

        if (nokeDevice == null) {
            return event;
        }

        event.putString("name", nokeDevice.getName());
        event.putString("mac", nokeDevice.getMac());

        return event;
    }
};
