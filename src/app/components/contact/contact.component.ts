import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { FadeUpDirective } from '../../animations/fade-up.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FadeUpDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  protected portfolio = inject(PortfolioService);
}
