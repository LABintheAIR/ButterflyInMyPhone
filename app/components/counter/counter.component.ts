import {  Component,
          Input, Output, EventEmitter
        } from "@angular/core";

@Component({
  selector: "counter",
  templateUrl: "app/templates/counter/counter.template.html",
  styleUrls: [ "app/templates/counter/counter.template.css" ]
})
export class CounterComponent {
  @Input() value = 0;
  @Input() min = -1000000;
  @Input() max = 1000000;
  @Input() step = 1;
  @Output() valueChange = new EventEmitter();

  increment(){
    this.value += this.step;
    if( this.value > this.max ) { this.value = this.max; }
    this.valueChange.emit(this.value);
  }

  decrement(){
    this.value -= this.step;
    if( this.value < this.min ) { this.value = this.min; }
    this.valueChange.emit(this.value);
  }

  onValueChange( event ){
    if( event == null ){ event = 0; }
    this.value = event;
    this.valueChange.emit( this.value );
  }
}
