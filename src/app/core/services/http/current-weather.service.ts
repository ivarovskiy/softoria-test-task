import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable, of, iif, catchError, throwError } from 'rxjs';
import { apiEndPoint } from '@constants/apiEndPoints';
import currentWeather from '@mock-data/currentWeather.json';
import { ICurrentWeatherData } from '@models/weather.interface';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherService {
  http = inject(HttpClient);
  dialog = inject(MatDialog);

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
          catchError((error: any) => {
            if (error) {
              console.error('API limit reached, using default data');
              this.dialog.open(ErrorDialogComponent).afterClosed();

              return of(currentWeather);
            }

            return throwError(() => error);
          })
        )
    );
  }
}
