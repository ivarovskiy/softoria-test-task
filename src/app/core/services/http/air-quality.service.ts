import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable, iif, of } from 'rxjs';
import { airApiEndPoint } from '@constants/apiEndPoints';
import airQuality from '@mock-data/airQuality.json';
import { IAirQualityResponse, ICoords } from '@models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class AirQualityService {
  http = inject(HttpClient);

  getAirQuality(cityCoords: ICoords): Observable<IAirQualityResponse> {
    const params = new HttpParams()
      .set('lat', cityCoords.Latitude)
      .set('lon', cityCoords.Longitude);
    return iif(
      isDevMode,
      of(airQuality),
      this.http.get<IAirQualityResponse>(airApiEndPoint, {
        params,
      })
    );
  }
}
