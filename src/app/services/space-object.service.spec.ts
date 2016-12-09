/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpaceObjectService } from './space-object.service';

describe('SpaceObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpaceObjectService]
    });
  });

  it('should ...', inject([SpaceObjectService], (service: SpaceObjectService) => {
    expect(service).toBeTruthy();
  }));
});
