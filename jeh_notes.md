1 - RXJS STUFF
    • remove rxjs-compat@6 after updating code
    • remove -g rxjs-tslint?
    • https://rxjs-dev.firebaseapp.com/guide/v6/migration#backwards-compatibility

2 - Add aliases
    • https://reactnative.dev/docs/typescript#using-custom-path-aliases-with-typescript
    • https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping

3 - Security
    • Replace mobile api key in manifest with environment variable or equivalent.

4 - Your own backend (time to learn graphql)
    @Override
    public void onUnlockReceived(String response, NokeDevice noke) {

        /* Note: This is an example response from a demo server, it does not represent a response from the Noke Core API.
         * Requests should not be made to the Core API directly from the mobile app.
         * Please refer to the documentation for more details
         * (https://github.com/noke-inc/noke-mobile-library-android#nok%C4%93-mobile-library-for-android)
         */

        Log.d(TAG, "Unlock Received: "+ response);
        try{
            JSONObject obj = new JSONObject(response);
            Boolean result = obj.getBoolean("result");
            if(result){
                JSONObject data = obj.getJSONObject("data");
                String commandString = data.getString("commands");
                currentNoke.sendCommands(commandString);
            }else{
                setStatusText("Access Denied");
                setLockLayoutColor(getResources().getColor(R.color.alertRed));
            }

        }catch (JSONException e){
            Log.e(TAG, e.toString());
        }
    }

5 - Import simplicity
    /**
    * This exposes the native CalendarModule module as a JS module. This has a
    * function 'createCalendarEvent' which takes the following parameters:

    * 1. String name: A string representing the name of the event
    * 2. String location: A string representing the location of the event
    */
    import { NativeModules } from 'react-native';
    const { CalendarModule } = NativeModules;
    export default CalendarModule;
