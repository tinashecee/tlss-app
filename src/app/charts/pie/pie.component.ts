import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [BaseChartDirective, MaterialModule],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss',
})
export class PieComponent {
  // PolarArea
  public polarAreaChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail Sales',
    'Telesales',
    'Corporate Sales',
  ];
  public polarAreaChartDatasets: ChartConfiguration<'polarArea'>['data']['datasets'] =
    [{ data: [300, 500, 100, 40, 120] }];
  public polarAreaLegend = true;

  public polarAreaOptions: ChartConfiguration<'polarArea'>['options'] = {
    responsive: false,
  };
}
