import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ICurrentWeatherData } from '@models/weather.interface';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent {
  @Input() data!: ICurrentWeatherData;
  // temperature!: number;
  // weatherText!: string;
  // date!: string;
  // weatherImage!: number;

  get temperature() {
    return this.data?.Temperature?.Metric?.Value;
  }

  get weatherText() {
    return this.data?.WeatherText;
  }

  get date() {
    return this.data?.LocalObservationDateTime;
  }

  get weatherImage() {
    return this.data?.WeatherIcon;
  }

  get cityName() {
    return this.data?.cityLocalizedName;
  }
}
