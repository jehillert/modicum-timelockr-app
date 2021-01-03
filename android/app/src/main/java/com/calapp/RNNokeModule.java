package com.calapp.noke;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import androidx.annotation.Nullable;
import android.system.ErrnoException;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;
import android.util.Log;

import com.noke.nokemobilelibrary.NokeDefines;
import com.noke.nokemobilelibrary.NokeDevice;
import com.noke.nokemobilelibrary.NokeDeviceManagerService;
import com.noke.nokemobilelibrary.NokeMobileError;
import com.noke.nokemobilelibrary.NokeServiceListener;

import java.util.HashMap;
import java.util.IllformedLocaleException;
import java.util.Map;

public class RNNokeModule extends ReactContextBaseJavaModule {
  public static final String REACT_CLASS = "RNNoke";
  private static ReactApplicationContext reactContext = null;

  public static final String TAG = "RNNoke";
  private NokeDeviceManagerService mNokeService = null;

  private Integer nokeLibraryMode = 0;

  public RNNokeModule(ReactApplicationContext context) {
    // Pass in the context to the constructor and save it so you can emit events
    // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
    super(context);
    Log.d("•🟩🟩🟩", "CONSTRUCTOR CALLED");

    reactContext = context;
  }

  private WritableMap createCommonEvents(NokeDevice nokeDevice) {
    final WritableMap event = Arguments.createMap();

    if(nokeDevice == null) {
      return event;
    }

    event.putString("name", nokeDevice.getName());
    event.putString("mac", nokeDevice.getMac());

    return event;
  }

  // @ReactMethod
  // private void setApiKey(String key, Promise promise) {
  //   Log.d("•🟧🟧🟧", "Calling setApiKey(String key, Promise promise). . .");
  //   try {
  //     if(mNokeService == null) {
  //       promise.reject("message", "mNokeService is null");
  //       return;
  //     }
  //     mNokeService.setApiKey(key);
  //     final WritableMap event = Arguments.createMap();
  //     event.putBoolean("status", true);

  //     promise.resolve(event);
  //   } catch (IllegalViewOperationException e) {
  //     promise.reject("message", e.getMessage());
  //   }
  // }

