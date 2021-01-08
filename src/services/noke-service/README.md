### &nbsp; RETURN VALUES - @Override<br />
|                       |                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------- |
| onNokeConnected       | { String _name_, String _mac_, String _session_, Int _battery_, String _hwVersion_ }        |
| onNokeConnecting      | { String _name_, String _mac_, String _hwVersion_ }                                         |
| onNokeDisconnected    | { String _name_, String _mac_, String _session_ }                                           |
| onNokeDiscovered      | { String _name_, String _mac_, String _hwVersion_, Int _lockState_, Int _connectionState_ } |
| onNokeSyncing         | { String _name_, String _mac_, String _session_ }                                           |
| onNokeUnlocked        | { String _name_, String _mac_, String _session_ }                                           |
| onServiceConnected    | { String _message_, Boolean _status_ }                                                      |
| onServiceDisconnected | { Boolean _status_ }                                                                        |
<br /><br />
### &nbsp; RETURN VALUES - @ReactMethods<br />
|                                    |                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| sendCommands                       | n/a                                                                          |
| initiateNokeService                | Boolean _true_                                                               |
| connect                            | { Boolean _status_ }                                                         |
| addNokeOfflineValues               | { Boolean _status_ }                                                         |
| disconnect                         | { Boolean _status_ }                                                         |
| offlineUnlock                      | { Boolean _status_ }                                                         |
| removeAllNokes                     | { Boolean _status_ }                                                         |
| removeNokeDevice                   | { Boolean _status_ }                                                         |
| setBluetoothDelayBackgroundDefault | { Boolean _status_ }                                                         |
| setBluetoothDelayDefault           | { Boolean _status_ }                                                         |
| setBluetoothScanDuration           | { Boolean _status_ }                                                         |
| startScan                          | { Boolean _status_ }                                                         |
| stopScan                           | { Boolean _status_ }                                                         |
| onBluetoothStatusChanged           | { Int _code_ }*                                                              |
| onError                            | { String _name_, String _mac_, String _message_ }                            |
| onNokeShutDown                     | { String _name_, String _mac_, Boolean _isLocked_, Boolean _didTimeout_ }    |
<br/> &nbsp;&nbsp;\*_code is bluetoothStatus_
<br /><br />
### &nbsp; ARGUMENTS - @ReactMethods<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; connect( String mac ) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; disconnect( String mac ) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; offlineUnlock( String mac ) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; removeNokeDevice( String mac ) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; addNokeDevice( ReadableMap data ) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; setBluetoothDelayDefault( int delay ) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; setBluetoothScanDuration( int duration ) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; addNokeOfflineValues( ReadableMap data ) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sendCommands( String mac, String command ) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; setBluetoothDelayBackgroundDefault( int delay ) <br />
<br /><br />
 ### &nbsp; PROMISES RESOLVE TO - @ReactMethods
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sendCommands => n/a<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; initiateNokeService => Boolean true<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Everything Else => { Boolean status }<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; onError => { String name, String mac, String message }<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; onBluetoothStatusChanged => { Int code } | code is bluetoothStatus<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; onNokeShutDown => { String name, String mac, Boolean isLocked, Boolean didTimeout }<br />
