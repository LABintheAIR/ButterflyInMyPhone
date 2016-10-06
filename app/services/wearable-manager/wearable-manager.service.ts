import { Injectable } from '@angular/core';
import { Wearable } from "../../objects/wearable/wearable.object";

@Injectable()
export class WearableManager{
  //private DIR_BASE = cordova.file.applicationStorageDirectory  + "/files/phonegapdevapp/www/app/ressources/wearables/";
  private DIR_BASE = cordova.file.applicationDirectory  + "/www/app/ressources/wearables/";

  private wearables : Wearable[];
  private currentWearable : Wearable;

  loadWearables(){
    this.currentWearable = null;
    this.wearables = [];
    return new Promise<void>( (resolve, reject) => {
      window.resolveLocalFileSystemURL( this.DIR_BASE, (dirEntry) => {
        dirEntry.createReader().readEntries( (entries) => {
          this.convertDirectoryEntriesToWearables( entries );
          resolve();
        }, (e) => { reject( this.errorFile(e) ); } );
      }, (e) => { reject( this.errorFile(e) ); } );
    });
  }

  private convertDirectoryEntriesToWearables( entries : FileEntry[] ){
    for( let entry of entries ){
      if( entry.isDirectory ){ continue; }

      console.log( "Load Wearable : " + entry.name );
      this.readFile( this.DIR_BASE + entry.name )
            .then( ( obj ) => {
                let w = new Wearable();
                w.loadToJson( obj );
                this.wearables.push( w );
                this.wearables = this.wearables.sort( this.alphabetical );
            })
            .catch( (e) => console.error(e) );
    }
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

  private alphabetical(a : Wearable, b : Wearable)
  {
       var A = a.name.toLowerCase();
       var B = b.name.toLowerCase();
       if (A < B){
          return -1;
       }else if (A > B){
         return  1;
       }else{
         return 0;
       }
  }

  getAvailableWearables() : Wearable[]{
    return this.wearables.slice( 0, this.wearables.length );
  }

  selectWearable( id : number ) : boolean {
    if( id < 0 || id >= this.wearables.length ){
      return false;
    }

    this.currentWearable = this.wearables[id];
    console.log( "Selected Wearable : " + this.currentWearable.name );
    return true;
  }

  getSelectWearable(){
    if( this.currentWearable === undefined ){
      return null;
    }

    return this.currentWearable;
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
