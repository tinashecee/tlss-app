import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../_service/master.service';
import { Villageship } from '../../../_model/Chieftainship';

@Component({
  selector: 'app-villagehead-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './villagehead-view.component.html',
  styleUrl: './villagehead-view.component.scss',
})
export class VillageheadViewComponent {
  villagehead1: any;
  villagehead: any;
  villageheadId: number | null = null;
  data1: Villageship[] = [];
  data2: Villageship[] = [];
  data3: Villageship[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterService: MasterService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the chief ID from route params
    this.activatedRoute.paramMap.subscribe((params) => {
      this.villageheadId = parseInt(params.get('id') || '', 10); // Parse string to number (handle potential missing param)
      if (this.villageheadId) {
        this.getChiefData(this.villageheadId);
      }
    });
  }

  getChiefData(villageheadId: number) {
    this.masterService.GetVillageheadbyId(villageheadId).subscribe((data) => {
      this.villagehead1 = data;
      this.villagehead = this.villagehead1[0];
      console.log(this.villagehead1);
    });
    this.masterService
      .getallchieftainships()
      .subscribe((item: Villageship[]) => {
        console.log(item);
        this.data1 = item;
      });
    this.masterService.getallheadmanships().subscribe((item: Villageship[]) => {
      console.log(item);
      this.data2 = item;
    });
    this.masterService.getallvillageships().subscribe((item: Villageship[]) => {
      console.log(item);
      this.data3 = item;
    });
  }
  navigateToHistory() {
    this.router.navigate(['/villagehead-lineage']);
  }
  clickedRows1(txt: String) {
    this.data1.forEach((e) => {
      if (e.chieftainship?.toLowerCase() == txt.toLowerCase()) {
        this.router.navigate(['/chieftainship-view', e.id]);
      }
    });
  }
  clickedRows2(txt: String) {
    this.data2.forEach((e) => {
      if (e.headmanship?.toLowerCase() == txt.toLowerCase()) {
        this.router.navigate(['/headmanship-view', e.id]);
      }
    });
  }
  clickedRows3(txt: String) {
    this.data3.forEach((e) => {
      if (e.villageship?.toLowerCase() == txt.toLowerCase()) {
        this.router.navigate(['/village-view', e.id]);
      }
    });
  }
}
