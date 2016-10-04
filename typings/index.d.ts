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
  applicationDirectory : any;
}
interface _backgroundMode{
  enable();
  disable();
  getDefaults();
  setDefaults( a );
  isEnable();
  isActive();
  configure( a );
  onactivate();
  ondeactivate();
  onfailure( error );
}
interface _plugin{
  backgroundMode : _backgroundMode;
}
interface _cordova {
    file : _file;
    plugins : _plugin;
}
declare var cordova: _cordova;

interface _geolocation{
  getCurrentPosition( a, b, c);
}
interface _navigation{
  geolocation : _geolocation;
}

interface PositionGPS{
  coords : _coords;
  timestamp : any;
}
interface _coords{
  latitude : any;
  longitude : any;
  altitude : any;
  accuracy : any;
  altitudeAccuracy : any;
  heading : any;
  speed : any;
}

interface Window{
  resolveLocalFileSystemURL(a, b, c) : any;
}

interface DirectoryEntry{

}

interface FileEntry{
  isDirectory() : boolean;
  name : string;
}

declare class jscolor{
  mode : string;
  borderColor: string;
  insertColor: string;
  backgroundColor: string;

  constructor(a);
  fromString( a );
}
