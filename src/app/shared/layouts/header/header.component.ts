import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SearchFieldComponent } from '@components/search-field/search-field.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CityService } from '@services/local/city.service';
import {
  addToFavorites,
  removeFromFavorites,
} from '@state/favorite/favotite.actions';
import { Subscription, combineLatest, map } from 'rxjs';
import { IFavoriteLocation } from '@models/weather.interface';
import { selectAllFavorite } from '@state/favorite/favorite.selectors';
import { AsyncyPipe } from '@tony-builder/asyncy';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AsyncyPipe,
    MatIconModule,
    SearchFieldComponent,
    MatTabsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  store = inject(Store);
  router = inject(Router);
  cityService = inject(CityService);

  globalSubscription = new Subscription();

  isFavorite = false;
  cityKey = '';
  city!: IFavoriteLocation;
  favoriteLocations$ = this.store.select(selectAllFavorite);

  ngOnInit(): void {
    const favoriteStatusSubscription = combineLatest([
      this.cityService.getCityData(),
      this.store.select(selectAllFavorite),
      this.cityService.getCityKey(),
    ])
      .pipe(
        map(([cityData, favorites, key]) => {
          this.city = cityData;
          this.cityKey = key;
          return favorites.some(favorite => favorite.id === cityData.id);
        })
      )
      .subscribe(isFavorite => {
        this.isFavorite = isFavorite;
      });

    this.globalSubscription.add(favoriteStatusSubscription);
  }

  ngOnDestroy(): void {
    this.globalSubscription.unsubscribe();
  }

  addLocationToFavorite(city: IFavoriteLocation) {
    this.store.dispatch(addToFavorites(city));
  }

  removeLocationFromFavorite(cityKey: string) {
    this.store.dispatch(removeFromFavorites({ id: cityKey }));
  }
}
