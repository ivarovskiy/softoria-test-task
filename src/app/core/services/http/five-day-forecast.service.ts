import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable, iif, of } from 'rxjs';
import fiveDaysForecast from '@mock-data/fiveDaysForecast.json';
import { IFiveDayForecastData } from '@models/weather.interface';
import { apiEndPoint } from '@constants/apiEndPoints';

@Injectable({
  providedIn: 'root',
})
export class FiveDayForecastService {
  http = inject(HttpClient);

  getFiveDayForecast(cityKey: string): Observable<IFiveDayForecastData> {
    const params = new HttpParams().set('details', 'true');

    return iif(
      isDevMode,
      of(fiveDaysForecast),
      this.http.get<IFiveDayForecastData>(
        `${apiEndPoint.fiveDaysForecast}${cityKey}`,
        {
          params,
        }
      )
    );
  }
}
