import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { ActivatedRoute } from '@angular/router';
import { VillageHead } from '../../../_model/Traditionalleader';
import { MasterService } from '../../_service/master.service';

@Component({
  selector: 'app-chief-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './chief-view.component.html',
  styleUrl: './chief-view.component.scss',
})
export class ChiefViewComponent {
  chief1: any;
  chief: any;
  chiefId: number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterService: MasterService
  ) {}

  ngOnInit() {
    // Get the chief ID from route params
    this.activatedRoute.paramMap.subscribe((params) => {
      this.chiefId = parseInt(params.get('id') || '', 10); // Parse string to number (handle potential missing param)
      if (this.chiefId) {
        this.getChiefData(this.chiefId);
      }
    });
  }

  getChiefData(chiefId: number) {
    this.masterService.GetChiefbyId(chiefId).subscribe((data) => {
      this.chief1 = data;
      this.chief = this.chief1[0];
    });
  }
}
