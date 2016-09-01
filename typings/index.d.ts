/// <reference path="globals/core-js/index.d.ts" />
/// <reference path="globals/jasmine/index.d.ts" />
/// <reference path="globals/node/index.d.ts" />


/*
  Create interface to avoid TypeScript error about BLE cordova plugin
*/
interface _ble{
  scan(a,b,c,d): void;
  enable( a, b ): void;
  connect( a, b, c ): void;
}
declare var ble : _ble;
