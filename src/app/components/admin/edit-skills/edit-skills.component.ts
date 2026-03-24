import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PortfolioService } from 'src/app/services/portfolio/portfolio.service';

import { SkillGroup } from '../../../models/portfolio.model';

@Component({
  selector: 'app-edit-skills',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-skills.component.html',
  styleUrl: './edit-skills.component.scss',
})
export class EditSkillsComponent implements OnInit {
  protected portfolio = inject(PortfolioService);

  items   = signal<SkillGroup[]>([]);
  saved   = signal(false);
  saveErr = signal<string | null>(null);

  ngOnInit(): void {
    this.items.set(structuredClone(this.portfolio.skillGroups()));
  }

  updateField<K extends keyof SkillGroup>(index: number, key: K, value: SkillGroup[K]): void {
    this.items.update((list) => {
      const copy = [...list];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  }

  updateTag(groupIndex: number, tagIndex: number, value: string): void {
    this.items.update((list) => {
      const copy = structuredClone(list);
      copy[groupIndex].tags[tagIndex] = value;
      return copy;
    });
  }

  addTag(groupIndex: number): void {
    this.items.update((list) => {
      const copy = structuredClone(list);
      copy[groupIndex].tags.push('');
      return copy;
    });
  }

  removeTag(groupIndex: number, tagIndex: number): void {
    this.items.update((list) => {
      const copy = structuredClone(list);
      copy[groupIndex].tags.splice(tagIndex, 1);
      return copy;
    });
  }

  addGroup(): void {
    this.items.update((list) => [
      ...list,
      { id: `sg-${Date.now()}`, icon: '🔧', title: '', tags: [''] },
    ]);
  }

  removeGroup(index: number): void {
    this.items.update((list) => list.filter((_, i) => i !== index));
  }

  async save(): Promise<void> {
    this.saveErr.set(null);
    const ok = await this.portfolio.updateSkillGroups(this.items());
    if (ok) {
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
    } else {
      this.saveErr.set(this.portfolio.dbError() ?? 'Save failed');
    }
  }
}