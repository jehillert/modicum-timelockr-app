package com.timelockr;

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
import android.util.Log;
import android.view.View;
import androidx.annotation.Nullable;
import androidx.annotation.NonNull;

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
    private static final int PERMISSION_REQUEST_COARSE_LOCATION = 1;
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
        constants.put("NOKE_LOCK_STATE_UNKNOWN", NokeDefines.NOKE_LOCK_STATE_UNKNOWN);                    // [int]
        constants.put("NOKE_LOCK_STATE_UNLOCKED", NokeDefines.NOKE_LOCK_STATE_UNLOCKED);                  // [int]
        constants.put("NOKE_LOCK_STATE_UNSHACKLED", NokeDefines.NOKE_LOCK_STATE_UNSHACKLED);              // [int]
        constants.put("NOKE_LOCK_STATE_LOCKED", NokeDefines.NOKE_LOCK_STATE_LOCKED);                      // [int]
        constants.put("NOKE_HW_TYPE_1ST_GEN_PADLOCK", NokeDefines.NOKE_HW_TYPE_1ST_GEN_PADLOCK);          // [String]
        constants.put("NOKE_HW_TYPE_2ND_GEN_PADLOCK", NokeDefines.NOKE_HW_TYPE_2ND_GEN_PADLOCK);          // [String]
        constants.put("NOKE_HW_TYPE_ULOCK", NokeDefines.NOKE_HW_TYPE_ULOCK);                              // [String]
        constants.put("NOKE_HW_TYPE_HD_LOCK", NokeDefines.NOKE_HW_TYPE_HD_LOCK);                          // [String]
        constants.put("NOKE_HW_TYPE_DOOR_CONTROLLER", NokeDefines.NOKE_HW_TYPE_DOOR_CONTROLLER);          // [String]
        constants.put("NOKE_HW_TYPE_PB12", NokeDefines.NOKE_HW_TYPE_PB12);                                // [String]
        constants.put("NOKE_LIBRARY_SANDBOX", NokeDefines.NOKE_LIBRARY_SANDBOX);                          // [int]
        constants.put("NOKE_LIBRARY_PRODUCTION", NokeDefines.NOKE_LIBRARY_PRODUCTION);                    // [int]
        constants.put("NOKE_LIBRARY_DEVELOP", NokeDefines.NOKE_LIBRARY_DEVELOP);                          // [int]
        constants.put("NOKE_LIBRARY_OPEN", NokeDefines.NOKE_LIBRARY_OPEN);                                // [int]

        return constants;
    }

    private void emitDeviceEvent(String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @ReactMethod
    public void initiateNokeService(Promise promise) {
        try {
            Intent nokeServiceIntent = new Intent(reactContext, NokeDeviceManagerService.class);
            reactContext.bindService(nokeServiceIntent, mServiceConnection, Context.BIND_AUTO_CREATE);
            boolean event = true;
            promise.resolve(event);
        } catch (Exception e) {
            promise.reject("RNNM_ERROR", "initiateNokeService() failed.", e);
        }
    }

    @ReactMethod
    public void setBluetoothDelayDefault(int delay, Promise promise) {
        try {
            final WritableMap event = Arguments.createMap();
            if (mNokeService == null) {
                promise.reject("message", "mNokeService is null");
                return;
            }
            mNokeService.setBluetoothDelayDefault(delay);
            event.putInt("defaultDelay", delay);
            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void setBluetoothDelayBackgroundDefault(int delay, Promise promise) {
        try {
            final WritableMap event = Arguments.createMap();
            if (mNokeService == null) {
                promise.reject("message", "mNokeService is null");
                return;
            }
            mNokeService.setBluetoothDelayBackgroundDefault(delay);
            event.putInt("backgroundDelay", delay);
            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void setBluetoothScanDuration(int duration, Promise promise) {
        try {
            final WritableMap event = Arguments.createMap();
            if (mNokeService == null) {
                promise.reject("message", "mNokeService is null");
                return;
            }
            mNokeService.setBluetoothScanDuration(duration);
            event.putInt("scanDuration", duration);
            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void setAllowAllDevices(Boolean shouldScanAll, Promise promise) {
        final WritableMap event = Arguments.createMap();
        mNokeService.setAllowAllDevices(shouldScanAll);
        event.putBoolean("shouldScanAll", shouldScanAll);
        promise.resolve(event);
    }

    @ReactMethod
    public void startScan(Promise promise) {
        try {
            final WritableMap event = Arguments.createMap();
            mNokeService.startScanningForNokeDevices();
            event.putBoolean("isScanning", true);
            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void stopScan(Promise promise) {
        try {
            final WritableMap event = Arguments.createMap();
            mNokeService.stopScanning();
            event.putBoolean("isScanning", false);
            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

            /**
             * name: "Lock Name"
             * mac: "XX:XX:XX:XX:XX:XX"
             */
    @ReactMethod
    public void addNokeDevice(ReadableMap data, Promise promise) {
        try {
            if (data == null) {
                promise.reject("message", "data is null");
                return;
            }
            NokeDevice noke = new NokeDevice(data.getString("name"), data.getString("mac"));
            WritableMap event = createCommonEvents(noke);
            if (mNokeService == null) {
                promise.reject("message", "mNokeService is null");
                return;
            }
            mNokeService.addNokeDevice(noke);
            event.putBoolean("isAdded", true);
            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

            /**
             * name: "Lock Name"
             * mac: "XX:XX:XX:XX:XX:XX"
             * key: "OFFLINE_KEY"
             * cmd: "OFFLINE_COMMAND"
             */
    @ReactMethod
    public void addNokeOfflineValues(ReadableMap data, Promise promise) {
        Log.i(TAG_RN_METHOD, "ADDING NOKE OFFLINE VALUES");
        try {
            final WritableMap event = Arguments.createMap();
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
            NokeDevice noke = mNokeService.nokeDevices.get(mac);
            if (noke == null) {
                promise.reject("message", "unable to sendCommands, noke not found");
                return;
            }
            noke.sendCommands(command);
            WritableMap event = createCommonEvents(noke);
            promise.resolve(event);
        } catch (IllegalViewOperationException e) {
            promise.reject("message", e.getMessage());
        }
    }

    @ReactMethod
    public void connect(String mac, Promise promise) {
        final WritableMap event = Arguments.createMap();
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
        event.putBoolean("status", true);
        promise.resolve(event);
    }

    @ReactMethod
    public void disconnect(String mac, Promise promise) {
        final WritableMap event = Arguments.createMap();
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
        event.putBoolean("status", true);
        promise.resolve(event);
    }

    @ReactMethod
    public void removeAllNokes(Promise promise) {
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
            final WritableMap event = Arguments.createMap();
            mNokeService.removeNokeDevice(mac);
            event.putBoolean("isAdded", false);
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
            WritableMap event = createCommonEvents(daNoke);
            if (daNoke == null) {
                promise.reject("message", "unable to offlineUnlock, noke not found");
                return;
            }
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
            final WritableMap event = Arguments.createMap();
            String message = "Service is connected";
            mNokeService = ((NokeDeviceManagerService.LocalBinder) rawBinder)
                    .getService(NokeDefines.NOKE_LIBRARY_SANDBOX);
            mNokeService.setAllowAllDevices(true);
            mNokeService.registerNokeListener(mNokeServiceListener);
            if (!mNokeService.initialize()) {
                Log.e(TAG, "Unable to initialize Bluetooth");
                message = "Unable to initialize Bluetooth";
            }
            event.putString("message", message);
            event.putBoolean("isRunning", true);
            emitDeviceEvent("onServiceConnected", event);
        }

        public void onServiceDisconnected(ComponentName classname) {
            final WritableMap event = Arguments.createMap();
            mNokeService = null;
            event.putBoolean("status", true);
            emitDeviceEvent("onServiceDisconnected", event);
        }
    };

    // LISTEN & FORWARD (to RN)
    private NokeServiceListener mNokeServiceListener = new NokeServiceListener() {
        @Override
        public void onNokeDiscovered(NokeDevice noke) {
            WritableMap event = createCommonEvents(noke);
            event.putInt("connectionState", noke.getConnectionState());
            event.putString("hwVersion", noke.getVersion());
            event.putBoolean("isDiscovered", true);
            emitDeviceEvent("onNokeDiscovered", event);
        }

        @Override
        public void onNokeConnecting(NokeDevice noke) {
            WritableMap event = createCommonEvents(noke);
            event.putString("hwVersion", noke.getVersion());
            event.putBoolean("isConnecting", true);
            emitDeviceEvent("onNokeConnecting", event);
        }

        @Override
        public void onNokeConnected(NokeDevice noke) {
            WritableMap event = createCommonEvents(noke);
            event.putInt("battery", noke.getBattery());
            event.putString("hwVersion", noke.getVersion());
            event.putString("session", noke.getSession());
            event.putBoolean("isConnecting", false);
            event.putBoolean("isConnected", true);
            currentNoke = noke;
            mNokeService.stopScanning();
            emitDeviceEvent("onNokeConnected", event);
        }

        @Override
        public void onNokeSyncing(NokeDevice noke) {
            WritableMap event = createCommonEvents(noke);
            event.putString("session", noke.getSession());
            event.putBoolean("isSyncing", false);
            emitDeviceEvent("onNokeSyncing", event);
        }

        @Override
        public void onNokeUnlocked(NokeDevice noke) {
            WritableMap event = createCommonEvents(noke);
            event.putString("session", noke.getSession());
            event.putBoolean("isLocked", false);
            emitDeviceEvent("onNokeUnlocked", event);
        }

        @Override
        public void onNokeDisconnected(NokeDevice noke) {
            WritableMap event = createCommonEvents(noke);
            event.putString("session", noke.getSession());
            event.putBoolean("isConnected", false);
            emitDeviceEvent("onNokeDisconnected", event);
            // mNokeService.uploadData();
            mNokeService.startScanningForNokeDevices();
            mNokeService.setBluetoothScanDuration(8000);
        }

        @Override
        public void onNokeShutdown(NokeDevice noke, Boolean isLocked, Boolean didTimeout) {
            WritableMap event = createCommonEvents(noke);
            event.putBoolean("didTimeout", didTimeout);
            event.putBoolean("isLocked", isLocked);
            event.putBoolean("isShutdown", true);
            emitDeviceEvent("onNokeShutdown", event);
        }

        @Override
        public void onDataUploaded(int i, String s) {
            Log.i(TAG_LISTEN, "DATA UPLOADED");
        }

        @Override
        public void onBluetoothStatusChanged(int bluetoothStatus) {
            final WritableMap event = Arguments.createMap();
            event.putInt("bluetoothStatusCode", bluetoothStatus);
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
            WritableMap event = createCommonEvents(noke);
            event.putInt("code", error);
            event.putString("message", message);
            emitDeviceEvent("onError", event);
        }
    };

    private WritableMap createCommonEvents(NokeDevice noke) {
        final WritableMap event = Arguments.createMap();
        if (noke != null) {
            event.putString("mac", noke.getMac());
            event.putString("name", noke.getName());
            event.putString("status", getLockStatus(noke));
        }
        return event;
    }

    public String getLockStatus(NokeDevice noke) {
        String lockState = "";
        switch (noke.getLockState()) {
            case NokeDefines.NOKE_LOCK_STATE_UNKNOWN:
                lockState = "unknown";
                break;
            case NokeDefines.NOKE_LOCK_STATE_UNLOCKED:
                lockState = "unlocked";
                break;
            case NokeDefines.NOKE_LOCK_STATE_UNSHACKLED:
                lockState = "unshackled";
                break;
            case NokeDefines.NOKE_LOCK_STATE_LOCKED:
                lockState = "locked";
                break;

            default:
                break;
        }
        return lockState;
    }

    public void onRequestPermissionsResult(int requestCode, @NonNull String permissions[], @NonNull int[] grantResults) {
        switch (requestCode) {
            case PERMISSION_REQUEST_COARSE_LOCATION: {
                Log.i(TAG_LISTEN, "GRANT RESULTS: " + grantResults[0]);
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED)
                {
                    mNokeService.startScanningForNokeDevices();
                } else {
                    Log.e(TAG_LISTEN, "RESULTS NOT GRANTED: " + grantResults[0]);
                };
            }
        }
    }
};
