import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { defaultCityCoords } from '@constants/contants';
import { apiEndPoint } from '@constants/apiEndPoints';
import { ICoords } from '@models/weather.interface';
import { ErrorDialogComponent } from '@components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class GeopositionSearchService {
  http = inject(HttpClient);
  dialog = inject(MatDialog);

  searchByCoords(coordinates: ICoords): Observable<any> {
    const params = new HttpParams().set(
      'q',
      `${coordinates.Latitude},${coordinates.Longitude}`
    );

    return this.http
      .get<ICoords>(apiEndPoint.geopositionSearch, {
        params,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 503) {
            this.dialog.open(ErrorDialogComponent).afterClosed();
            return of(defaultCityCoords);
          }
          return throwError(() => new Error('Something went wrong'));
        })
      );
  }
}
