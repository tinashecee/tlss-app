import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../_service/master.service';
import { VillageHead } from '../../../_model/Traditionalleader';

@Component({
  selector: 'app-village-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './village-view.component.html',
  styleUrl: './village-view.component.scss',
})
export class VillageViewComponent {
  data1: any;
  data: any;
  dataId: number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterService: MasterService,
    private router: Router
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
    this.masterService.GetVillageshipbyId(dataId).subscribe((data) => {
      this.data1 = data;
      this.data = this.data1[0];
    });
  }
  openDialog2(row: any) {
    this.masterService.GetAllVillagehead().subscribe((item: VillageHead[]) => {
      item.forEach((e) => {
        if (e.villagemanship?.toLowerCase() == row.toLowerCase()) {
          this.router.navigate(['/villagehead-info', e.id]);
        }
      });
    });
  }
}
