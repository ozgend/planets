import { Component, OnInit, ElementRef, Input, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SpaceObjectService } from '../../services/space-object.service';
import { SpaceObject } from '../../models/space-object';

@Component({
  selector: 'space-orbit',
  templateUrl: './orbit.component.html',
  styleUrls: ['./orbit.component.css']
})
export class OrbitComponent {
  @ViewChild('orbitCanvas') canvasRef: ElementRef;
  private canvas: any;

  subscription: Subscription;
  spaceObjects: SpaceObject[];
  sun: SpaceObject;

  private _diameterRatio = 8000;
  private _distanceRatio = 3500000;

  constructor(private spaceObjectService: SpaceObjectService) {
    this.subscription = this.spaceObjectService.selectionObservable.subscribe(spaceObject => { this.onSelect(spaceObject); });
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '400px';
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.getSpaceObjects();
  }

  getSpaceObjects(): void {
    this.spaceObjectService.getAll().then(
      spaceObjects => {
        this.spaceObjects = spaceObjects.filter(so => so.type != 'star');
        this.sun = spaceObjects.find(so => so.type == 'star');
        this.draw();
      }
    );
  }

  onSelect(spaceObject: SpaceObject) {
    this.draw(spaceObject);
  }

  draw(selectedSpaceObject: SpaceObject = null) {
    if (!selectedSpaceObject) {
      return;
    }

    var context = this.canvas.getContext('2d');
    var centerX = 1;
    var centerY = this.canvas.height / 2;

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //sun
    context.beginPath();
    context.arc(centerX, centerY, this.sun.diameter / (this._diameterRatio * 20), 0, 2 * Math.PI, false);
    context.fillStyle = 'orange';
    context.fill();


    for (let i = 0; i < this.spaceObjects.length; i++) {

      var isSelected = this.spaceObjects[i].uid == selectedSpaceObject.uid;

      var scaledOrbitRadius = this.spaceObjects[i].distance / this._distanceRatio; // rough!

      context.beginPath();
      context.arc(centerX, centerY, scaledOrbitRadius, 1.8 * Math.PI, 2.2 * Math.PI, false);
      context.lineWidth = 1;
      context.strokeStyle = isSelected ? '#3c9bbb' : '#ccc';
      context.stroke();

      var scaledDiameter = this.spaceObjects[i].diameter / this._diameterRatio;

      context.beginPath();
      context.arc(scaledOrbitRadius, centerY, scaledDiameter, 0, 2 * Math.PI, false);
      context.fillStyle = isSelected ? '#3c9bbb' : 'gray';
      context.fill();

    }

  }
}


