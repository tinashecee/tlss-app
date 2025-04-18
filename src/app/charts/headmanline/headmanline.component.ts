import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialModule } from '../../../_module/Material.Module';
@Component({
  selector: 'app-headmanline',
  standalone: true,
  imports: [BaseChartDirective, MaterialModule],
  templateUrl: './headmanline.component.html',
  styleUrl: './headmanline.component.scss',
})
export class HeadmanlineComponent {
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [
    ['Download', 'Sales'],
    ['In', 'Store', 'Sales'],
    'Mail Sales',
  ];
  public pieChartDatasets = [
    {
      data: [300, 500, 100],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
