import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { FadeUpDirective } from '../../animations/fade-up.directive';
import { SectionHeaderComponent } from '../nav/section-header.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [FadeUpDirective, SectionHeaderComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  protected portfolio = inject(PortfolioService);
}
