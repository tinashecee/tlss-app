import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs';
import { MaterialModule } from '../../../_module/Material.Module';
import { CardComponent } from '../../card/card.component';
import {
  ChartConfiguration,
  Chart,
  registerables,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PieComponent } from '../../charts/pie/pie.component';
import { LineComponent } from '../../charts/line/line.component';
import { HeadmanshipListComponent } from '../headmanship-list/headmanship-list.component';
import { VillageperprovinceComponent } from '../../charts/villageperprovince/villageperprovince.component';
Chart.register(...registerables);
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BaseChartDirective,
    MaterialModule,
    CardComponent,
    PieComponent,
    LineComponent,
    HeadmanshipListComponent,
    VillageperprovinceComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  /**
   *
   */
  constructor(private breakpointObserver: BreakpointObserver) {}
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );
  public barChartLegend = true;
  public barChartPlugins = [ChartDataLabels];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Mash West',
      'Mash Central',
      'Mash East',
      'Manicaland',
      'Midlands',
      'Mat North',
      'Mat South',
      'Masvingo',
    ],
    datasets: [{ data: [65, 59, 80, 81, 56, 55, 40, 90], label: 'Chiefs' }],
  };
  public barChartData1: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Mash West',
      'Mash Central',
      'Mash East',
      'Manicaland',
      'Midlands',
      'Mat North',
      'Mat South',
      'Masvingo',
    ],
    datasets: [{ data: [65, 59, 80, 81, 56, 55, 40, 90], label: 'Headman' }],
  };
  public barChartData2: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Mash West',
      'Mash Central',
      'Mash East',
      'Manicaland',
      'Midlands',
      'Mat North',
      'Mat South',
      'Masvingo',
    ],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40, 90], label: 'Villageheads' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgb(255, 99, 132)',
        },
      },
    },
  };

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
