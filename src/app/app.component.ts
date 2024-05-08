import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeolocationService } from './utils/geolocation.service';
import { map, switchMap } from 'rxjs';
import { GeopositionSearchService } from './core/services/http/geoposition-search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CityService } from './core/services/local/city.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentGeolocationPositionService = inject(GeolocationService);
  currentGeopositionSearchService = inject(GeopositionSearchService);
  cityService = inject(CityService);

  constructor() {
    this.currentGeolocationPositionService
      .getCurrentLocation()
      .pipe(
        takeUntilDestroyed(),
        map(response => ({
          Latitude: response.latitude,
          Longitude: response.longitude,
        })),
        switchMap(coordinates =>
          this.currentGeopositionSearchService.searchByCoords(coordinates)
        )
      )
      .subscribe({
        next: response => {
          this.cityService.setCityKey(response[0].Key);
          this.cityService.setCityLocalizedName(
            `${response[0].LocalizedName}, ${response[0].Country.ID}`
          );
        },
        error: error => {
          console.error(error);
        },
      });
  }
}
