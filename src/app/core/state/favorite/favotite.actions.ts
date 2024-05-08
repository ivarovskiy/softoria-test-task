import { createAction, props } from '@ngrx/store';
import { ICurrentWeatherData } from '@models/weather.interface';

export const addToFavorites = createAction(
  '[Header Component] Add To Favorite',
  props<{
    location: string;
    id: string;
    weather: ICurrentWeatherData;
  }>()
);

export const removeFromFavorites = createAction(
  '[Header Component] Remove From Favorite',
  props<{ id: string }>()
);
