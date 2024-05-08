import { Component, inject } from '@angular/core';
import { CurrentWeatherComponent } from '@components/current-weather/current-weather.component';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from '@layouts/header/header.component';
import { FooterComponent } from '@layouts/footer/footer.component';
import { Store } from '@ngrx/store';
import { selectAllFavorite } from '@state/favorite/favorite.selectors';
import { CommonModule } from '@angular/common';
import { IFavoriteLocation } from '@models/weather.interface';
import { Router } from '@angular/router';
import { CityService } from '@services/local/city.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CurrentWeatherComponent,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  store = inject(Store);
  favoriteLocations$ = this.store.select(selectAllFavorite);
  cityService = inject(CityService);
  router = inject(Router);

  onClick(location: IFavoriteLocation) {
    this.cityService.setCityKey(location.id);

    this.router.navigate(['']);
  }
}
