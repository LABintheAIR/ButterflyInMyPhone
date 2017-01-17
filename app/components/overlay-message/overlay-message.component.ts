import  { Component, Input, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "overlay-message",
  templateUrl : "app/templates/overlay-message/overlay-message.template.html",
  styleUrls : [ "app/templates/overlay-message/overlay-message.template.css" ]
})

export class OverlayMessageComponent {
  /*@Input() message : string;*/
  @Input() loading = false;
  @ViewChild( "overlay" ) el : ElementRef;

  ngOnInit(){
    console.log( "Inner Width : " + window.screen.width + "px" )
    console.log( "Width : " + this.el.nativeElement.style.width + "px" );
      this.el.nativeElement.style.width = window.screen.width;
    console.log( "Width : " + this.el.nativeElement.style.width + "px" );
  }
}
