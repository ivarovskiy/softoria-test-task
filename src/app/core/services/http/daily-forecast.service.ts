import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable, catchError, iif, of, throwError } from 'rxjs';
import oneDayForecastData from '@mock-data/oneDayForecastData.json';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { apiEndPoint } from '@constants/apiEndPoints';

@Injectable({
  providedIn: 'root',
})
export class DailyForecastService {
  http = inject(HttpClient);

  getDailyForecast(cityKey: string): Observable<any> {
    const params = new HttpParams().set('details', 'true');
    return iif(
      isDevMode,
      of(oneDayForecastData),
      this.http
        .get<any>(`${apiEndPoint.oneDayForecast}${cityKey}`, {
          params,
        })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 503) {
              console.error('API limit reached, using default data');
              return of(oneDayForecastData);
            }

            return throwError(() => new Error('Something went wrong'));
          })
        )
    );
  }
}
