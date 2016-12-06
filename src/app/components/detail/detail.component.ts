import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Planet } from '../../models/planet';
import { PlanetDataService } from '../../services/planet-data.service';

@Component({
  selector: 'planet-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnDestroy {
  @Input() selectedPlanet: Planet;
  subscription: Subscription;


  constructor(private planetDataService: PlanetDataService) {
    this.subscription = this.planetDataService.selectionObservable.subscribe(planet => { this.onSelect(planet); });
  }

  onSelect(planet: Planet) {
    this.planetDataService.getPlanet(planet.id).then(planet => this.selectedPlanet = planet);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



