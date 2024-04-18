import { Component } from '@angular/core';
import { CurrentWeatherComponent } from '../../components/current-weather/current-weather.component';
import { DayForecastComponent } from '../../components/day-forecast/day-forecast.component';
import { HightlightComponent } from '../../components/hightlight/hightlight.component';
import { HourlyForecastComponent } from '../../components/hourly-forecast/hourly-forecast.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CurrentWeatherComponent,
    DayForecastComponent,
    HightlightComponent,
    HourlyForecastComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
