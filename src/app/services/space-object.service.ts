import { Injectable, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Rx";
import { SpaceObject } from '../models/space-object';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Pipe({
    name: 'typeFilter',
    pure: false
})

@Injectable()
export class TypeFilterPipe implements PipeTransform {
    transform(items: SpaceObject[], type: string): any {
        return items.filter(item => item.type == type);
    }
}

@Injectable()
export class SpaceObjectService {

    public selectionObservable: EventEmitter<SpaceObject>;
    private _spaceObjects: SpaceObject[];

    constructor(private http: Http) {
        this.selectionObservable = new EventEmitter<SpaceObject>();
    }

    onSelect(spaceObject: SpaceObject) {
        this.selectionObservable.next(spaceObject);
    }

    getAll(): Promise<SpaceObject[]> {
        var promise;

        if (!this._spaceObjects || this._spaceObjects.length == 0) {
            promise = this.http.get('https://solar-system-api.herokuapp.com/api/space/all')
                .toPromise()
                .then(response => {
                    this._spaceObjects = response.json();
                    return response.json() as SpaceObject[];
                })
                .catch(this.handleError);
        }
        else {
            promise = Promise.resolve(this._spaceObjects);
        }

        return promise;
    };

    findPlanetIndexById(uid: string) {
        var index = this._spaceObjects.findIndex(p => p.uid == uid);
        return index;
    }

    private handleError(error: any): Promise<any> {
        console.error('error ', error);
        return Promise.reject(error.message || error);
    }

}

