import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  defaultCityCoords,
  defaultCityLocalizedName,
  defaultCityKey,
} from '@constants/contants';
import {
  ICoords,
  ICurrentWeatherData,
  IFavoriteLocation,
} from '@models/weather.interface';
import { weatherTemplate } from '@constants/emptyWeatherTemplate';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private cityData: IFavoriteLocation = {
    id: '',
    location: '',
    weather: weatherTemplate,
  };

  private cityKey$: BehaviorSubject<string> = new BehaviorSubject<string>(
    defaultCityKey[0].Key
  );

  private cityLocalizedName$: BehaviorSubject<string> =
    new BehaviorSubject<string>(defaultCityLocalizedName[0].LocalizedName);

  private cityCoords$: BehaviorSubject<ICoords> = new BehaviorSubject<ICoords>(
    defaultCityCoords[0]
  );

  private cityWeather$: BehaviorSubject<ICurrentWeatherData> =
    new BehaviorSubject<ICurrentWeatherData>(weatherTemplate);

  private cityData$: BehaviorSubject<IFavoriteLocation> =
    new BehaviorSubject<IFavoriteLocation>(this.cityData);

  setCityKey(key: string) {
    this.cityKey$.next(key);
  }

  setCityLocalizedName(name: string) {
    this.cityLocalizedName$.next(name);
  }

  setCityCoords(coords: any) {
    this.cityCoords$.next(coords);
  }

  setCityWeather(weather: any) {
    this.cityWeather$.next(weather);
  }

  setCityData() {
    this.cityData$.next({
      id: this.getCityKey().getValue(),
      location: this.getCityEnglishName().getValue(),
      weather: this.getCityWeather().getValue(),
    });
  }

  getCityKey() {
    return this.cityKey$;
  }

  getCityEnglishName() {
    return this.cityLocalizedName$;
  }

  getCityCoords() {
    return this.cityCoords$;
  }

  getCityWeather() {
    return this.cityWeather$;
  }

  getCityData() {
    return this.cityData$;
  }
}