  @ReactMethod
  private void setBluetoothDelayDefault(int delay, Promise promise) {
    Log.d("•🟧🟧🟧", "Calling setBluetoothDelayDefault(int delay, Promise promise). . .");
    try {
      if(mNokeService == null) {
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
    Log.d("•🟧🟧🟧", "Calling setBluetoothDelayBackgroundDefault(int delay, Promise promise). . .");
    try {
      if(mNokeService == null) {
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
    Log.d("•🟧🟧🟧", "Calling setBluetoothScanDuration(int duration, Promise promise). . .");
    try {
      if(mNokeService == null) {
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
  private void initiateNokeService(int mode, Promise promise) {
    Log.d("•🟧🟧🟧", "Calling initiateNokeService(int mode, Promise promise). . .");
    try {
      Intent nokeServiceIntent = new Intent(reactContext, NokeDeviceManagerService.class);
      nokeLibraryMode = mode;
      reactContext.bindService(nokeServiceIntent, mServiceConnection, Context.BIND_AUTO_CREATE);
      WritableMap event = Arguments.createMap();
      event.putBoolean("status", true);

      promise.resolve(event);
    } catch (IllegalViewOperationException e) {
      promise.reject("message", e.getMessage());
    }
  }

  // @ReactMethod
  // public void isBluetoothEnabled(Promise promise) {
  //   Log.d("•🟧🟧🟧", "Calling sBluetoothEnabled(Promise promise). . .");
  //   try {
  //     if (mNokeService == null) {
  //       promise.reject("message", "mNokeService is null");
  //       return;
  //     }
  //     final Boolean enabled = mNokeService.isBluetoothEnabled();
  //     final WritableMap event = Arguments.createMap();
  //     event.putBoolean("enabled", enabled);

  //     promise.resolve(event);
  //   } catch (IllegalViewOperationException e) {
  //     promise.reject("message", e.getMessage());
  //   }
  // }

  @ReactMethod
  public void startScan(Promise promise) {
    Log.d("•🟧🟧🟧", "Calling tartScan(Promise promise). . .");
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
    Log.d("•🟧🟧🟧", "Calling topScan(Promise promise). . .");
    try {
      mNokeService.stopScanning();
      final WritableMap event = Arguments.createMap();
      event.putBoolean("status", true);

      promise.resolve(event);
    } catch (IllegalViewOperationException e) {
      promise.reject("message", e.getMessage());
    }
  }

  @ReactMethod
  public void addNokeDevice(ReadableMap data, Promise promise) {
    Log.d("•🟧🟧🟧", "Calling ddNokeDevice(ReadableMap data, Promise promise). . .");
    try {
      /**
       * name: "Lock Name"
       * mac: "XX:XX:XX:XX:XX:XX"
       */
      if(data == null) {
        promise.reject("message", "data is null");
        return;
      }

      NokeDevice noke = new NokeDevice(
              data.getString("name"),
              data.getString("mac")
      );

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
    Log.d("•🟧🟧🟧", "Calling ddNokeOfflineValues(ReadableMap data, Promise promise). . .");
    try {
      /**
       * name: "Lock Name"
       * mac: "XX:XX:XX:XX:XX:XX"
       * key: "OFFLINE_KEY"
       * cmd: "OFFLINE_COMMAND"
       */
      if(data == null) {
        promise.reject("message", "data is null");
        return;
      }

      NokeDevice noke = new NokeDevice(
              data.getString("name"),
              data.getString("mac")
      );
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
    Log.d("•🟧🟧🟧", "Calling endCommands(String mac, String command, Promise promise). . .");
    try {
      NokeDevice daNoke = mNokeService.nokeDevices.get(mac);
        if(daNoke == null) {
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
    Log.d("•🟧🟧🟧", "Calling onnect(String mac, Promise promise). . .");
    if(mNokeService == null) {
      promise.reject("message", "mNokeService is null");
      return;
    }

    NokeDevice daNoke = mNokeService.nokeDevices.get(mac);
    if(daNoke == null) {
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
    Log.d("•🟧🟧🟧", "Calling isconnect(String mac, Promise promise). . .");
    if(mNokeService == null) {
      promise.reject("message", "mNokeService is null");
      return;
    }

    NokeDevice daNoke = mNokeService.nokeDevices.get(mac);
    if(daNoke == null) {
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
    Log.d("•🟧🟧🟧", "Calling emoveAllNokes(Promise promise). . .");
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
    Log.d("•🟧🟧🟧", "Calling emoveNokeDevice(String mac, Promise promise). . .");
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
    Log.d("•🟧🟧🟧", "Calling fflineUnlock(String mac, Promise promise). . .");
    try {
      NokeDevice daNoke = mNokeService.nokeDevices.get(mac);
      if(daNoke == null) {
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

  @Override
  public String getName() {
    Log.d("•🟧🟧🟧", "Calling getName(). . .");
    return REACT_CLASS;
  }

  @Override
  public Map<String, Object> getConstants() {
    Log.d("•🟥🟥🟥🟥🟥🟥🟥🟥🟥", "getConstants");

    // Export any constants to be used in your native module
    // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
    final Map<String, Object> constants = new HashMap<>();
    constants.put("AUTHOR", "linh_the_human");

    return constants;
  }

  private ServiceConnection mServiceConnection = new ServiceConnection() {

    public void onServiceConnected(ComponentName className, IBinder rawBinder) {
      Log.d("•🟧     🟧      🟧     ", "private ServiceConnection mServiceConnection = new ServiceConnection()");

      Log.w(TAG, "ON SERVICE CONNECTED");

      //Store reference to service
      mNokeService = ((NokeDeviceManagerService.LocalBinder) rawBinder).getService(nokeLibraryMode);

      //Uncomment to allow devices that aren't in the device array
      mNokeService.setAllowAllDevices(true);

      //Register callback listener
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
      Log.d("•🟧     🟧      🟧     ", "Calling onBluetoothStatusChanged(int bluetoothStatus). . .");
      mNokeService = null;
      final WritableMap event = Arguments.createMap();
      event.putBoolean("status", true);
      emitDeviceEvent("onServiceDisconnected", event);
    }
  };

  private NokeServiceListener mNokeServiceListener = new NokeServiceListener() {
    @Override
    public void onNokeDiscovered(NokeDevice noke) {
      Log.d("•🟧🟧🟧", "Calling onNokeDiscovered(NokeDevice noke). . .");
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
      Log.d("•🟧🟧🟧", "Calling onNokeConnecting(NokeDevice noke). . .");
      final WritableMap event = Arguments.createMap();
      event.putString("name", noke.getName());
      event.putString("mac", noke.getMac());
      event.putString("hwVersion", noke.getVersion());
      emitDeviceEvent("onNokeConnecting", event);
    }

    @Override
    public void onNokeConnected(NokeDevice noke) {
      Log.d("•🟧🟧🟧", "Calling onNokeConnected(NokeDevice noke). . .");
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
      Log.d("•🟧🟧🟧", "Calling onNokeSyncing(NokeDevice noke). . .");
      final WritableMap event = Arguments.createMap();
      event.putString("name", noke.getName());
      event.putString("mac", noke.getMac());
      event.putString("session", noke.getSession());
      emitDeviceEvent("onNokeSyncing", event);
    }

    @Override
    public void onNokeUnlocked(NokeDevice noke) {
      Log.d("•🟧🟧🟧", "Calling onNokeUnlocked(NokeDevice noke). . .");
      final WritableMap event = Arguments.createMap();
      event.putString("name", noke.getName());
      event.putString("mac", noke.getMac());
      event.putString("session", noke.getSession());
      emitDeviceEvent("onNokeUnlocked", event);
    }

    @Override
    public void onNokeDisconnected(NokeDevice noke) {
      Log.d("•🟧🟧🟧", "Calling onNokeDisconnected(NokeDevice noke). . .");
      final WritableMap event = Arguments.createMap();
      event.putString("name", noke.getName());
      event.putString("mac", noke.getMac());
      event.putString("session", noke.getSession());
      emitDeviceEvent("onNokeDisconnected", event);
      mNokeService.uploadData();
    }

    @Override
    public void onNokeShutdown(NokeDevice noke, Boolean isLocked, Boolean didTimeout) {
      Log.d("•🟧🟧🟧", "Calling onNokeShutdown(NokeDevice noke, Boolean isLocked, Boolean didTimeout). . .");
      final WritableMap event = Arguments.createMap();
      event.putString("name", noke.getName());
      event.putString("mac", noke.getMac());
      event.putBoolean("isLocked", isLocked);
      event.putBoolean("didTimeout", didTimeout);
      emitDeviceEvent("onNokeShutdown", event);
    }

    @Override
    public void onDataUploaded(int i, String s) {
      Log.d("•🟧🟧🟧", "Calling onDataUploaded(int i, String s). . .");

    }

    @Override
    public void onBluetoothStatusChanged(int bluetoothStatus) {
      Log.d("•🟧🟧🟧", "Calling onBluetoothStatusChanged(int bluetoothStatus). . .");
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

  private static void emitDeviceEvent(String eventName, @Nullable WritableMap eventData) {
    // A method for emitting from the native side to JS
    // https://facebook.github.io/react-native/docs/native-modules-android.html#sending-events-to-javascript
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
  }
}
