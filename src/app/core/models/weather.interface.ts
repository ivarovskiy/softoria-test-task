export interface IHeadline {
  EffectiveDate: string;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: string;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
}

export interface ITemperature {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface IMetric {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface IRealFeelTemperature {
  Metric: {
    Value: number;
    Unit: string;
    UnitType: number;
    Phrase: string;
  };
  Imperial: {
    Value: number;
    Unit: string;
    UnitType: number;
    Phrase: string;
  };
}

export interface IDayNight {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string;
  PrecipitationIntensity?: string;
}

export interface IDailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: IMetric;
    Maximum: IMetric;
  };
  Day: IDayNight;
  Night: IDayNight;
  Sources: string[];
  MobileLink: string;
  Link: string;
}

export interface IFiveDayForecastData {
  Headline: IHeadline;
  DailyForecasts: IDailyForecast[];
}

export interface ICurrentWeatherData {
  cityLocalizedName: string;
  LocalObservationDateTime: string;
  Temperature: {
    Metric: IMetric;
    Imperial: IMetric;
  };
  WeatherText: string;
  WeatherIcon: number;
  RealFeelTemperature: IRealFeelTemperature;
  RelativeHumidity: number;
  Visibility: {
    Metric: IMetric;
    Imperial: IMetric;
  };
  Pressure: {
    Metric: IMetric;
    Imperial: IMetric;
  };
}

interface ICoord {
  lon: number;
  lat: number;
}

interface IMainData {
  aqi: number;
}

export interface IAirComponentsData {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

interface IAirQualityDataPoint {
  main: IMainData;
  components: IAirComponentsData;
  dt: number;
}

export interface IAirQualityResponse {
  coord: ICoord;
  list: IAirQualityDataPoint[];
}

interface AqiLevelDescription {
  level: string;
  message: string;
}

export interface IAqiText {
  [key: number]: AqiLevelDescription; // Indexed access with number keys
}

export interface IOneDayForecastData {
  Headline: IHeadline;
  DailyForecasts: [
    {
      Sun: {
        Rise: string;
        Set: string;
      };
    },
  ];
}

export interface IHightlightsData {
  aqi: number;
  airQuality: IAirComponentsData;
  mainForecastData: ICurrentWeatherData;
  dayForecastData: IOneDayForecastData; //temp
}

export interface IHourlyForecastData {
  DateTime: string;
  WeatherIcon: number;
  IconPhrase: string;
  IsDaylight: boolean;
  Temperature: ITemperature;
}

export interface ICoords {
  Latitude: number;
  Longitude: number;
}

export interface IGeopositionSearch {
  Key: string;
  EnglishName: string;
}

export interface IFavoriteLocation {
  id: string;
  location: string;
  weather: ICurrentWeatherData;
}

export interface IChartData {
  dates: string[];
  maxTemps: number[];
  minTemps: number[];
}
