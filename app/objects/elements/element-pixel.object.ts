import { ElementOutputInterface } from "./interfaces/element-output.interface";
import { BLEService } from "../../services/ble/ble.service";

export class ElementPixel implements ElementOutputInterface {
  name : string;
  description : string;
  type : string;
  color : number[];

  sendData( bleService : BLEService ){
    return bleService.sendColor( this.color[0], this.color[1], this.color[2] );
  }
}
