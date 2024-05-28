import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { VillageHead } from '../../../_model/Traditionalleader';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../_service/master.service';

@Component({
  selector: 'app-chieftainship-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './chieftainship-view.component.html',
  styleUrl: './chieftainship-view.component.scss',
})
export class ChieftainshipViewComponent {
  data1: any;
  data: any;
  dataId: number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterService: MasterService
  ) {}

  ngOnInit() {
    // Get the chief ID from route params
    this.activatedRoute.paramMap.subscribe((params) => {
      this.dataId = parseInt(params.get('id') || '', 10); // Parse string to number (handle potential missing param)
      if (this.dataId) {
        this.getData(this.dataId);
      }
    });
  }

  getData(dataId: number) {
    this.masterService.GetChieftainshipbyId(dataId).subscribe((data) => {
      this.data1 = data;
      this.data = this.data1[0];
    });
  }
}
