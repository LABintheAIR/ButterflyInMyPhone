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
}
