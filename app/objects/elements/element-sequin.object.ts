import { ElementOutputInterface } from "./interfaces/element-output.interface";
import { BLEService } from "../../services/ble/ble.service";

export class ElementSequin implements ElementOutputInterface {
  name : string;
  description : string;
  type : string;
  pin : number;
  state : boolean;

  sendData( bleService : BLEService ){
    return bleService.sendPinState( this.pin, this.state );
  }
}
