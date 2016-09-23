import { ElementOutputInterface } from "./interfaces/element-output.interface";
import { ElementPixel } from "./element-pixel.object";
import { BLEService } from "../../services/ble/ble.service";

export class ElementStripPixel implements ElementOutputInterface {
  name : string;
  description : string;
  pixels : ElementPixel[];
  private colorStart : number[] = [255, 255, 255];
  private colorEnd : number[] = [255, 255, 255];
  private colorDelta : number[] = [0, 0, 0];
  private nbPixelOn : number = 0;

  sendData( bleService : BLEService ){
    console.log( this.pixels );
    return this.sendPixelsData( 0, bleService );
  }

  loadToJson( json : any ){
    this.name = json.name;
    this.description = json.description;
    this.pixels = [];
    var i;
    for( i = 0; i < json.number_pin; i++ ){
      this.pixels.push( new ElementPixel() );
    }
  }

  setStartColor( str : string ){
    str = str.replace('#', '');
    this.colorStart[0] = parseInt( "0x" + str[0] + str[1] );
    this.colorStart[1] = parseInt( "0x" + str[2] + str[3] );
    this.colorStart[2] = parseInt( "0x" + str[4] + str[5] );
    this.generateColorDelta();
    this.updatePixelElementColor();
  }

  setEndColor( str : string ){
    str = str.replace('#', '');
    this.colorEnd[0] = parseInt( "0x" + str[0] + str[1] );
    this.colorEnd[1] = parseInt( "0x" + str[2] + str[3] );
    this.colorEnd[2] = parseInt( "0x" + str[4] + str[5] );
    this.generateColorDelta();
    this.updatePixelElementColor();
  }

  setNumberLightOnFormPercent( percent : number ){
    this.nbPixelOn = Math.trunc( ( this.pixels.length * percent ) / 100 );
    this.generateColorDelta();
    this.updatePixelElementColor();
  }

  private generateColorDelta(){
    this.colorDelta[0] = (this.colorEnd[0] - this.colorStart[0]) / (this.pixels.length - 1);
    this.colorDelta[1] = (this.colorEnd[1] - this.colorStart[1]) / (this.pixels.length - 1);
    this.colorDelta[2] = (this.colorEnd[2] - this.colorStart[2]) / (this.pixels.length - 1);
    console.log( this.colorDelta );
  }

  private updatePixelElementColor(){
    let i = 0;
    for( let pixel of this.pixels ){
      if( i < this.nbPixelOn ){
        pixel.fromRGB(  this.colorStart[0] + this.colorDelta[0]*i,
                        this.colorStart[1] + this.colorDelta[1]*i,
                        this.colorStart[2] + this.colorDelta[2]*i);
      }
      else{
        pixel.fromRGB( 0, 0, 0 );
      }
      i++;
    }
  }

  private sendPixelsData( numPixel : number, bleService : BLEService )
  {
    var pixel = this.pixels[numPixel];
    return new Promise( (resolve, reject) => {
      pixel.sendData( bleService ).then( () => {
        console.log( pixel.color )
        if( numPixel + 1 < this.pixels.length ){
          this.sendPixelsData( numPixel + 1, bleService ).then( () => resolve() ).catch( (err) => { reject( err ) } );
        }
        else{
          resolve();
        }
      })
      .catch( (err) => {
        reject( "[" + numPixel + "] : " + err );
      });
    });
  }
}
