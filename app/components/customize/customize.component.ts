import { Component, OnInit } from '@angular/core';
import { WearableManager } from "../../services/wearable-manager/wearable-manager.service";
import { Wearable } from "../../objects/wearable/wearable.object";

import { ElementSequin } from "../../objects/elements/element-sequin.object";
import { ElementPixel } from "../../objects/elements/element-pixel.object";
import { ElementStripPixel } from "../../objects/elements/element-stripPixel.object";

import { BLEService } from "../../services/ble/ble.service";
import { ApiAirDeamonService } from "../../services/ApiAirDeamon/ApiAirDeamon.service";
import { StationManagerService } from "../../services/station-manager/station-manager.service";

@Component({
  selector: "customize",
  templateUrl : "app/templates/customize/customize.template.html",
  styleUrls : [ "app/templates/customize/customize.template.css" ]
})
export class CustomizeComponent {
  constructor(  private wearableManager : WearableManager,
                private bleService : BLEService,
                private apiAirDeamon : ApiAirDeamonService,
                private stationManager : StationManagerService ){}

  private ELEMENT_SEQUIN = "onoff";
  private ELEMENT_PIXEL = "color";
  private ELEMENT_STRIP = "strip";

  private MODE_MANUAL = -2;
  private MODE_GPS    = -1;

  private showLoading : boolean = false;
  private availableWearables : Wearable[];
  private elementsOutputBlock : string[];

  private idGpsQuery : number[];
  private idRegionQuery : number[];
  currentSelectIndex = -1;

  ngOnInit(){
    this.availableWearables = this.wearableManager.getAvailableWearables();
    console.log( this.availableWearables );
  }

  onSelectWearableChange( event ){
    if( event == -1 ){
      return;
    }
    this.currentSelectIndex = event;
    if( ! this.wearableManager.selectWearable( this.currentSelectIndex ) ){
      console.error( "Failed to set wearable" );
    }
    this.generateForm();
  }

  generateForm() : void {
    if( this.wearableManager.getSelectWearable() == null ){
      return;
    }
    this.elementsOutputBlock = [];
    this.idGpsQuery = new Array(this.wearableManager.getSelectWearable().outputs.length);
    this.idRegionQuery = new Array(this.wearableManager.getSelectWearable().outputs.length);

    /* TODO Make for inputs */

    let outputs = this.wearableManager.getSelectWearable().outputs;
    for( let index in this.wearableManager.getSelectWearable().outputs ){
      if( outputs[index] instanceof ElementSequin ){
        this.elementsOutputBlock.push( this.ELEMENT_SEQUIN );
      }
      else if( outputs[index] instanceof ElementPixel ){
          this.elementsOutputBlock.push( this.ELEMENT_PIXEL );
      }
      else if( outputs[index] instanceof ElementStripPixel ){
          this.elementsOutputBlock.push( this.ELEMENT_STRIP );
      }
      else{
        console.error( "Unknown instance type of element" );
      }
    }
  }

  updateMode( index : number, mode : any ){
    mode = parseInt( mode );
    this.safeRemoveQuery( index );
    switch( mode ){
      case this.MODE_MANUAL:
        this.idGpsQuery[index] = undefined;
        this.idRegionQuery[index] = undefined;
        break;

      case this.MODE_GPS:
        this.idGpsQuery[index] = this.apiAirDeamon.addQueryGPS( (data) => { console.log( "GPS query result DATA" ); console.log( data );
                                                                            this.wearableManager.getSelectWearable().outputs[index].fromString( data.value );
                                                                            this.wearableManager.getSelectWearable().sendData(this.bleService);
                                                                          } );
        this.idRegionQuery[index] = undefined;
        break;

      default:
        this.idGpsQuery[index] = undefined;
        this.idRegionQuery[index] = this.apiAirDeamon.addQueryRegion( this.stationManager.getStation(index).getRegion(),
                                                                      this.stationManager.getStation(index).getZone(),
                                                                      (data) => {
                                                                        this.applyDataToOuput( index, data );
                                                                        this.wearableManager.getSelectWearable().sendData(this.bleService);
                                                                      } );
        break;
    }

    if( this.isFillOfUndefined( this.idGpsQuery ) ){
      this.apiAirDeamon.setTimeoutTaskValue( 900000 ) /* 900 000 = 15 minutes */
    }
    else{
      this.apiAirDeamon.setTimeoutTaskValue( 60000 ) /* 60 000 = 1 minute */
    }
  }

