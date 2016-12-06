/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanetDataService } from './planet-data.service';

describe('PlanetDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanetDataService]
    });
  });

  it('should ...', inject([PlanetDataService], (service: PlanetDataService) => {
    expect(service).toBeTruthy();
  }));
});
