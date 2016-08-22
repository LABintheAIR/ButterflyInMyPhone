import { Component,
  trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';

@Component({
  selector: "menu",
  templateUrl : "app/templates/menu/menu.template.html",
  styleUrls : [`app/templates/menu/menu.template.css`],
  animations: [
    trigger('menuState', [
      state('inactive', style( {
        transform: 'translateX(0)'
      })),
      state('active',   style( {
        transform: 'translateX(304px)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ],
})

export class MenuComponent{
  public state = 'active';

  toggleState(){
    this.state = (this.state === 'active' ? 'inactive' : 'active');
  }
}
