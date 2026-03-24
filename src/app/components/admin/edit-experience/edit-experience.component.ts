import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { PortfolioService } from "src/app/services/portfolio/portfolio.service";

import { Experience } from "../../../models/portfolio.model";

@Component({
  selector: "app-edit-experience",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./edit-experience.component.html",
  styleUrl: "./edit-experience.component.scss",
})
export class EditExperienceComponent implements OnInit {
  protected portfolio = inject(PortfolioService);

  items = signal<Experience[]>([]);
  saved = signal(false);
  saveErr = signal<string | null>(null);

  ngOnInit(): void {
    this.items.set(structuredClone(this.portfolio.experiences()));
  }

  updateField<K extends keyof Experience>(
    index: number,
    key: K,
    value: Experience[K],
  ): void {
    this.items.update((list) => {
      const copy = [...list];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  }

  updateBullet(expIndex: number, bulletIndex: number, value: string): void {
    this.items.update((list) => {
      const copy = structuredClone(list);
      copy[expIndex].bullets[bulletIndex] = value;
      return copy;
    });
  }

  addBullet(expIndex: number): void {
    this.items.update((list) => {
      const copy = structuredClone(list);
      copy[expIndex].bullets.push("");
      return copy;
    });
  }

  removeBullet(expIndex: number, bulletIndex: number): void {
    this.items.update((list) => {
      const copy = structuredClone(list);
      copy[expIndex].bullets.splice(bulletIndex, 1);
      return copy;
    });
  }

  addExperience(): void {
    this.items.update((list) => [
      ...list,
      {
        id: `exp-${Date.now()}`,
        period: "",
        company: "",
        role: "",
        roleHighlight: "",
        bullets: [""],
      },
    ]);
  }

  removeExperience(index: number): void {
    this.items.update((list) => list.filter((_, i) => i !== index));
  }

  async save(): Promise<void> {
    this.saveErr.set(null);
    const ok = await this.portfolio.updateExperiences(this.items());
    if (ok) {
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
    } else {
      this.saveErr.set(this.portfolio.dbError() ?? "Save failed");
    }
  }
}
