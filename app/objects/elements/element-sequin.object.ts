import { ElementOutputInterface } from "./interfaces/element-output.interface";
import { BLEService } from "../../services/ble/ble.service";

export class ElementSequin implements ElementOutputInterface {
  name : string;
  description : string;
  pin : number;
  state : boolean;

  sendData( bleService : BLEService ){
    return bleService.sendPinState( this.pin, this.state );
  }

  setState( state : boolean ){
    this.state = state;
  }

  loadToJson( json : any ){
    this.name = json.name;
    this.description = json.description;
    this.pin = json.pin;
    this.state = false;
  }
}
