import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { ActivatedRoute, Router } from '@angular/router';
import { VillageHead } from '../../../_model/Traditionalleader';
import { MasterService } from '../../_service/master.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Villageship } from '../../../_model/Chieftainship';

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
  data: Villageship[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterService: MasterService,
    private router: Router
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
    this.masterService
      .getallchieftainships()
      .subscribe((item: Villageship[]) => {
        console.log(item);
        this.data = item;
      });
  }

  appointChief() {
    this.router.navigate(['/appoint-chief'], { state: { data: this.chief } });
  }
  clickedRows(txt: String) {
    this.data.forEach((e) => {
      if (e.chieftainship?.toLowerCase() == txt.toLowerCase()) {
        this.router.navigate(['/chieftainship-view', e.id]);
      }
    });
  }
}
