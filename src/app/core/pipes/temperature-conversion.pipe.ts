import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConversion',
  standalone: true,
})
export class TemperatureConversionPipe implements PipeTransform {
  transform(temperature: number, unit: string): string {
    if (unit === 'C') {
      return ((temperature * 9) / 5 + 32).toFixed();
    } else if (unit === 'F') {
      return (((temperature - 32) * 5) / 9).toFixed();
    } else {
      return temperature.toFixed();
    }
  }
}
