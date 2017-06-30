import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http'
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

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

  private batchRegion : Map<number, QueryRegion>;
  private batchGPS : Map<number, QueryGPS>;
  private currentIdRegion = 0;
  private currentIdGps = 0;
  private timeoutTaskValue = 2000;

  constructor( private http : Http ){
    this.batchGPS = new Map<number, QueryGPS>();
    this.batchRegion = new Map<number, QueryRegion>();
  }

  init() : void {
    cordova.plugins.backgroundMode.setDefaults({
      "title": "Butterfly In My Phone running...",
      "isPublic": true,
      "text": "Keep your butterflies alive !",
      "silent": true
    });
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.onfailure = (error) => { console.error("APIAIR DEAMON : " + error) };
    this.timeoutTask( this.timeoutTaskValue );
  }

  resetQueryBatchs() : void{
    this.batchGPS.clear();
    this.batchRegion.clear();
  }

  addQueryGPS( cb : Function ) : number {
    console.log("Add GPS Query");
    this.batchGPS.set( this.currentIdGps, { "callback" : cb } );
    this.runBatchs();
    return this.currentIdGps++;
  }

  addQueryRegion( region : string, zone : string, cb : Function ) : number {
    console.log("Add Region Query");
    this.batchRegion.set( this.currentIdRegion, { "region": region, "zone" : zone, "callback": cb } );
    this.runBatchs();
    return this.currentIdRegion++;
  }

  removeQueryRegion( id : number ) : boolean {
    console.log("Remove Region Query");
    return this.batchRegion.delete( id );
  }

  removeQueryQPS( id : number ) : boolean {
    console.log("Remove GPS Query");
    return this.batchGPS.delete( id );
  }

  setTimeoutTaskValue( msec : number ){
    if( msec < 1000 ){
      console.error( "Timeout value too low ! Forced to 1 seconde.");
      msec = 1000;
    }
    this.timeoutTaskValue = msec;
  }

  private timeoutTask( msec : number ){
    this.runBatchs();
    setTimeout( () => this.timeoutTask(msec), msec );
  }

  private runBatchs(){
    console.log("Run batchs");
    let itGps = this.batchGPS.values();
    let itRegion = this.batchRegion.values();

    for( let tmp = itGps.next(); !tmp.done; tmp = itGps.next() ){
      this.sendGPSRequest()
        .then( (obs) => {
          obs.subscribe( res => tmp.value.callback(res), err => console.error( err ) );
        })
        .catch( (err) => {
          console.error( err );
        });
    }

    for( let tmp = itRegion.next(); !tmp.done; tmp = itRegion.next() ){
      this.sendRegionRequest( tmp.value.region, tmp.value.zone ).subscribe( res => tmp.value.callback( res ), err => console.error(err) );
    }
  }

  private sendRegionRequest( region : string, zone : string ){
    return this.http.get( "http://papillon-jnth.rhcloud/get/iqa/" + region + "/" + zone ).map( (res:Response) => res.json() );
    //return this.http.get( "http://papillon-jnth.rhcloud.com/get/iqa/random").map( (res:Response) => res.json() );
  }

  private sendGPSRequest() : Promise<Observable<Object>>{
    return new Promise<Observable<Object>>( (resolve, reject) => {
        this.getCurrentGPSPosition()
          .then( (position) => {
            console.log( position.coords.latitude );
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
