import { ElementOutputInterface } from "../elements/interfaces/element-output.interface";

import { ElementSequin } from "../elements/element-sequin.object";
import { ElementPixel } from "../elements/element-pixel.object";
import { ElementStripPixel } from "../elements/element-stripPixel.object";

export class Wearable{
  name : string;
  description : string;
  inputs : any[]; //TODO Create interfaces
  outputs : ElementOutputInterface[];

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

        case "pixel_strip":
          var strip = new ElementStripPixel();
          strip.loadToJson( output );
          this.outputs.push( strip );
          break;

        default:
          console.error("Unknown type element : " + output.type );
          break;
      }
    }
  }
}
