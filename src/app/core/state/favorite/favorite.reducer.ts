import { ActionReducer, MetaReducer, createReducer, on } from '@ngrx/store';
import { addToFavorites, removeFromFavorites } from './favotite.actions';
import { localStorageSync } from 'ngrx-store-localstorage';
import { IFavoriteLocation } from '@models/weather.interface';

export interface IFavoritesLocationState {
  favoriteLocations: IFavoriteLocation[];
}

export const initialState: IFavoritesLocationState = {
  favoriteLocations: [],
};

export const favoriteLocationsReducer = createReducer<IFavoritesLocationState>(
  initialState,
  on(
    addToFavorites,
    (state, { location, id, weather }): IFavoritesLocationState => ({
      ...state,
      favoriteLocations: [
        ...state.favoriteLocations,
        { location, id, weather },
      ],
    })
  ),
  on(removeFromFavorites, (state, { id }) => ({
    ...state,
    favoriteLocations: state.favoriteLocations.filter(
      (favorite: any) => favorite.id !== id
    ),
  }))
);

function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['favoriteLocations'], rehydrate: true })(
    reducer
  );
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];
