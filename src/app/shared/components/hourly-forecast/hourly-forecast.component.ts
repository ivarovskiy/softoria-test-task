import { Component, Input } from '@angular/core';
import { IHourlyForecastData } from '@models/weather.interface';
import { DatePipe } from '@angular/common';
import { TemperatureConversionPipe } from '@pipes/temperature-conversion.pipe';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [DatePipe, TemperatureConversionPipe],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss',
})
export class HourlyForecastComponent {
  @Input() data!: IHourlyForecastData;

  get isDay() {
    return this.data?.IsDaylight;
  }

  get date() {
    return this.data?.DateTime;
  }

  get temperature() {
    return this.data?.Temperature.Value;
  }

  get weatherImage() {
    return this.data?.WeatherIcon;
  }

  get weatherText() {
    return this.data?.IconPhrase;
  }
}
