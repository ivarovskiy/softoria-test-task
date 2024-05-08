import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CityService } from '@services/local/city.service';
import { defaultCityCoords } from '@constants/contants';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  cityService = inject(CityService);

  getCurrentLocation(): Observable<any> {
    return new Observable(observer => {
      if (!navigator.geolocation) {
        observer.error('Geolocation is not supported by this browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          this.cityService.setCityCoords(position.coords);
          observer.next(position.coords), observer.complete();
        },
        error => {
          this.cityService.setCityCoords(defaultCityCoords);
          observer.next(defaultCityCoords), observer.complete();
          switch (error.code) {
            case 1:
              observer.error('Permission denied.');
              break;
            case 2:
              observer.error('Position unavailable.');
              break;
            case 3:
              observer.error('Timeout.');
              break;
            default:
              observer.error('An unknown error occurred.');
          }
        }
      );
    }).pipe(
      map(position => (position ? position : null)),
      catchError(error => throwError(error))
    );
  }
}
