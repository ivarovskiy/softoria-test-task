import { ICurrentWeatherData } from '../models/weather.interface';

export const weatherTemplate: ICurrentWeatherData = {
  LocalObservationDateTime: '',
  cityLocalizedName: '',
  Temperature: {
    Metric: {
      Value: 0,
      Unit: '',
      UnitType: 0,
    },
    Imperial: {
      Value: 0,
      Unit: '',
      UnitType: 0,
    },
  },
  WeatherText: '',
  WeatherIcon: 0,
  RealFeelTemperature: {
    Metric: {
      Value: 0,
      Unit: '',
      UnitType: 0,
      Phrase: '',
    },
    Imperial: {
      Value: 0,
      Unit: '',
      UnitType: 0,
      Phrase: '',
    },
  },
  RelativeHumidity: 0,
  Visibility: {
    Metric: {
      Value: 0,
      Unit: '',
      UnitType: 0,
    },
    Imperial: {
      Value: 0,
      Unit: '',
      UnitType: 0,
    },
  },
  Pressure: {
    Metric: {
      Value: 0,
      Unit: '',
      UnitType: 0,
    },
    Imperial: {
      Value: 0,
      Unit: '',
      UnitType: 0,
    },
  },
};
