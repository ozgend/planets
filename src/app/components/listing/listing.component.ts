import { Component, OnInit } from '@angular/core';
import { Planet } from '../../models/planet';
import { PlanetDataService } from '../../services/planet-data.service';

@Component({
    selector: 'planet-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.css']
})

export class ListingComponent implements OnInit {
    planets: Planet[];
    selectedPlanet: Planet;

    constructor(private planetDataService: PlanetDataService) { }

    ngOnInit(): void {
        this.loadPlanets();
    }

    loadPlanets(): void {
        this.planetDataService.getPlanets().then(planets => this.planets = planets);
    }

    onSelect(planet: Planet): void {
        this.selectedPlanet = planet;
        this.planetDataService.onSelect(planet);
    }

}


