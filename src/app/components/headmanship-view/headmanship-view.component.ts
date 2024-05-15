import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-headmanship-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './headmanship-view.component.html',
  styleUrl: './headmanship-view.component.scss',
})
export class HeadmanshipViewComponent {}
