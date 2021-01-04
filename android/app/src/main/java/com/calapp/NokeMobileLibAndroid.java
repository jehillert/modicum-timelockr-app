package com.calapp;

import java.util.Map;
import java.util.HashMap;
import java.nio.charset.Charset;

import android.util.Log;
import android.content.Intent;
import android.content.Context;

import com.noke.nokemobilelibrary.NokeDefines;
import com.noke.nokemobilelibrary.NokeDeviceManagerService;
import com.noke.nokemobilelibrary.NokeDevice;
import com.noke.nokemobilelibrary.NokeMobileError;
import com.noke.nokemobilelibrary.NokeServiceListener;

// import com.facebook.react.bridge.Arguments;
// import com.facebook.react.bridge.ReadableMap;
// import com.facebook.react.bridge.WritableMap;
// import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NokeMobileLibAndroid extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext = null;

    NokeMobileLibAndroid(ReactApplicationContext context) {
        super(context);

        reactContext = context;
        Log.d("NokeMobileLibAndroid", "🔸🔸🔸 ReactApplicationContext()");
    }

        @Override

    public String getName() {
        Log.d("NokeMobileLibAndroid", "🔸🔸🔸 getName()");
        return "NokeMobileLibAndroid";
    }

    // @ReactMethod
    // public void initiateNokeService(Promise promise) {
    //     Log.d("NokeMobileLibAndroid", "🔸🔸🔸 initiateNokeService()");
    //     try {
    //         Intent nokeServiceIntent = new Intent(reactContext, NokeDeviceManagerService.class);
    //         reactContext.bindService(nokeServiceIntent, mServiceConnection, Context.BIND_AUTO_CREATE);
    //         boolean event = true;
    //         promise.resolve(event);
    //     } catch (Exception e) {
    //         promise.reject("RNNM_ERROR", "initiateMokeService() failed.", e);
    //     }
    // }

    // ! for service connection function
    // ! String[] macs = {"XX:XX:XX:XX:XX:XX"};
    // ! String[] macs = {"D0:07:69:1B:8A:3A"};
    // ! String[] macs = {"EA:EC:51:08:21:CF"};

    @Override
    public Map<String, Object> getConstants() {
        final Charset charset = Charset.forName("UTF-8");
        final Map<String, Object> constants = new HashMap<>();

        // [int] | Default scan off time for foreground scanning
        // constants.put("BLUETOOTH_DEFAULT_SCAN_TIME", NokeDefines.BLUETOOTH_DEFAULT_SCAN_TIME);
        // [int] | Default scan off time for background scanning
        // constants.put("BLUETOOTH_DEFAULT_SCAN_TIME_BACKGROUND", NokeDefines.BLUETOOTH_DEFAULT_SCAN_TIME_BACKGROUND);
        // [int] | Default scan off time for background scanning
        // constants.put("BLUETOOTH_DEFAULT_SCAN_DURATION", NokeDefines.BLUETOOTH_DEFAULT_SCAN_DURATION);
        // [String] | Identifer string for Noke hardware devices
        // constants.put("NOKE_DEVICE_IDENTIFER_STRING", NokeDefines.NOKE_DEVICE_IDENTIFER_STRING);
        // [boolean] | Should force gatt refresh
        // constants.put("SHOULD_FORCE_GATT_REFRESH", NokeDefines.SHOULD_FORCE_GATT_REFRESH);
        // Identifier for Noke Mobile API Key meta data
        // constants.put("NOKE_MOBILE_API_KEY", NokeDefines.NOKE_MOBILE_API_KEY); // [String]
        // constants.put("OFFLINE_KEY_LENGTH", NokeDefines.OFFLINE_KEY_LENGTH); // [int]
        // constants.put("UNLOCK_COMMAND_LENGTH", NokeDefines.UNLOCK_COMMAND_LENGTH); // [int]
        // Lock response types
        // constants.put("SUCCESS_ResultType", new String(NokeDefines.SUCCESS_ResultType, charset)); // [byte]
        // constants.put("INVALIDKEY_ResultType", new String(NokeDefines.INVALIDKEY_ResultType, charset)); // [byte]
        // constants.put("INVALIDCMD_ResultType", new String(NokeDefines.INVALIDCMD_ResultType, charset)); // [byte]
        // constants.put("INVALIDPERMISSION_ResultType", new String(NokeDefines.INVALIDPERMISSION_ResultType, charset)); // [byte]
        // constants.put("SHUTDOWN_ResultType", new String(NokeDefines.SHUTDOWN_ResultType, charset)); // [byte]
        // constants.put("INVALIDDATA_ResultType", new String(NokeDefines.INVALIDDATA_ResultType, charset)); // [byte]
        // Lock response destination types
        // constants.put("FAILEDTOLOCK_ResultType", new String(NokeDefines.FAILEDTOLOCK_ResultType, charset)); // [byte]
        // constants.put("FAILEDTOUNLOCK_ResultType", new String(NokeDefines.FAILEDTOUNLOCK_ResultType, charset)); // [byte]
        // constants.put("FAILEDTOUNSHACKLE_ResultType", new String(NokeDefines.FAILEDTOUNSHACKLE_ResultType, charset)); // [byte]
        // constants.put("INVALID_ResultType", new String(NokeDefines.INVALID_ResultType, charset)); // [byte]
        // constants.put("SERVER_Dest", NokeDefines.SERVER_Dest); // [int]
        // constants.put("APP_Dest", NokeDefines.APP_Dest); // [int]
        // Noke device UUIDs
        // constants.put("CCCD", NokeDefines.CCCD.toString()); // [String]
        // constants.put("RX_SERVICE_UUID", NokeDefines.RX_SERVICE_UUID.toString()); // [String]
        // constants.put("RX_CHAR_UUID", NokeDefines.RX_CHAR_UUID.toString()); // [String]
        // constants.put("TX_CHAR_UUID", NokeDefines.TX_CHAR_UUID.toString()); // [String]
        // constants.put("STATE_CHAR_UUID", NokeDefines.STATE_CHAR_UUID.toString()); // [String]
        // Noke firmware mode UUIDs
        // constants.put("FIRMWARE_RX_SERVICE_UUID", NokeDefines.FIRMWARE_RX_SERVICE_UUID.toString()); // [string]
        // constants.put("FIRMWARE_TX_CHAR_UUID", NokeDefines.FIRMWARE_TX_CHAR_UUID.toString()); // [string]
        // Noke Connection States
        // constants.put("NOKE_STATE_DISCONNECTED", NokeDefines.NOKE_STATE_DISCONNECTED); // [int]
        // constants.put("NOKE_STATE_DISCOVERED", NokeDefines.NOKE_STATE_DISCOVERED); // [int]
        // constants.put("NOKE_STATE_CONNECTING", NokeDefines.NOKE_STATE_CONNECTING); // [int]
        // constants.put("NOKE_STATE_CONNECTED", NokeDefines.NOKE_STATE_CONNECTED); // [int]
        // constants.put("NOKE_STATE_SYNCING", NokeDefines.NOKE_STATE_SYNCING); // [int]
        // constants.put("NOKE_STATE_UNLOCKED", NokeDefines.NOKE_STATE_UNLOCKED); // [int]
        // constants.put("NOKE_GATT_ERROR", NokeDefines.NOKE_GATT_ERROR); // [int]
        // Noke Lock States
        constants.put("NOKE_LOCK_STATE_UNKNOWN", NokeDefines.NOKE_LOCK_STATE_UNKNOWN); // [int]
        constants.put("NOKE_LOCK_STATE_UNLOCKED", NokeDefines.NOKE_LOCK_STATE_UNLOCKED); // [int]
        constants.put("NOKE_LOCK_STATE_UNSHACKLED", NokeDefines.NOKE_LOCK_STATE_UNSHACKLED); // [int]
        constants.put("NOKE_LOCK_STATE_LOCKED", NokeDefines.NOKE_LOCK_STATE_LOCKED); // [int]
        constants.put("NOKE_LOCK_STATE_UNSHACKLING", NokeDefines.NOKE_LOCK_STATE_UNSHACKLING); // [int]
        constants.put("NOKE_LOCK_STATE_UNLOCKING", NokeDefines.NOKE_LOCK_STATE_UNLOCKING); // [int]
        constants.put("NOKE_LOCK_STATE_LOCKED_NO_MAGNET", NokeDefines.NOKE_LOCK_STATE_LOCKED_NO_MAGNET); // [int]
        // Hardware Types
        constants.put("NOKE_HW_TYPE_1ST_GEN_PADLOCK", NokeDefines.NOKE_HW_TYPE_1ST_GEN_PADLOCK); // [String]
        constants.put("NOKE_HW_TYPE_2ND_GEN_PADLOCK", NokeDefines.NOKE_HW_TYPE_2ND_GEN_PADLOCK); // [String]
        constants.put("NOKE_HW_TYPE_ULOCK", NokeDefines.NOKE_HW_TYPE_ULOCK); // [String]
        constants.put("NOKE_HW_TYPE_HD_LOCK", NokeDefines.NOKE_HW_TYPE_HD_LOCK); // [String]
        constants.put("NOKE_HW_TYPE_DOOR_CONTROLLER", NokeDefines.NOKE_HW_TYPE_DOOR_CONTROLLER); // [String]
        constants.put("NOKE_HW_TYPE_PB12", NokeDefines.NOKE_HW_TYPE_PB12); // [String]
        // Shared Preferences
        constants.put("PREFS_NAME", NokeDefines.PREFS_NAME); // [String]
        constants.put("PREF_DEVICES", NokeDefines.PREF_DEVICES); // [String]
        constants.put("PREF_UPLOADDATA", NokeDefines.PREF_UPLOADDATA); // [String]
        // Noke Library Modes - Determines where the logs from the lock are sent
        constants.put("NOKE_LIBRARY_SANDBOX", NokeDefines.NOKE_LIBRARY_SANDBOX); // [int]
        constants.put("NOKE_LIBRARY_PRODUCTION", NokeDefines.NOKE_LIBRARY_PRODUCTION); // [int]
        constants.put("NOKE_LIBRARY_DEVELOP", NokeDefines.NOKE_LIBRARY_DEVELOP); // [int]
        constants.put("NOKE_LIBRARY_OPEN", NokeDefines.NOKE_LIBRARY_OPEN); // [int]
        // Request URLS
        constants.put("sandboxUploadURL", NokeDefines.sandboxUploadURL); // [String]
        constants.put("productionUploadURL", NokeDefines.productionUploadURL); // [String]
        constants.put("developUploadURL", NokeDefines.developUploadURL); // [String]

        return constants;
    }
}
