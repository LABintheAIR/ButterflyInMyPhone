import {  Component,
          Input, Output, EventEmitter,
          ElementRef, ViewChild,
          AfterContentInit
        } from "@angular/core";

@Component({
  selector: "colorPicker",
  templateUrl: "app/templates/color-picker/color-picker.template.html"
})
export class ColorPickerComponent implements AfterContentInit {
  @Input() colorPicker = "#FFFFFF";
  @Output() colorPickerChange = new EventEmitter();
  @ViewChild('myInputColor') element : ElementRef;

  private isInitDone = false;

  onInputColorChange(){
    this.colorPicker = this.element.nativeElement.value;
    this.colorPickerChange.emit( this.colorPicker );
  }

  ngAfterContentInit() : void {
    if( !this.isInitDone ){
      let picker = new jscolor( this.element.nativeElement );
      picker.mode = "HVS";
      picker.borderColor = "#FFFFFF";
      picker.insertColor = "#FFFFFF";
      picker.backgroundColor = "#666666";
      picker.fromString(this.colorPicker);
      this.isInitDone = true;
    }
  }
}
