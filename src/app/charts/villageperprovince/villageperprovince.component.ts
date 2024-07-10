import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialModule } from '../../../_module/Material.Module';
@Component({
  selector: 'app-villageperprovince',
  standalone: true,
  imports: [BaseChartDirective, MaterialModule],
  templateUrl: './villageperprovince.component.html',
  styleUrl: './villageperprovince.component.scss',
})
export class VillageperprovinceComponent {
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
