import  { Component, Input } from "@angular/core";

@Component({
  selector: "overlay-message",
  templateUrl : "app/templates/overlay-message/overlay-message.template.html",
  styleUrls : [ "app/templates/overlay-message/overlay-message.template.css" ]
})

export class OverlayMessageComponent {
  /*@Input() message : string;*/
  @Input() loading = false;
}
