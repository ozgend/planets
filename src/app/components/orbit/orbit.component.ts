import { Component, HostListener, EventEmitter, OnInit, ElementRef, Input, ViewChild, OnDestroy } from '@angular/core';
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
    private canvasContext: any;
    private mousedrag = new EventEmitter();
    private mouseup = new EventEmitter<MouseEvent>();
    private mousedown = new EventEmitter<MouseEvent>();
    private mousemove = new EventEmitter<MouseEvent>();

    private currentZoom: number = 1;
    private _diameterRatio = 8000;
    private _distanceRatio = 3500000;

    subscription: Subscription;
    spaceObjects: SpaceObject[];
    sun: SpaceObject;
    selectedSpaceObject: SpaceObject;

    constructor(private spaceObjectService: SpaceObjectService) {
        this.subscription = this.spaceObjectService.selectionObservable.subscribe(spaceObject => { this.onSelect(spaceObject); });
    }

    private mouseDown: boolean = false;
    private last: MouseEvent;

    @HostListener('mouseup')
    onMouseup() {
        if (!this.selectedSpaceObject) {
            return;
        }
        this.mouseDown = false;
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        if (!this.selectedSpaceObject) {
            return;
        }
        if (this.mouseDown) {
            this.transformCanvas((event.clientX - this.last.clientX) / this.currentZoom, (event.clientY - this.last.clientY) / this.currentZoom);
            this.last = event;
        }
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent) {
        if (!this.selectedSpaceObject) {
            return;
        }
        this.mouseDown = true;
        this.last = event;
    }

    @HostListener('wheel', ['$event'])
    onMouseScroll(event: WheelEvent) {
        if (!this.selectedSpaceObject) {
            return;
        }
        this.zoomCanvas(event.wheelDelta);
    }


    ngAfterViewInit() {
        console.log('ngAfterViewInit');
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '800px';
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.canvasContext = this.canvas.getContext('2d');
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
        if (this.spaceObjects.length == 0) {
            return;
        }
        this.selectedSpaceObject = spaceObject;
        this.draw(spaceObject);
    }

    draw(selectedSpaceObject: SpaceObject = null) {
        if (!selectedSpaceObject) {
            return;
        }

        var centerX = 1;
        var centerY = this.canvas.height / 2;

        this.clearCanvas();

        //sun
        this.canvasContext.beginPath();
        this.canvasContext.arc(centerX, centerY, this.sun.diameter / (this._diameterRatio * 20), 0, 2 * Math.PI, false);
        this.canvasContext.fillStyle = 'orange';
        this.canvasContext.fill();


        for (let i = 0; i < this.spaceObjects.length; i++) {

            var isSelected = this.spaceObjects[i].uid == selectedSpaceObject.uid;

            var scaledOrbitRadius = this.spaceObjects[i].distance / this._distanceRatio; // rough!

            this.canvasContext.beginPath();
            this.canvasContext.arc(centerX, centerY, scaledOrbitRadius, 1.8 * Math.PI, 2.2 * Math.PI, false);
            this.canvasContext.lineWidth = 1;
            this.canvasContext.strokeStyle = isSelected ? '#3c9bbb' : '#ccc';
            this.canvasContext.stroke();

            var scaledDiameter = this.spaceObjects[i].diameter / this._diameterRatio;

            this.canvasContext.beginPath();
            this.canvasContext.arc(scaledOrbitRadius, centerY, scaledDiameter, 0, 2 * Math.PI, false);
            this.canvasContext.fillStyle = isSelected ? '#3c9bbb' : 'gray';
            this.canvasContext.fill();

        }
    }

    zoomCanvas(value: number): void {
        if (value < 0) {
            this.currentZoom = this.currentZoom - 0.05;
        }
        else if (value > 0) {
            this.currentZoom = this.currentZoom + 0.05;
        }
        this.canvasContext.scale(this.currentZoom, this.currentZoom);
        this.draw(this.selectedSpaceObject);
    }

    transformCanvas(x: number, y: number): void {
        this.canvasContext.translate(x, y);
        this.draw(this.selectedSpaceObject);
    }

    resetZoom(): void {
        this.currentZoom = 1;
        this.zoomCanvas(0);
    }

    resetPan(): void {
        this.canvasContext.setTransform(this.currentZoom, 0, 0, this.currentZoom, 0, 0);
        this.draw(this.selectedSpaceObject);
    }

    clearCanvas(): void {
        this.canvasContext.save();
        this.canvasContext.setTransform(this.currentZoom, 0, 0, this.currentZoom, 0, 0);
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.restore();
    }

}


