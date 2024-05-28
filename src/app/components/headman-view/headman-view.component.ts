import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../_service/master.service';
import { MaterialModule } from '../../../_module/Material.Module';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterService: MasterService
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
  }
}
