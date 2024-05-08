import { IChartData } from '@models/weather.interface';
import { EChartsOption } from 'echarts';

export function getChartOptions(data: IChartData): EChartsOption {
  const { dates, maxTemps, minTemps } = data;
  return {
    grid: {
      left: '3%',
      bottom: '3%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        color: '#ffffff',
      },
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: [10, 15],
      extraCssText: 'min-width: 200px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);',
    },
    legend: {
      data: ['Day', 'Night'],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates.map(date => formatDate(date)),
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C',
      },
    },
    series: [
      {
        name: 'Day',
        type: 'line',
        data: maxTemps.map(temp => fahrenheitToCelsius(temp)),
        markPoint: {
          data: [
            { type: 'max', name: 'Day' },
            { type: 'min', name: 'Night' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
        },
      },
      {
        name: 'Night',
        type: 'line',
        data: minTemps.map(temp => fahrenheitToCelsius(temp)),
        markPoint: {
          data: [
            { type: 'max', name: 'Day' },
            { type: 'min', name: 'Night' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
        },
      },
    ],
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g., "Apr 18"
}

function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}
