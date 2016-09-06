import { ElementOutputInterface } from "./interfaces/element-output.interface";
import { ElementPixel } from "./element-pixel.object";
import { BLEService } from "../../services/ble/ble.service";

export class ElementStripPixel implements ElementOutputInterface {
  name : string;
  description : string;
  type : string;
  pixels : ElementPixel[];

  sendData( bleService : BLEService ){
    return this.sendPixelsData( 0, bleService );
  }

  private sendPixelsData( numPixel : number, bleService : BLEService )
  {
    var pixel = this.pixels[numPixel];
    return new Promise( (resolve, reject) => {
      pixel.sendData( bleService ).then( () => {
        if( numPixel + 1 < this.pixels.length ){
          this.sendPixelsData( numPixel + 1, bleService ).catch( (err) => { reject( err ) } );
        }
        resolve();
      })
      .catch( (err) => {
        reject( "[" + numPixel + "] : " + err );
      });
    });
  }
}
