import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Planet } from '../models/planet';

@Injectable()
export class PlanetDataService {

  private _planets: Planet[] = [
    { id: 111, name: 'Mercury', distanceToSun: 57910000, diameter: 4800 },
    { id: 112, name: 'Venus', distanceToSun: 108200000, diameter: 12100 },
    { id: 113, name: 'Earth', distanceToSun: 149600000, diameter: 12750 },
    { id: 114, name: 'Mars', distanceToSun: 227940000, diameter: 6800 },
    { id: 115, name: 'Jupiter', distanceToSun: 778330000, diameter: 142800 },
    { id: 116, name: 'Saturn', distanceToSun: 1424600000, diameter: 120660 },
    { id: 117, name: 'Uranus', distanceToSun: 2873550000, diameter: 51800 },
    { id: 118, name: 'Neptune', distanceToSun: 4497100000, diameter: 49500 }
  ];

  public sun: Planet = { id: 100, name: 'Sun', distanceToSun: 0, diameter: 695700 };

  public selectionObservable: EventEmitter<Planet>;

  constructor() {
    this.selectionObservable = new EventEmitter();
  }

  onSelect(planet: Planet) {
    this.selectionObservable.next(planet);
  }

  getPlanets(): Promise<Planet[]> {
    return Promise.resolve(this._planets);
  };

  getPlanet(id: number): Promise<Planet> {
    var index = this.findPlanetIndexById(id);
    return Promise.resolve(this._planets[index]);
  };

  deletePlanet(planet: Planet): void {
    var index = this.findPlanetIndexById(planet.id);
    this._planets.splice(index, 1);
  }

  updatePlanet(planet: Planet): void {
    this.deletePlanet(planet);
    this._planets.push(planet);
  }

  findPlanetIndexById(id: number) {
    var index = this._planets.findIndex(p => p.id == id);
    return index;
  }

}

