import { Component, Input } from '@angular/core';
import { IAqiText, IHightlightsData } from '@models/weather.interface';
import { aqiText } from '@constants/aqiText';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-hightlight',
  standalone: true,
  imports: [MatTooltipModule, DatePipe, DecimalPipe],
  templateUrl: './hightlight.component.html',
  styleUrl: './hightlight.component.scss',
})
export class HightlightComponent {
  @Input() data!: IHightlightsData;
  aqiText: IAqiText = aqiText;

  get airQuality() {
    return this.data?.airQuality;
  }
  get aqi() {
    return this.data?.aqi;
  }

  get sunrise() {
    return this.data?.dayForecastData.DailyForecasts[0].Sun.Rise;
  }

  get sunset() {
    return this.data?.dayForecastData.DailyForecasts[0].Sun.Set;
  }

  get humidity() {
    return this.data?.mainForecastData.RelativeHumidity;
  }

  get pressure() {
    return this.data?.mainForecastData.Pressure.Metric.Value;
  }

  get visibility() {
    return this.data?.mainForecastData.Visibility.Metric.Value;
  }

  get feelsLike() {
    return this.data?.mainForecastData.RealFeelTemperature.Metric.Value;
  }
}
