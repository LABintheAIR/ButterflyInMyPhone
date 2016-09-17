import {  Component,
          Input, Output, EventEmitter
        } from "@angular/core";

@Component({
  selector: "onoff-switch",
  templateUrl: "app/templates/onoff-switch/onoff-switch.template.html",
  styleUrls: [ "app/templates/onoff-switch/onoff-switch.template.css" ]
})
export class OnOffSwitchComponent {
  @Input() value = false;
  @Output() valueChange = new EventEmitter();

  onValueChange( event ){
    this.value = event;
    this.valueChange.emit( this.value );
  }
}
