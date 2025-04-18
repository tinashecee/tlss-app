import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialModule } from '../../../_module/Material.Module';
import { Villageship } from '../../../_model/Chieftainship';
import { MasterService } from '../../_service/master.service';
@Component({
  selector: 'app-villageperprovince',
  standalone: true,
  imports: [BaseChartDirective, MaterialModule],
  templateUrl: './villageperprovince.component.html',
  styleUrl: './villageperprovince.component.scss',
})
export class VillageperprovinceComponent {
  provinceCounts: number[] = new Array(8).fill(0);

  constructor(private service: MasterService) {}

  ngAfterViewInit(): void {
    this.loadInitialData(); // Call loadInitialData() to fetch data
  }

  // PolarArea
  public polarAreaChartLabels: string[] = [
    'Mash West',
    'Mash Central',
    'Mash East',
    'Manicaland',
    'Midlands',
    'Mat North',
    'Mat South',
    'Masvingo',
  ];

  public polarAreaChartDatasets: ChartConfiguration<'polarArea'>['data']['datasets'] =
    [{ data: this.provinceCounts }];

  public polarAreaLegend = true;

  public polarAreaOptions: ChartConfiguration<'polarArea'>['options'] = {
    responsive: false,
  };

  loadInitialData() {
    this.service.getallvillageships().subscribe((item: Villageship[]) => {
      let chiefsData = item;

      chiefsData.forEach((chief) => {
        switch (chief.province) {
          case 'Mashonaland West':
            this.provinceCounts[0]++;
            break;
          case 'Mashonaland Central':
            this.provinceCounts[1]++;
            break;
          case 'Mashonaland East':
            this.provinceCounts[2]++;
            break;
          case 'Manicaland':
            this.provinceCounts[3]++;
            break;
          case 'Midlands':
            this.provinceCounts[4]++;
            break;
          case 'Matebeleland North':
            this.provinceCounts[5]++;
            break;
          case 'Matebeleland South':
            this.provinceCounts[6]++;
            break;
          case 'Masvingo':
            this.provinceCounts[7]++;
            break;
          default:
            break;
        }
      });

      // Update the polarAreaChartDatasets with the new data
      this.polarAreaChartDatasets = [{ data: this.provinceCounts }];

      console.log(this.provinceCounts);
    });
  }
}
