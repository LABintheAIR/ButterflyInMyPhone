export class Station{
  private name : string;
  private region : string;
  private zone : string;

  loadToJSON( json : any ){
    this.name = json.name;
    this.region = json.region;
    this.zone = json.zone;
  }

  getName() : string { return this.name }
  getRegion() : string { return this.region }
  getZone() : string { return this.zone }
}
