import { Component, OnInit } from '@angular/core';

import { WearableManager } from '../../services/wearable-manager/wearable-manager.service';
import { ApiAirDeamonService } from "../../services/ApiAirDeamon/ApiAirDeamon.service";
import { StationManagerService } from "../../services/station-manager/station-manager.service";

@Component({
  selector : "butterfly-app",
  template : "<router-outlet></router-outlet>"
})
export class AppComponent{
  title = "Butterfly in my Phone";

  constructor(  private wearableManager : WearableManager,
                private apiAirDeamon :  ApiAirDeamonService,
                private stationManager : StationManagerService ){}

  ngOnInit(){
    this.apiAirDeamon.init();

    this.wearableManager.loadWearables()
                          .then( () => console.log("Wearable loaded") )
                          .catch( (e) => console.error( "[Wearable] : " + e ) );
    this.stationManager.loadStations()
                          .then( () => console.log("Stations loaded") )
                          .catch( (e) => console.error( "[Stations] : " + e ) );
  }
}
