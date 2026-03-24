import { Component, input } from '@angular/core';
import { FadeUpDirective } from '../../animations/fade-up.directive';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [FadeUpDirective],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  num   = input.required<string>();
  title = input.required<string>();
}
