import { TestBed } from '@angular/core/testing';

import { FiveDaysForecastService } from './five-day-forecast.service';

describe('FiveDaysForecastService', () => {
  let service: FiveDaysForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiveDaysForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
