import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';


import { Planet } from '../models/planet';

@Injectable()
export class PlanetDataService {

  private _planets: Planet[] = [
    { id: 111, name: 'Mercury', distanceToSun: 57.9 },
    { id: 112, name: 'Venus', distanceToSun: 108.2 },
    { id: 113, name: 'Earth', distanceToSun: 149.6 },
    { id: 114, name: 'Mars', distanceToSun: 227.9 },
    { id: 115, name: 'Jupiter', distanceToSun: 778.3 },
    { id: 116, name: 'Saturn', distanceToSun: 1427.0 },
    { id: 117, name: 'Uranus', distanceToSun: 2871.0 },
    { id: 118, name: 'Neptune', distanceToSun: 4497.1 },
    { id: 119, name: 'Pluto', distanceToSun: 5913.0 }
  ];

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

