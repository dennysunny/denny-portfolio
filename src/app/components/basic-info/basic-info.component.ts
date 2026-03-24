import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";

import { FadeUpDirective } from "../../animations/fade-up.directive";
import { PortfolioService } from "../../services/portfolio/portfolio.service";

@Component({
  selector: "app-basic-info",
  standalone: true,
  imports: [FadeUpDirective, RouterLink],
  templateUrl: "./basic-info.component.html",
  styleUrl: "./basic-info.component.scss",
})
export class BasicInfoComponent {
  protected portfolio = inject(PortfolioService);
}
