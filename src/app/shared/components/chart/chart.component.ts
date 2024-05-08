import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { getChartOptions } from './chart.options';
import * as echarts from 'echarts';
import { IChartData } from '@models/weather.interface';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  @Input() data!: IChartData;
  private myChart!: echarts.ECharts | null;

  initChart() {
    this.myChart = echarts.init(document.getElementById('chart'));
    const options = getChartOptions(this.data);
    this.myChart.setOption(options);
  }
  ngAfterViewInit() {
    this.initChart();
  }

  ngOnDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
      this.myChart = null;
    }
  }
}
