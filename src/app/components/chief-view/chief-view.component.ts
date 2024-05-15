import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-chief-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './chief-view.component.html',
  styleUrl: './chief-view.component.scss',
})
export class ChiefViewComponent {}
