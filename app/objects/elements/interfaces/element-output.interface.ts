import { ElementInterface } from './element.interface';
import { BLEService } from "../../../services/ble/ble.service";

export interface ElementOutputInterface extends ElementInterface {
  sendData( bleService : BLEService ) : Promise<any>;
}
