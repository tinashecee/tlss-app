import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
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
import { MasterService } from '../../_service/master.service';
import { VillageHead } from '../../../_model/Traditionalleader';
import { Pie2Component } from '../../charts/pie2/pie2.component';
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
    Pie2Component,
    LineComponent,
    HeadmanshipListComponent,
    VillageperprovinceComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  // chiefsData: VillageHead[] = [];
  public provinceCounts: number[] = new Array(8).fill(0);

  provinceHeadCounts: number[] = new Array(8).fill(0);
  provinceVillageCounts: number[] = new Array(8).fill(0);
  provinces = [
    'Mashonaland West',
    'Mashonaland Central',
    'Mashonaland East',
    'Manicaland',
    'Midlands',
    'Matebeleland North',
    'Matebeleland South',
    'Masvingo',
  ];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: MasterService,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    this.loadInitialData(); // Call loadInitialData() to fetch data
  }
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

    datasets: [{ data: this.provinceCounts, label: 'Chiefs' }],
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
    datasets: [{ data: this.provinceHeadCounts, label: 'Headman' }],
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
    datasets: [{ data: this.provinceVillageCounts, label: 'Villageheads' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        beginAtZero: true,
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

  loadInitialData() {
    this.service.GetAllChiefs().subscribe((item: VillageHead[]) => {
      let chiefsData: any[] = [];
      item.forEach((e) => {
        if (
          e.status?.toLowerCase() != 'removed' &&
          e.status?.toLowerCase() != 'deceased'
        ) {
          chiefsData.push(e);
        }
      });
      chiefsData.forEach((chief) => {
        switch (chief.province.toLowerCase()) {
          case 'mashonaland west':
            this.provinceCounts[0]++;
            break;
          case 'mashonaland central':
            this.provinceCounts[1]++;
            break;
          case 'mashonaland east':
            this.provinceCounts[2]++;
            break;
          case 'manicaland':
            this.provinceCounts[3]++;
            break;
          case 'midlands':
            this.provinceCounts[4]++;
            break;
          case 'matebeleland north':
            this.provinceCounts[5]++;
            break;
          case 'matebeleland south':
            this.provinceCounts[6]++;
            break;
          case 'masvingo':
            this.provinceCounts[7]++;
            break;
          default:
            break;
        }
      });
      // Update chart data after counts are set
      this.barChartData = {
        labels: this.provinces.map((p) =>
          p
            .split(' ')
            .map((w) => w.substring(0, 3))
            .join(' ')
        ),
        datasets: [{ data: Array.from(this.provinceCounts), label: 'Chiefs' }],
      };
    });
    this.service.GetAllHeadman().subscribe((item: VillageHead[]) => {
      let headmanData: any[] = [];
      // Reset counts before updating
      this.provinceHeadCounts = new Array(8).fill(0);
      item.forEach((e) => {
        if (
          e.status?.toLowerCase() != 'removed' &&
          e.status?.toLowerCase() != 'deceased'
        ) {
          headmanData.push(e);
        }
      });

      headmanData.forEach((chief) => {
        switch (chief.province.toLowerCase()) {
          case 'mashonaland west':
            this.provinceHeadCounts[0]++;
            break;
          case 'mashonaland central':
            this.provinceHeadCounts[1]++;
            break;
          case 'mashonaland east':
            this.provinceHeadCounts[2]++;
            break;
          case 'manicaland':
            this.provinceHeadCounts[3]++;
            break;
          case 'midlands':
            this.provinceHeadCounts[4]++;
            break;
          case 'matebeleland north':
            this.provinceHeadCounts[5]++;
            break;
          case 'matebeleland south':
            this.provinceHeadCounts[6]++;
            break;
          case 'masvingo':
            this.provinceHeadCounts[7]++;
            break;
          default:
            break;
        }
      });
      console.log(Array.from(this.provinceHeadCounts));
      // Update chart data after counts are set
      this.barChartData1 = {
        labels: this.provinces.map((p) =>
          p
            .split(' ')
            .map((w) => w.substring(0, 3))
            .join(' ')
        ),
        datasets: [{ data: [...this.provinceHeadCounts], label: 'Headman' }],
      };
    });
    this.service.GetAllVillagehead().subscribe((item: VillageHead[]) => {
      let villageheadData: any[] = [];
      // Reset counts before updating
      this.provinceVillageCounts = new Array(8).fill(0);
      item.forEach((e) => {
        if (
          e.status?.toLowerCase() != 'removed' &&
          e.status?.toLowerCase() != 'deceased'
        ) {
          villageheadData.push(e);
        }
      });

      villageheadData.forEach((chief) => {
        switch (chief.province) {
          case 'Mashonaland West':
            this.provinceVillageCounts[0]++;
            break;
          case 'Mashonaland Central':
            this.provinceVillageCounts[1]++;
            break;
          case 'Mashonaland East':
            this.provinceVillageCounts[2]++;
            break;
          case 'Manicaland':
            this.provinceVillageCounts[3]++;
            break;
          case 'Midlands':
            this.provinceVillageCounts[4]++;
            break;
          case 'Matebeleland North':
            this.provinceVillageCounts[5]++;
            break;
          case 'Matebeleland South':
            this.provinceVillageCounts[6]++;
            break;
          case 'Masvingo':
            this.provinceVillageCounts[7]++;
            break;
          default:
            break;
        }
      });
    });
  }
}
