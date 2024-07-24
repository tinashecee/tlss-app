import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../_service/master.service';
import { MaterialModule } from '../../../_module/Material.Module';
import { Villageship } from '../../../_model/Chieftainship';

@Component({
  selector: 'app-headman-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './headman-view.component.html',
  styleUrl: './headman-view.component.scss',
})
export class HeadmanViewComponent {
  headman1: any;
  headman: any;
  headmanId: number | null = null;
  data1: Villageship[] = [];
  data2: Villageship[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterService: MasterService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the chief ID from route params
    this.activatedRoute.paramMap.subscribe((params) => {
      this.headmanId = parseInt(params.get('id') || '', 10); // Parse string to number (handle potential missing param)
      if (this.headmanId) {
        this.getChiefData(this.headmanId);
      }
    });
  }

  getChiefData(headmanId: number) {
    this.masterService.GetHeadmanbyId(headmanId).subscribe((data) => {
      this.headman1 = data;
      this.headman = this.headman1[0];
      console.log(this.headman1);
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
  }
  navigateToHistory() {
    this.router.navigate(['/headman-lineage']);
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
}
