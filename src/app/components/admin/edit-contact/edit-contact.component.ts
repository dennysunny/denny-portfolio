import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PortfolioService } from 'src/app/services/portfolio/portfolio.service';

import { ContactLink } from '../../../models/portfolio.model';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss',
})
export class EditContactComponent implements OnInit {
  protected portfolio = inject(PortfolioService);

  items   = signal<ContactLink[]>([]);
  saved   = signal(false);
  saveErr = signal<string | null>(null);

  ngOnInit(): void {
    this.items.set(structuredClone(this.portfolio.contactLinks()));
  }

  updateField<K extends keyof ContactLink>(index: number, key: K, value: ContactLink[K]): void {
    this.items.update((list) => {
      const copy = [...list];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  }

  addLink(): void {
    this.items.update((list) => [
      ...list,
      { id: `c-${Date.now()}`, icon: '🔗', label: '', href: '' },
    ]);
  }

  removeLink(index: number): void {
    this.items.update((list) => list.filter((_, i) => i !== index));
  }

  async save(): Promise<void> {
    this.saveErr.set(null);
    const ok = await this.portfolio.updateContactLinks(this.items());
    if (ok) {
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
    } else {
      this.saveErr.set(this.portfolio.dbError() ?? 'Save failed');
    }
  }
}