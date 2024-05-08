import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable, of, iif, catchError, throwError } from 'rxjs';
import { apiEndPoint } from '@constants/apiEndPoints';
import currentWeather from '@mock-data/currentWeather.json';
import { ICurrentWeatherData } from '@models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherService {
  http = inject(HttpClient);

  getCurrentWeather(cityKey: string): Observable<any> {
    const params = new HttpParams().set('details', 'true');

    return iif(
      isDevMode,
      of(currentWeather),
      this.http
        .get<ICurrentWeatherData>(`${apiEndPoint.currentWeather}${cityKey}`, {
          params,
        })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 503) {
              console.error('API limit reached, using default data');
              return of(currentWeather);
            }

            return throwError(() => new Error('Something went wrong'));
          })
        )
    );
  }
}
