import { Component, OnInit } from '@angular/core';
import { WearableManager } from "../../services/wearable-manager/wearable-manager.service";
import { Wearable } from "../../objects/wearable/wearable.object";

import { ElementSequin } from "../../objects/elements/element-sequin.object";
import { ElementPixel } from "../../objects/elements/element-pixel.object";
import { ElementStripPixel } from "../../objects/elements/element-stripPixel.object";

import { BLEService } from "../../services/ble/ble.service";

@Component({
  selector: "customize",
  templateUrl : "app/templates/customize/customize.template.html",
})
export class CustomizeComponent {
  constructor( private wearableManager : WearableManager, private bleService : BLEService ){}

  private showLoading : boolean = false;
  private availableWearables : Wearable[];
  private elementsOutputBlock : string[];
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

    // TODO Make for inputs
    let outputs = this.wearableManager.getSelectWearable().outputs;
    for( let index in this.wearableManager.getSelectWearable().outputs ){
      if( outputs[index] instanceof ElementSequin ){
        this.elementsOutputBlock.push( "onoff" );
      }
      else if( outputs[index] instanceof ElementPixel ){
          this.elementsOutputBlock.push( "color" );
      }
      else if( outputs[index] instanceof ElementStripPixel ){
          this.elementsOutputBlock.push( "strip" );
      }
      else{
        console.error( "Unknown instance type of element" );
      }
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
