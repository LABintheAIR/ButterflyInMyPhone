import { ElementOutputInterface } from "../elements/interfaces/element-output.interface";

import { ElementSequin } from "../elements/element-sequin.object";
import { ElementPixel } from "../elements/element-pixel.object";
import { ElementStripPixel } from "../elements/element-stripPixel.object";

import { BLEService } from "../../services/ble/ble.service";

class Mutex{
  private lock = false;

  askLock( wait=true ){
    if( wait && this.lock ){
      while( this.lock ){}
    }

    if( !this.lock ){
      this.lock = true;
    }
  }

  unlock(){
    this.lock = false;
  }
}

export class Wearable{
  name : string;
  description : string;
  inputs : any[]; //TODO Create interfaces
  outputs : any[];

  private mutexData = new Mutex();
  private nbSentData = 0;

  loadToJson( json : any ){
    this.name = json.name;
    this.description = json.description;
    this.inputs = [];
    this.outputs = [];

    /* TODO Parse Inputs element */

    for( let output of json.outputs ){
      switch( output.type ){
        case "sequin":
          var sequin = new ElementSequin();
          sequin.loadToJson( output );
          this.outputs.push( sequin );
          break;

        case "pixel":
          var pixel = new ElementPixel();
          pixel.loadToJson( output );
          this.outputs.push( pixel );
          break;

        case "strip":
          var strip = new ElementStripPixel();
          strip.loadToJson( output );
          this.outputs.push( strip );
          break;

        default:
          console.error("[WEARABLE OBJECT] Unknown type element : " + output.type );
          break;
      }
    }
  }

  sendData( bleService : BLEService ){
    return this.sendDataElement( 0, bleService );
  }

  private sendDataElement( index : number, bleService : BLEService ){
    var element = this.outputs[index];
    return new Promise( (resolve, reject) => {

      if( index == 0 ){
        this.mutexData.askLock();
      }

      element.sendData( bleService ).then( () => {
        if( index + 1 < this.outputs.length ){
          this.sendDataElement( index + 1, bleService ).catch( (err) => { reject( err ) } );
        }
        this.addDataSent();
        resolve();
      })
      .catch( (err) => {
        this.addDataSent();
        reject( "[" + index + "] : " + err );
      });
    });
  }

  private addDataSent(){
    this.nbSentData++;
    if( this.nbSentData >= this.outputs.length ){
      this.mutexData.unlock();
      this.nbSentData = 0;
    }
  }
}
