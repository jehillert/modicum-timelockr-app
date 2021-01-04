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
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
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
        return "NokeMobileLibAndroid";
    }

    // @ReactMethod
    // public void createNokeEvent(String name, String location) {
    //     Log.d("NokeMobileLibAndroid", "🔸🔸 Create event called with name: " + name
    //    + " and location: " + location);
    // }
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
}
