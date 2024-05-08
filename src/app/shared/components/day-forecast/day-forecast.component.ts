import { Component, Input } from '@angular/core';
import { IDailyForecast } from '@models/weather.interface';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TemperatureConversionPipe } from '@pipes/temperature-conversion.pipe';

@Component({
  selector: 'app-day-forecast',
  standalone: true,
  imports: [DatePipe, DecimalPipe, TemperatureConversionPipe],
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.scss'],
})
export class DayForecastComponent {
  @Input() dayForecast!: IDailyForecast;

  get date() {
    return this.dayForecast?.Date;
  }

  get weatherImage() {
    return this.dayForecast?.Day.Icon;
  }

  get temperatureDay() {
    return this.dayForecast?.Temperature?.Maximum?.Value;
  }

  get temperatureNight() {
    return this.dayForecast?.Temperature?.Minimum?.Value;
  }
}
