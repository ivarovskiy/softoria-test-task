import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable, iif, of } from 'rxjs';
import oneDayForecastData from '@mock-data/oneDayForecastData.json';
import { HttpClient, HttpParams } from '@angular/common/http';
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
      this.http.get<any>(`${apiEndPoint.oneDayForecast}${cityKey}`, {
        params,
      })
    );
  }
}
