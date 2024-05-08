import { TestBed } from '@angular/core/testing';

import { AutocompleteSearchService } from './autocomplete-search.service';

describe('AutocompleteSearchService', () => {
  let service: AutocompleteSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompleteSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
