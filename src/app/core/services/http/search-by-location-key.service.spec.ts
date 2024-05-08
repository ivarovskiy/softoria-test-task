import { TestBed } from '@angular/core/testing';

import { SearchByLocationKeyService } from './search-by-location-key.service';

describe('SearchByLocationKeyService', () => {
  let service: SearchByLocationKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchByLocationKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
