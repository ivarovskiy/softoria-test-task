import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable, iif, of } from 'rxjs';
import { defaultCityKey } from '@constants/contants';
import { apiEndPoint } from '@constants/apiEndPoints';
import { ICoords } from '@models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class GeopositionSearchService {
  http = inject(HttpClient);

  searchByCoords(coordinates: ICoords): Observable<any> {
    const params = new HttpParams().set(
      'q',
      `${coordinates.Latitude},${coordinates.Longitude}`
    );

    return this.http.get<ICoords>(apiEndPoint.geopositionSearch, {
      params,
    });
  }
}
