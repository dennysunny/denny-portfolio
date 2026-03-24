import { Component, inject, signal } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { FadeUpDirective } from '../../animations/fade-up.directive';
import { SectionHeaderComponent } from '../nav/section-header.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [FadeUpDirective, SectionHeaderComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  protected portfolio = inject(PortfolioService);
  hovered = signal<string | null>(null);
}
