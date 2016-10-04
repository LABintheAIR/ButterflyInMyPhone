import { Injectable } from "@angular/core";

import { Station } from "../../objects/station/station.object";

@Injectable()
export class StationManagerService{
    //private PATH_STATION = cordova.file.applicationStorageDirectory  + "/files/phonegapdevapp/www/app/ressources/station.json";
    private PATH_STATION = cordova.file.applicationDirectory  + "/www/app/ressources/stations.json";

    private stations : Station[];

    loadStation() : Promise<void> {
      this.stations = [];
      return new Promise<void>( (resolve, reject) => {
        this.readFile( this.PATH_STATION )
              .then( (object : any) => {
                try{
                  for( let s of object.stations ){
                    let station = new Station();
                    station.loadToJSON(s);
                    this.stations.push( station );
                  }
                }
                catch( e ){
                  reject( "Error on Loading station file: " + e );
                }
                resolve();
              })
              .catch( e => reject( e ) );
      });
    }

    private readFile( pathFile : string ) : Promise<Object>{
      return new Promise<Object>( (resolve, reject ) => {
        window.resolveLocalFileSystemURL( pathFile ,
          (fileEntry) => {
            fileEntry.file( (file) => {
              var reader = new FileReader();

              reader.onloadend = (e) => {
                try{
                  resolve( JSON.parse( reader.result ) );
                }
                catch( e ){
                  reject( "Parse Error [" + file.name + "]: " + e );
                }
              }

              reader.onerror = ( e ) => { reject( "[Read fail] (" + file.name + ")" + this.errorFile(e) ) }
              reader.readAsText( file );
            });
          },
          (e) => reject( e )
        );
      } );
    }

    private errorFile( e ){
      switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
              return 'Storage quota exceeded';
          case FileError.NOT_FOUND_ERR:
              return 'File not found';
          case FileError.SECURITY_ERR:
              return 'Security error';
          case FileError.INVALID_MODIFICATION_ERR:
              return 'Invalid modification';
          case FileError.INVALID_STATE_ERR:
              return 'Invalid state';
          default:
              return 'FileError : Unknown error (' + e.message + ')';
      };
    }
}
