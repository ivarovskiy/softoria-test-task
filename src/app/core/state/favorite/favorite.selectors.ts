import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { IFavoritesLocationState } from './favorite.reducer';

export const selectFavorite = (state: AppState) => state.favoriteLocations;
export const selectAllFavorite = createSelector(
  selectFavorite,
  (state: IFavoritesLocationState) => state.favoriteLocations
);
