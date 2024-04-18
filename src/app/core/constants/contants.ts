import { environment } from '../../../environments/environment';

export const apiEndPoint = {
  locationAutocomplete: `${environment.apiUrl}/locations/v1/cities/autocomplete`,
  currentWeather: `${environment.apiUrl}/currentconditions/v1/`,
  fiveDaysForecast: `${environment.apiUrl}/forecasts/v1/daily/5day/`,
};
