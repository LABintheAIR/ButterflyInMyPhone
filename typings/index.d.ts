/// <reference path="globals/core-js/index.d.ts" />
/// <reference path="globals/jasmine/index.d.ts" />
/// <reference path="globals/node/index.d.ts" />


/*
  Create interface to avoid TypeScript error about BLE cordova plugin
*/
interface _ble{
  scan(a, b, c, d): void;
  enable( a, b ): void;
  connect( a, b, c ): void;
  disconnect( a, b, c ) : void;
  write( a, b, c, d, e, f ) : void;
}
declare var ble : _ble;

/*
  Create interfaces to avoid TypeScript error about File cordova plugin
*/
interface _FileError{
  QUOTA_EXCEEDED_ERR : any;
  NOT_FOUND_ERR : any;
  SECURITY_ERR : any;
  INVALID_MODIFICATION_ERR : any;
  INVALID_STATE_ERR : any;
}
declare var FileError: _FileError

interface _file{
  applicationStorageDirectory : any;
}
interface _cordova {
    file : _file;
}
declare var cordova: _cordova;

interface Window{
  resolveLocalFileSystemURL(a, b, c) : any;
}

interface DirectoryEntry{

}

interface FileEntry{
  isDirectory() : boolean;
  name : string;
}
