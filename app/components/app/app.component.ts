import { Component, OnInit } from '@angular/core';
import { WearableManager } from '../../services/wearable-manager/wearable-manager.service';
import { ApiAirDeamonService } from "../../services/ApiAirDeamon/ApiAirDeamon.service";
@Component({
  selector : "butterfly-app",
  template : "<router-outlet></router-outlet>"
})

export class AppComponent{
  title = "Butterfly in my Phone";

  constructor( private wearableManager : WearableManager, private apiAirDeamon :  ApiAirDeamonService ){}

  ngOnInit(){
    this.apiAirDeamon.init();
    
    this.wearableManager.loadWearables()
                          .then( () => console.log("Wearable loaded") )
                          .catch( (e) => console.error( "[Wearable] : " + e ) );
  }
}
