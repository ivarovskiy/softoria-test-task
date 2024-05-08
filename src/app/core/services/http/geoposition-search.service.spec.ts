import { TestBed } from '@angular/core/testing';

import { GeopositionSearchService } from './geoposition-search.service';

describe('GeopositionSearchService', () => {
  let service: GeopositionSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeopositionSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
