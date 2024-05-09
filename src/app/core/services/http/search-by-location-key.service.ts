import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { apiEndPoint } from '@constants/apiEndPoints';
import { ICoords } from '@models/weather.interface';
import { defaultCityCoordsError } from '@constants/contants';

@Injectable({
  providedIn: 'root',
})
export class SearchByLocationKeyService {
  http = inject(HttpClient);

  getCoordsByLocationKey(cityKey: string): Observable<any> {
    return this.http
      .get<ICoords>(`${apiEndPoint.searchByLocationKey}${cityKey}`)
      .pipe(
        catchError((error: any) => {
          if (error) {
            return of(defaultCityCoordsError);
          }
          return throwError(() => error);
        })
      );
  }
}
