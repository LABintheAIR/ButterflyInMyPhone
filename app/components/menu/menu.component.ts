import { Component,
  trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor( private router : Router ){}

  toggleState(){
    this.state = (this.state === 'active' ? 'inactive' : 'active');
  }

  forceInactive(){
    this.state = 'inactive';
  }

  gotoAirQuality(){
    this.forceInactive();
    this.router.navigate(['/air-quality']);
  }

  gotoCustomize(){
    this.forceInactive();
    //this.router.navigate(['/air-quality']);
  }

  gotoTutorial(){
    this.forceInactive();
    //this.router.navigate(['/air-quality']);
  }

  gotoShare(){
    this.forceInactive();
    //this.router.navigate(['/air-quality']);
  }

  gotoDisconnect(){
    this.forceInactive();
    //this.router.navigate(['/air-quality']);
  }
}
