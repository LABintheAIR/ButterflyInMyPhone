import { ElementOutputInterface } from "./interfaces/element-output.interface";
import { BLEService } from "../../services/ble/ble.service";

export class ElementPixel implements ElementOutputInterface {
  name : string;
  description : string;
  color : number[];

  constructor(){
    this.name = "";
    this.description = "";
    this.color = [0, 0, 0];
  }

  sendData( bleService : BLEService ){
    return bleService.sendColor( this.color[0], this.color[1], this.color[2] );
  }

  loadToJson( json : any ){
    this.name = json.name;
    this.description = json.description;
    this.color = [0, 0, 0];
  }

  fromString( str : string ){
    str = str.replace('#', '');
    this.color[0] = parseInt( "0x" + str[0] + str[1] );
    this.color[1] = parseInt( "0x" + str[2] + str[3] );
    this.color[2] = parseInt( "0x" + str[4] + str[5] );
  }

  fromRGB( r : number, g : number, b : number ){
    this.color[0] = r;
    this.color[1] = g;
    this.color[2] = b;
  }
}
