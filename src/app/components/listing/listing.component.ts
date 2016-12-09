import { Component, OnInit } from '@angular/core';
import { SpaceObject } from '../../models/space-object';
import { SpaceObjectService, TypeFilterPipe } from '../../services/space-object.service';

@Component({
    selector: 'space-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.css']
})

export class ListingComponent implements OnInit {
    spaceObjects: SpaceObject[];
    selectionUid: string;

    constructor(private spaceObjectService: SpaceObjectService) { }

    ngOnInit(): void {
        this.getSpaceObjects();
    }

    getSpaceObjects(): void {
        this.spaceObjectService.getAll().then(spaceObjects => this.spaceObjects = spaceObjects);
    }


    onSelect(spaceObject: SpaceObject): void {
        this.selectionUid = spaceObject.uid;
        this.spaceObjectService.onSelect(spaceObject);
    }

}


