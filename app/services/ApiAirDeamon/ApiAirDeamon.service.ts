import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http'
import { Observable } from "rxjs";

class QueryRegion{
  region : string;
  zone : string;
  callback : Function;
}

class QueryGPS{
  callback : Function;
}

@Injectable()
export class ApiAirDeamonService {

  private batchRegion : QueryRegion[];
  private batchGPS : QueryGPS[];

  constructor( private http : Http ){}

  init() : void {
    cordova.plugin.backgroundMode.setDefaults({
      "title":"Butterfly In My Phone running...",
      "isPublic": true
    });
    cordova.plugin.backgroundMode.enable();

    cordova.plugin.backgroundMode.onfailure = (error) => { console.error("APIAIR DEAMON : " + error) };

    this.timeoutTask( 3600000 );
  }

  addQueryGPS( cb : Function ){
    this.batchGPS.push( { "callback" : cb } );
  }

  addQueryStation( region : string, zone : string, cb : Function ){
    this.batchRegion.push( { "region": region, "zone" : zone, "callback": cb } );
  }

  private timeoutTask( msec : number ){
    this.runBatchs();
    setTimeout( () => this.timeoutTask(msec), msec );
  }

  private runBatchs(){
    console.log("Run batchs");
    for( let b of this.batchGPS ){
      this.sendGPSRequest()
        .then( (obs) => {
          obs.subscribe( res => b.callback(res), err => console.error( err ) );
        })
        .catch( (err) => {
          console.error( err );
        });
    }
    for( let b of this.batchRegion ){
      this.sendRegionRequest( b.region, b.zone ).subscribe( res => b.callback( res ), err => console.error(err) );
    }
  }

  private sendRegionRequest( region : string, zone : string ){
    return this.http.get( "http://papillon-jnth.rhcloud/get/iqa/" + region + "/" + zone ).map( (res:Response) => res.json() );
  }

  private sendGPSRequest() : Promise<Observable<Object>>{
    return new Promise<Observable<Object>>( (resolve, reject) => {
        this.getCurrentGPSPosition()
          .then( (position) => {
            resolve( this.http.get("http://papillon-jnth.rhcloud.com/get/iqa/paca/" + position.coords.longitude + "," + position.coords.latitude).map( (res:Response) => res.json()) );
          })
          .catch( (error) => {
            reject( error );
          });
    });
  }

  private getCurrentGPSPosition() : Promise<PositionGPS>{
    return new Promise<PositionGPS>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => { resolve( position ); },
        (error) => { reject( "[GPS Position] " + error.code + " : " + error.message) },
        { maximumAge: 3000, timeout: 5000, enableHighAccuracy: false }
      );
    });
  }
}
