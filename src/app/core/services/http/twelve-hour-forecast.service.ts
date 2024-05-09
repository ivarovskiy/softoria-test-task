import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import twelveHoursForecast from '@mock-data/twelveHoursForecast.json';
import { Observable, catchError, iif, of, throwError } from 'rxjs';
import { apiEndPoint } from '@constants/apiEndPoints';
import { IHourlyForecastData } from '@models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class TwelveHourForecastService {
  http = inject(HttpClient);

  getNextTwelveHoursForecast(cityKey: string): Observable<any> {
    const params = new HttpParams().set('details', 'true');

    return iif(
      isDevMode,
      of(twelveHoursForecast),
      this.http
        .get<IHourlyForecastData>(
          `${apiEndPoint.twelveHourForecast}${cityKey}`,
          {
            params,
          }
        )
        .pipe(
          catchError((error: any) => {
            if (error) {
              console.error('API limit reached, using default data');
              return of(twelveHoursForecast);
            }

            return throwError(() => error);
          })
        )
    );
  }
}
