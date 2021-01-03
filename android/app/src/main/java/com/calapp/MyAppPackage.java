/*
 *  This file imports the native module you created, CalendarModule. It then
 * instantiates CalendarModule within the createNativeModules() function and
 * returns it as a list of NativeModules to register. If you add more native
 * modules down the line, you can also instantiate them and add them to the
 * list returned here.
 */

package com.calapp;

import com.calapp.CalendarModule;
// import com.calapp.noke.RNNokeModule;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyAppPackage implements ReactPackage {

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

   @Override
   public List<NativeModule> createNativeModules(
           ReactApplicationContext reactContext) {
       List<NativeModule> modules = new ArrayList<>();

       // add custom modules
       modules.add(new CalendarModule(reactContext));
    //    modules.add(new RNNokeModule(reactContext));

       return modules;
   }

}
