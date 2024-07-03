import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../_service/master.service';

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
  }
  navigateToHistory() {
    this.router.navigate(['/villagehead-lineage']);
  }
}
