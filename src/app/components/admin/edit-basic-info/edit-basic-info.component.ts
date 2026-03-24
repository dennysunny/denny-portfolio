import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { PortfolioService } from "src/app/services/portfolio/portfolio.service";

import { BasicInfo } from "../../../models/portfolio.model";

@Component({
  selector: 'app-edit-basic-info',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-basic-info.component.html',
  styleUrl: './edit-basic-info.component.scss',
})
export class EditBasicInfoComponent implements OnInit {
  protected portfolio = inject(PortfolioService);

  form = signal<BasicInfo>({ ...this.portfolio.hero() });
  saved = signal(false);
  saveErr = signal<string | null>(null);

  ngOnInit(): void {
    this.form.set({ ...this.portfolio.hero() });
  }

  update<K extends keyof BasicInfo>(key: K, value: BasicInfo[K]): void {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  async save(): Promise<void> {
    this.saveErr.set(null);
    const ok = await this.portfolio.updateBasicInfo(this.form());
    if (ok) {
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
    } else {
      this.saveErr.set(this.portfolio.dbError() ?? "Save failed");
    }
  }

  reset(): void {
    this.form.set({ ...this.portfolio.hero() });
  }
}
