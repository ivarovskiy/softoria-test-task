import { TestBed } from '@angular/core/testing';

import { TwelveHourForecastService } from './twelve-hour-forecast.service';

describe('TwelveHoursForecastService', () => {
  let service: TwelveHourForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwelveHourForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
