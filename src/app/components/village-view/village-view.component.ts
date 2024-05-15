import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-village-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './village-view.component.html',
  styleUrl: './village-view.component.scss',
})
export class VillageViewComponent {}
