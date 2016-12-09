import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SpaceObject } from '../../models/space-object';
import { SpaceObjectService } from '../../services/space-object.service';

@Component({
  selector: 'space-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnDestroy {
  spaceObject: SpaceObject;
  subscription: Subscription;

  constructor(private spaceObjectService: SpaceObjectService) {
    this.subscription = this.spaceObjectService.selectionObservable.subscribe(spaceObject => { this.onSelect(spaceObject); });
  }

  onSelect(spaceObject: SpaceObject) {
    this.spaceObject = spaceObject;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



