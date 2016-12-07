import { Component, OnInit, ElementRef, Input, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PlanetDataService } from '../../services/planet-data.service';
import { Planet } from '../../models/planet';

@Component({
  selector: 'planet-orbit',
  templateUrl: './orbit.component.html',
  styleUrls: ['./orbit.component.css']
})
export class OrbitComponent {
  @ViewChild('orbitCanvas') canvasRef: ElementRef;
  private canvas: any;

  planets: Planet[];
  subscription: Subscription;

  private _diameterRatio = 8000;
  private _distanceRatio = 3500000;

  constructor(private planetDataService: PlanetDataService) {
    this.subscription = this.planetDataService.selectionObservable.subscribe(planet => { this.onSelect(planet); });
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '400px';
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.loadPlanets();
  }

  loadPlanets(): void {
    this.planetDataService.getPlanets().then(
      planets => {
        this.planets = planets;
        this.draw();
      }
    );
  }

  onSelect(planet: Planet) {
    this.draw(planet);
  }

  draw(selectedPlanet: Planet = null) {
    if (!selectedPlanet) {
      return;
    }

    var context = this.canvas.getContext('2d');
    var centerX = 1;
    var centerY = this.canvas.height / 2;

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //sun
    context.beginPath();
    context.arc(centerX, centerY, this.planetDataService.sun.diameter / (this._diameterRatio * 20), 0, 2 * Math.PI, false);
    context.fillStyle = 'orange';
    context.fill();


    for (let i = 0; i < this.planets.length; i++) {

      var isSelected = this.planets[i].id == selectedPlanet.id;

      var orbitRadius = this.planets[i].distanceToSun / this._distanceRatio; // rough!

      context.beginPath();
      context.arc(centerX, centerY, orbitRadius, 1.8 * Math.PI, 2.2 * Math.PI, false);
      context.lineWidth = 1;
      context.strokeStyle = isSelected ? '#3c9bbb' : '#ccc';
      context.stroke();

      var planetDiameter = this.planets[i].diameter / this._diameterRatio;

      context.beginPath();
      context.arc(orbitRadius, centerY, planetDiameter, 0, 2 * Math.PI, false);
      context.fillStyle = isSelected ? '#3c9bbb' : 'gray';
      context.fill();

    }

  }
}


