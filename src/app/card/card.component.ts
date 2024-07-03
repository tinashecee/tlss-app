import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../_module/Material.Module';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input()
  title!: string;
}
