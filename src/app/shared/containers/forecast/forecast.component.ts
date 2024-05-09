import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CurrentWeatherComponent } from '@components/current-weather/current-weather.component';
import { LoaderComponent } from '@components/loader/loader.component';
import { DayForecastComponent } from '@components/day-forecast/day-forecast.component';
import { HightlightComponent } from '@components/hightlight/hightlight.component';
import { HourlyForecastComponent } from '@components/hourly-forecast/hourly-forecast.component';
import { CurrentWeatherService } from '@services/http/current-weather.service';
import { AirQualityService } from '@services/http/air-quality.service';
import { DailyForecastService } from '@services/http/daily-forecast.service';
import { TwelveHourForecastService } from '@services/http/twelve-hour-forecast.service';
import { FiveDayForecastService } from '@services/http/five-day-forecast.service';
import { ChartComponent } from '@components/chart/chart.component';

import {
  IChartData,
  ICurrentWeatherData,
  IDailyForecast,
  IHightlightsData,
  IHourlyForecastData,
} from '@models/weather.interface';

import { Subscription, forkJoin, switchMap } from 'rxjs';
import { CityService } from '@services/local/city.service';
import { SearchByLocationKeyService } from '@services/http/search-by-location-key.service';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    CurrentWeatherComponent,
    DayForecastComponent,
    HightlightComponent,
    HourlyForecastComponent,
    LoaderComponent,
    ChartComponent,
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
})
export class ForecastComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  mainForecastData!: ICurrentWeatherData;
  hightlightsForecastData!: IHightlightsData;
  fiveDaysForecastData!: IDailyForecast[];
  chartData!: IChartData;
  twelveHoursForecastData!: IHourlyForecastData[];
  isCharts = false;

  cityService = inject(CityService);
  currentWeatherService = inject(CurrentWeatherService);
  searchByLocationService = inject(SearchByLocationKeyService);
  airQualityService = inject(AirQualityService);
  dailyForecastService = inject(DailyForecastService);
  fiveDaysForecastService = inject(FiveDayForecastService);
  twelveHoursForecastService = inject(TwelveHourForecastService);

  constructor() {}

  ngOnInit(): void {
    this.subscription = this.cityService.getCityKey().subscribe({
      next: cityKey => {
        forkJoin({
          currentWeather: this.currentWeatherService.getCurrentWeather(cityKey),
          airQuality: this.searchByLocationService
            .getCoordsByLocationKey(cityKey)
            .pipe(
              switchMap(coords =>
                this.airQualityService.getAirQuality(coords.GeoPosition)
              )
            ),
          dailyForecast: this.dailyForecastService.getDailyForecast(cityKey),
        }).subscribe({
          next: response => {
            console.log('city key is: ', cityKey);

            const combinedData = {
              mainForecastData: response.currentWeather[0],
              aqi: response.airQuality?.list[0].main.aqi,
              airQuality: response.airQuality?.list[0].components,
              dayForecastData: response.dailyForecast,
            };
            this.hightlightsForecastData = combinedData;
            this.mainForecastData = combinedData.mainForecastData;
            this.cityService.setCityWeather(this.mainForecastData);
            this.cityService.getCityEnglishName().subscribe({
              next: name => {
                this.mainForecastData.cityLocalizedName = name;
              },
            });
            this.cityService.setCityData();
          },
          error: error => {
            console.error('Error fetching data:', error);
          },
        });
        this.fiveDaysForecastService.getFiveDayForecast(cityKey).subscribe({
          next: response => {
            this.fiveDaysForecastData = response.DailyForecasts;

            this.chartData = {
              dates: [],
              maxTemps: [],
              minTemps: [],
            };
            this.chartData.dates = response.DailyForecasts.map(item =>
              item.Date.substring(0, 10)
            );
            this.chartData.maxTemps = response.DailyForecasts.map(
              item => item.Temperature.Maximum.Value
            );
            this.chartData.minTemps = response.DailyForecasts.map(
              item => item.Temperature.Minimum.Value
            );
          },
          error: error => {
            console.error(error);
          },
        });
        this.twelveHoursForecastService
          .getNextTwelveHoursForecast(cityKey)
          .subscribe({
            next: response => {
              this.twelveHoursForecastData = response;
            },
            error: error => {
              console.error(error);
            },
          });
      },
      error: error => {
        console.error(error);
      },
    });
  }

  toggleCharts(): void {
    this.isCharts = !this.isCharts;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
