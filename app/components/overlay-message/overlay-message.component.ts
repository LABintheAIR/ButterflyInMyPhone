import  { Component, Input, AfterViewChecked, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "overlay-message",
  templateUrl : "app/templates/overlay-message/overlay-message.template.html",
  styleUrls : [ "app/templates/overlay-message/overlay-message.template.css" ]
})

export class OverlayMessageComponent {
  /*@Input() message : string;*/
  @Input() loading = false;
  @ViewChild( "overlay" ) el : ElementRef;

  ngAfterViewChecked(){
    console.log( "Inner Width : " + window.innerWidth + "px" )
    console.log( "Width : " + this.el.nativeElement.width + "px" );
    this.el.nativeElement.height = window.innerHeight;
    this.el.nativeElement.width = window.innerWidth;
    console.log( "Width : " + this.el.nativeElement.width + "px" );
  }
}
