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
|                       |                      |
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
