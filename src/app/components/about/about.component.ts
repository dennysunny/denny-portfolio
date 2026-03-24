import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { FadeUpDirective } from '../../animations/fade-up.directive';
import { SectionHeaderComponent } from '../nav/section-header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FadeUpDirective, SectionHeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  protected portfolio = inject(PortfolioService);
}
