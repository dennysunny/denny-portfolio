import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { PortfolioService } from './services/portfolio/portfolio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private portfolio = inject(PortfolioService);

  async ngOnInit(): Promise<void> {
    // Fetch content from Supabase on every app load —
    // all devices always see the latest saved data.
    await this.portfolio.init();
  }
}