  private isFillOfUndefined( tab : Array<any> ) : boolean {
    for( let e of tab ){
      if( e !== undefined ){
        return false;
      }
    }

    return true;
  }

  private applyDataToOuput( index : number, data ){
    console.log( this.elementsOutputBlock[index] );
    if( this.elementsOutputBlock[index] == this.ELEMENT_SEQUIN ){
      if( data.iqa[0] >= 50 ){ /* TODO Let the user choose the trigger value */
        this.wearableManager.getSelectWearable().outputs[index].setState( true );
      }
      else{
        this.wearableManager.getSelectWearable().outputs[index].setState( false );
      }
    }
    else if( this.elementsOutputBlock[index] == this.ELEMENT_PIXEL ){
      console.log( data );
      this.wearableManager.getSelectWearable().outputs[index].fromRGB( data.color[0][0], data.color[0][1], data.color[0][2] );
      this.wearableManager.getSelectWearable().outputs[index].sendData(this.bleService);
    }
    else if( this.elementsOutputBlock[index] == this.ELEMENT_STRIP ){
      this.wearableManager.getSelectWearable().outputs[index].setNumberLightOnFormPercent( data.iqa[0] );
    }
    else{
      console.error( "[ApplyData] : Unknown index : " + index );
    }
  }

  private safeRemoveQuery( index : number ){
    if( this.idGpsQuery[index] !== undefined ){
      this.apiAirDeamon.removeQueryQPS( index );
    }
    else if( this.idRegionQuery[index] !== undefined ){
      this.apiAirDeamon.removeQueryRegion( index );
    }
  }

  updateSequinState( index : number, event : boolean ) : void {
    let sequin : ElementSequin = this.wearableManager.getSelectWearable().outputs[index];
    sequin.setState( event );
    this.showLoading = true;
    sequin.sendData( this.bleService )
            .then( () => { this.showLoading = false; } )
            .catch( (e) => { console.error( e ); this.showLoading = false; } );
  }

  updatePixelElement( index : number, event : string ) : void{
    let pixel : ElementPixel = this.wearableManager.getSelectWearable().outputs[index];
    pixel.fromString(event);
    this.showLoading = true;
    this.wearableManager.getSelectWearable().sendData( this.bleService )
      .then( () => { this.showLoading = false;} )
      .catch( (e) => { console.error(e); this.showLoading = false; } );
  }

  updateStartColorStrip( index : number, event : string ) : void{
    let strip : ElementStripPixel = this.wearableManager.getSelectWearable().outputs[index];
    strip.setStartColor(event);
    this.sendStripData( index );
  }

  updateEndColorStrip( index : number, event : string ) : void{
    let strip : ElementStripPixel = this.wearableManager.getSelectWearable().outputs[index];
    strip.setEndColor(event);
    this.sendStripData( index );
  }

  updatePercenteColorStrip( index : number, event : string ) : void{
    let strip : ElementStripPixel = this.wearableManager.getSelectWearable().outputs[index];
    strip.setNumberLightOnFormPercent( parseInt( event ) );
    this.sendStripData( index );
  }

  private sendStripData( index : number ){
    let strip : ElementStripPixel = this.wearableManager.getSelectWearable().outputs[index];
    this.showLoading = true;
    strip.sendData( this.bleService )
      .then( () => { this.showLoading = false; } )
      .catch( (e) => { console.error(e); this.showLoading = false; } );
  }
}
