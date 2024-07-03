import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialModule } from '../../../_module/Material.Module';
@Component({
  selector: 'app-line',
  standalone: true,
  imports: [BaseChartDirective, MaterialModule],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineComponent {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 67, 5, 17, 34, 12],
        label: 'Appointments',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;
}
